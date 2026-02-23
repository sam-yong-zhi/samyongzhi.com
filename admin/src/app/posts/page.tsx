import Link from 'next/link'
import { getSession } from '@/lib/session'
import { listBlogFiles, readBlogFile, decodeContent } from '@/lib/github'
import { parsePost } from '@/lib/frontmatter'

const CATEGORY_LABELS: Record<string, string> = {
  parenting: 'Parenting',
  money: 'Money',
  'ai-and-work': 'AI & Work',
}

export default async function PostsPage() {
  const session = await getSession()
  const token = session.token

  const files = await listBlogFiles(token)

  const posts = await Promise.all(
    files.map(async file => {
      const raw = await readBlogFile(token, file.name)
      const decoded = decodeContent(raw.content)
      const { frontmatter } = parsePost(decoded)
      const slug = file.name.replace(/\.md$/, '')
      return { slug, filename: file.name, frontmatter }
    })
  )

  posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )

  return (
    <>
      <header>
        <div className="container">
          <Link href="/posts" className="site-title" style={{ textDecoration: 'none' }}>
            Blog Admin
          </Link>
          <form action="/api/logout" method="POST">
            <button type="submit" className="btn" style={{ fontSize: '0.85rem' }}>
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="container">
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          Posts
        </h1>

        <div style={{ borderTop: '1px solid var(--border)' }}>
          {posts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/posts/${slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  cursor: 'pointer',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 500, marginBottom: '0.35rem' }}>
                    {frontmatter.title}
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {frontmatter.categories.map(cat => (
                      <span key={cat} className="badge badge-category">
                        {CATEGORY_LABELS[cat] ?? cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', flexShrink: 0 }}>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                    {frontmatter.date}
                  </span>
                  <span className={`badge ${frontmatter.draft ? 'badge-draft' : 'badge-published'}`}>
                    {frontmatter.draft ? 'draft' : 'published'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
