'use server'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { listBlogFiles, readBlogFile, decodeContent, createBlogFile } from '@/lib/github'
import { parsePost, serializePost } from '@/lib/frontmatter'
import type { PostFrontmatter } from '@/lib/frontmatter'
import { Header } from '@/components/Header'

const CATEGORY_LABELS: Record<string, string> = {
  parenting: 'Parenting',
  money: 'Money',
  'ai-and-work': 'AI & Work',
}

async function createIdVersion(formData: FormData) {
  'use server'
  const session = await getSession()
  const token = session.token
  const slug = formData.get('slug') as string
  const raw = await readBlogFile(token, `${slug}.en.md`)
  const decoded = decodeContent(raw.content)
  const { frontmatter } = parsePost(decoded)
  const idRaw = serializePost({ ...frontmatter, draft: true }, '')
  try {
    await createBlogFile(token, `${slug}.id.md`, idRaw)
  } catch {
    redirect('/posts?error=create_id_failed')
  }
  redirect(`/posts/${slug}?lang=id`)
}

type LangEntry = { sha: string; frontmatter: PostFrontmatter }
type PostGroup = { baseSlug: string; en?: LangEntry; id?: LangEntry; isLegacy?: boolean }

export default async function PostsPage() {
  const session = await getSession()
  const token = session.token

  const files = await listBlogFiles(token)

  const fileDataList = await Promise.all(
    files.map(async file => {
      const raw = await readBlogFile(token, file.name)
      const decoded = decodeContent(raw.content)
      const { frontmatter } = parsePost(decoded)
      return { filename: file.name, sha: raw.sha, frontmatter }
    })
  )

  const groups = new Map<string, PostGroup>()

  for (const { filename, sha, frontmatter } of fileDataList) {
    let baseSlug: string
    let lang: 'en' | 'id'
    let isLegacy = false

    if (filename.endsWith('.en.md')) {
      baseSlug = filename.replace(/\.en\.md$/, '')
      lang = 'en'
    } else if (filename.endsWith('.id.md')) {
      baseSlug = filename.replace(/\.id\.md$/, '')
      lang = 'id'
    } else {
      baseSlug = filename.replace(/\.md$/, '')
      lang = 'en'
      isLegacy = true
    }

    if (!groups.has(baseSlug)) groups.set(baseSlug, { baseSlug })
    const group = groups.get(baseSlug)!
    group[lang] = { sha, frontmatter }
    if (isLegacy) group.isLegacy = true
  }

  const posts = Array.from(groups.values()).sort((a, b) => {
    const dateA = a.en?.frontmatter.date ?? a.id?.frontmatter.date ?? ''
    const dateB = b.en?.frontmatter.date ?? b.id?.frontmatter.date ?? ''
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })

  return (
    <>
      <Header />

      <main className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
            Posts
          </h1>
          <Link href="/posts/new" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
            New post
          </Link>
        </div>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {posts.map(({ baseSlug, en, id, isLegacy }) => {
            const frontmatter = en?.frontmatter ?? id?.frontmatter
            const enExists = !!en
            const idExists = !!id
            const titleHref = isLegacy
              ? `/posts/${baseSlug}`
              : `/posts/${baseSlug}?lang=${enExists ? 'en' : 'id'}`

            return (
              <div key={baseSlug} style={{ padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ minWidth: 0 }}>
                    <Link
                      href={titleHref}
                      style={{ textDecoration: 'none', fontWeight: 500, display: 'block', marginBottom: '0.35rem' }}
                    >
                      {frontmatter?.title}
                    </Link>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {frontmatter?.categories.map(cat => (
                        <span key={cat} className="badge badge-category">
                          {CATEGORY_LABELS[cat] ?? cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', flexShrink: 0 }}>
                    <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{frontmatter?.date}</span>
                    <span className={`badge ${frontmatter?.draft ? 'badge-draft' : 'badge-published'}`}>
                      {frontmatter?.draft ? 'draft' : 'published'}
                    </span>
                  </div>
                </div>
                {!isLegacy && (
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    {enExists
                      ? <a href={`/posts/${baseSlug}?lang=en`} className="badge badge-lang-en">EN</a>
                      : <span className="badge badge-lang-missing">EN</span>}
                    {idExists
                      ? <a href={`/posts/${baseSlug}?lang=id`} className="badge badge-lang-id">ID</a>
                      : <span className="badge badge-lang-missing">ID</span>}
                    {enExists && !idExists && (
                      <form action={createIdVersion} style={{ display: 'inline' }}>
                        <input type="hidden" name="slug" value={baseSlug} />
                        <button type="submit" className="btn" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
                          + Create Indonesian version
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}
