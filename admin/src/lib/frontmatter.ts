import matter from 'gray-matter'

export type PostFrontmatter = {
  title: string
  date: string
  categories: string[]
  description: string
  draft: boolean
}

export type ParsedPost = {
  frontmatter: PostFrontmatter
  body: string
}

export function parsePost(raw: string): ParsedPost {
  const { data, content } = matter(raw)
  return {
    frontmatter: {
      title: data.title ?? '',
      date: data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date ?? ''),
      categories: Array.isArray(data.categories) ? data.categories : [],
      description: data.description ?? '',
      draft: Boolean(data.draft),
    },
    body: content,
  }
}

export function serializePost(frontmatter: PostFrontmatter, body: string): string {
  return matter.stringify(body, {
    title: frontmatter.title,
    date: frontmatter.date,
    categories: frontmatter.categories,
    description: frontmatter.description,
    draft: frontmatter.draft,
  })
}
