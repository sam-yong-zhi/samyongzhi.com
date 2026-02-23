const BASE = 'https://api.github.com'
const OWNER = process.env.GITHUB_OWNER!
const REPO = process.env.GITHUB_REPO!
const BLOG_PATH = 'src/content/blog'

export type GithubFile = {
  name: string
  path: string
  sha: string
  download_url: string
  type: string
}

export type GithubFileContent = {
  content: string
  sha: string
  path: string
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

export async function listBlogFiles(token: string): Promise<GithubFile[]> {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/${BLOG_PATH}`,
    { headers: headers(token), cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`GitHub list failed: ${res.status}`)
  const data: GithubFile[] = await res.json()
  return data.filter(f => f.type === 'file' && f.name.endsWith('.md'))
}

export async function readBlogFile(token: string, filename: string): Promise<GithubFileContent> {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/${BLOG_PATH}/${filename}`,
    { headers: headers(token), cache: 'no-store' }
  )
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`)
  const data: GithubFileContent = await res.json()
  return data
}

export function decodeContent(base64: string): string {
  return Buffer.from(base64.replace(/\n/g, ''), 'base64').toString('utf-8')
}

export async function writeBlogFile(
  token: string,
  filename: string,
  newContent: string,
  sha: string
): Promise<void> {
  const encodedContent = Buffer.from(newContent, 'utf-8').toString('base64')
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/${BLOG_PATH}/${filename}`,
    {
      method: 'PUT',
      headers: { ...headers(token), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: `Update ${filename}`,
        content: encodedContent,
        sha,
        branch: 'main',
      }),
    }
  )
  if (!res.ok) {
    const err = await res.json()
    const error = new Error(`GitHub write failed: ${res.status} — ${err.message}`) as Error & { status: number }
    error.status = res.status
    throw error
  }
}
