'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { marked } from 'marked'
import TurndownService from 'turndown'
import { useEffect, useRef } from 'react'

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
})

type Props = {
  defaultValue?: string
}

export function TipTapEditor({ defaultValue = '' }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const initialHtml = marked(defaultValue) as string

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content: initialHtml,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      if (textareaRef.current) {
        textareaRef.current.value = turndown.turndown(editor.getHTML())
      }
    },
  })

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = defaultValue
    }
  }, [defaultValue])

  const addLink = () => {
    const previous = editor?.getAttributes('link').href as string | undefined
    const url = window.prompt('Enter URL:', previous ?? '')
    if (url === null) return
    if (url === '') {
      editor?.chain().focus().unsetLink().run()
    } else {
      editor?.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="tiptap-editor">
      <div className="tiptap-toolbar">
        <button
          type="button"
          title="Bold"
          className={editor?.isActive('bold') ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          title="Italic"
          className={editor?.isActive('italic') ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <em>I</em>
        </button>
        <div className="tiptap-toolbar-sep" />
        <button
          type="button"
          title="Heading 1"
          className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </button>
        <button
          type="button"
          title="Heading 2"
          className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          title="Heading 3"
          className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <div className="tiptap-toolbar-sep" />
        <button
          type="button"
          title="Bullet list"
          className={editor?.isActive('bulletList') ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          type="button"
          title="Numbered list"
          className={editor?.isActive('orderedList') ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <div className="tiptap-toolbar-sep" />
        <button
          type="button"
          title="Blockquote"
          className={editor?.isActive('blockquote') ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        >
          ❝
        </button>
        <button
          type="button"
          title="Inline code"
          className={editor?.isActive('code') ? 'is-active' : ''}
          onClick={() => editor?.chain().focus().toggleCode().run()}
        >
          {'\`code\`'}
        </button>
        <button
          type="button"
          title="Link"
          className={editor?.isActive('link') ? 'is-active' : ''}
          onClick={addLink}
        >
          Link
        </button>
      </div>
      <div className="tiptap-content">
        <EditorContent editor={editor} />
      </div>
      <textarea name="body" ref={textareaRef} defaultValue={defaultValue} style={{ display: 'none' }} />
    </div>
  )
}
