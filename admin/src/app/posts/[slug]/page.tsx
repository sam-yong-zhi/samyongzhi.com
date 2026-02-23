'use server'

import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { readBlogFile, decodeContent, writeBlogFile } from '@/lib/github'
import { parsePost, serializePost } from '@/lib/frontmatter'
import { Header } from '@/components/Header'
import { TipTapEditor } from '@/components/TipTapEditor'

const ALL_CATEGORIES = [
  { value: 'parenting', label: 'Parenting' },
  { value: 'money', label: 'Money' },
  { value: 'ai-and-work', label: 'AI & Work' },
]

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ saved?: string; error?: string }>
}

async function savePost(formData: FormData) {
  'use server'
  const session = await getSession()
  const slug = formData.get('slug') as string
  const sha = formData.get('sha') as string
  const title = formData.get('title') as string
  const date = formData.get('date') as string
  const description = formData.get('description') as string
  const categories = formData.getAll('categories') as string[]
  const draft = formData.get('draft') === 'on'
  const body = formData.get('body') as string

  try {
    const raw = serializePost({ title, date, categories, description, draft }, body)
    await writeBlogFile(session.token, `${slug}.md`, raw, sha)
  } catch (err) {
    const status = (err as { status?: number }).status
    redirect(`/posts/${slug}?error=${status === 409 ? 'conflict' : 'save_failed'}`)
  }
  redirect(`/posts/${slug}?saved=true`)
}

async function publishPost(formData: FormData) {
  'use server'
  const session = await getSession()
  const slug = formData.get('slug') as string
  const sha = formData.get('sha') as string
  const title = formData.get('title') as string
  const date = formData.get('date') as string
  const description = formData.get('description') as string
  const categories = formData.getAll('categories') as string[]
  const body = formData.get('body') as string

  try {
    const raw = serializePost({ title, date, categories, description, draft: false }, body)
    await writeBlogFile(session.token, `${slug}.md`, raw, sha)
  } catch (err) {
    const status = (err as { status?: number }).status
    redirect(`/posts/${slug}?error=${status === 409 ? 'conflict' : 'save_failed'}`)
  }
  redirect(`/posts/${slug}?saved=true`)
}

async function unpublishPost(formData: FormData) {
  'use server'
  const session = await getSession()
  const slug = formData.get('slug') as string
  const sha = formData.get('sha') as string
  const title = formData.get('title') as string
  const date = formData.get('date') as string
  const description = formData.get('description') as string
  const categories = formData.getAll('categories') as string[]
  const body = formData.get('body') as string

  try {
    const raw = serializePost({ title, date, categories, description, draft: true }, body)
    await writeBlogFile(session.token, `${slug}.md`, raw, sha)
  } catch (err) {
    const status = (err as { status?: number }).status
    redirect(`/posts/${slug}?error=${status === 409 ? 'conflict' : 'save_failed'}`)
  }
  redirect(`/posts/${slug}?saved=true`)
}

export default async function EditPostPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { saved, error } = await searchParams
  const filename = `${slug}.md`

  const session = await getSession()
  const raw = await readBlogFile(session.token, filename)
  const decoded = decodeContent(raw.content)
  const { frontmatter, body } = parsePost(decoded)

  const errorMessages: Record<string, string> = {
    conflict: 'The file was modified elsewhere. Reload to get the latest version and try again.',
    save_failed: 'Save failed. Please try again.',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Editing</h1>
          <span className={`badge ${frontmatter.draft ? 'badge-draft' : 'badge-published'}`}>
            {frontmatter.draft ? 'Draft' : 'Published'}
          </span>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '2rem', fontFamily: 'monospace' }}>
          {filename}
        </p>

        {saved && (
          <div className="alert alert-success">Saved successfully.</div>
        )}
        {error && (
          <div className="alert alert-error">
            {errorMessages[error] ?? 'An error occurred.'}
          </div>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="sha" value={raw.sha} />
          {/* Preserve current draft status for the Save button */}
          <input type="hidden" name="draft" value={frontmatter.draft ? 'on' : 'off'} />

          <div>
            <label style={labelStyle} htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              defaultValue={frontmatter.title}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              defaultValue={frontmatter.date}
              required
              style={{ ...inputStyle, maxWidth: '200px' }}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={frontmatter.description}
              rows={3}
              style={textareaStyle}
            />
          </div>

          <div>
            <span style={labelStyle}>Categories</span>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
              {ALL_CATEGORIES.map(cat => (
                <label key={cat.value} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="categories"
                    value={cat.value}
                    defaultChecked={frontmatter.categories.includes(cat.value)}
                  />
                  {cat.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Content</label>
            <TipTapEditor defaultValue={body} />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button type="submit" formAction={savePost} className="btn">
              Save
            </button>
            {frontmatter.draft ? (
              <button type="submit" formAction={publishPost} className="btn btn-primary">
                Publish
              </button>
            ) : (
              <button type="submit" formAction={unpublishPost} className="btn">
                Unpublish
              </button>
            )}
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

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  lineHeight: '1.5',
}
