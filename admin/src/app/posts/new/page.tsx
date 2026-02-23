'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { createBlogFile } from '@/lib/github'
import { serializePost } from '@/lib/frontmatter'
import { Header } from '@/components/Header'

const ALL_CATEGORIES = [
  { value: 'parenting', label: 'Parenting' },
  { value: 'money', label: 'Money' },
  { value: 'ai-and-work', label: 'AI & Work' },
]

type Props = {
  searchParams: Promise<{ error?: string }>
}

async function createPost(formData: FormData) {
  'use server'
  const session = await getSession()
  const token = session.token

  const title = formData.get('title') as string
  const date = formData.get('date') as string
  const categories = formData.getAll('categories') as string[]

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  const filename = `${slug}.md`
  const raw = serializePost({ title, date, categories, description: '', draft: true }, '')

  try {
    await createBlogFile(token, filename, raw)
  } catch (err) {
    const status = (err as { status?: number }).status
    if (status === 422) {
      redirect(`/posts/new?error=exists`)
    }
    redirect(`/posts/new?error=create_failed`)
  }

  redirect(`/posts/${slug}`)
}

export default async function NewPostPage({ searchParams }: Props) {
  const { error } = await searchParams

  const today = new Date().toISOString().slice(0, 10)

  const errorMessages: Record<string, string> = {
    exists: 'A post with that title already exists. Try a different title.',
    create_failed: 'Failed to create post. Please try again.',
  }

  return (
    <>
      <Header />

      <main className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <a href="/posts" style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
            ← All posts
          </a>
        </div>

        <h1 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '2rem' }}>
          New post
        </h1>

        {error && (
          <div className="alert alert-error">
            {errorMessages[error] ?? 'An error occurred.'}
          </div>
        )}

        <form action={createPost} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle} htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              autoFocus
              placeholder="My new post"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={today}
              required
              style={{ ...inputStyle, maxWidth: '200px' }}
            />
          </div>

          <div>
            <span style={labelStyle}>Categories</span>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
              {ALL_CATEGORIES.map(cat => (
                <label key={cat.value} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="categories" value={cat.value} />
                  {cat.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary">
              Create draft
            </button>
            <a href="/posts" className="btn">
              Cancel
            </a>
          </div>
        </form>
      </main>
    </>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontWeight: 500,
  marginBottom: '0.35rem',
  fontSize: '0.9rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  background: 'var(--bg)',
  color: 'var(--text)',
  font: 'inherit',
  fontSize: '0.95rem',
}
