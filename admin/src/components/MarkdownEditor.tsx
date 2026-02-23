'use client'

import { useRef, useState } from 'react'
import { marked } from 'marked'

type Props = {
  defaultValue?: string
}

type ToolbarAction = {
  label: string
  title: string
  prefix: string
  suffix?: string
  block?: boolean
  placeholder?: string
}

const TOOLBAR: (ToolbarAction | 'sep')[] = [
  { label: 'H2', title: 'Heading 2', prefix: '## ', block: true },
  { label: 'H3', title: 'Heading 3', prefix: '### ', block: true },
  'sep',
  { label: 'B', title: 'Bold', prefix: '**', suffix: '**', placeholder: 'bold text' },
  { label: 'I', title: 'Italic', prefix: '*', suffix: '*', placeholder: 'italic text' },
  'sep',
  { label: 'Link', title: 'Link', prefix: '[', suffix: '](url)', placeholder: 'link text' },
  { label: '> Quote', title: 'Blockquote', prefix: '> ', block: true },
  { label: '— List', title: 'Bullet list', prefix: '- ', block: true },
  { label: 'HR', title: 'Horizontal rule', prefix: '\n---\n', block: false },
]

export function MarkdownEditor({ defaultValue = '' }: Props) {
  const [value, setValue] = useState(defaultValue)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const applyAction = (action: ToolbarAction) => {
    const ta = textareaRef.current
    if (!ta) return

    const start = ta.selectionStart
    const end = ta.selectionEnd
    const selected = value.slice(start, end)
    const { prefix, suffix = '', placeholder = '' } = action

    let insertion: string
    let newCursorStart: number
    let newCursorEnd: number

    if (action.block) {
      // Insert prefix at the start of the current line
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      const before = value.slice(0, lineStart)
      const after = value.slice(lineStart)
      const newVal = before + prefix + after
      setValue(newVal)
      // restore cursor position shifted by prefix length
      requestAnimationFrame(() => {
        ta.selectionStart = start + prefix.length
        ta.selectionEnd = end + prefix.length
        ta.focus()
      })
      return
    }

    if (selected) {
      insertion = prefix + selected + suffix
      newCursorStart = start + prefix.length
      newCursorEnd = end + prefix.length
    } else {
      const ph = placeholder || 'text'
      insertion = prefix + ph + suffix
      newCursorStart = start + prefix.length
      newCursorEnd = start + prefix.length + ph.length
    }

    const newVal = value.slice(0, start) + insertion + value.slice(end)
    setValue(newVal)
    requestAnimationFrame(() => {
      ta.selectionStart = newCursorStart
      ta.selectionEnd = newCursorEnd
      ta.focus()
    })
  }

  const previewHtml = marked.parse(value) as string

  return (
    <div className="md-editor">
      {/* Toolbar */}
      <div className="md-toolbar">
        {TOOLBAR.map((item, i) =>
          item === 'sep' ? (
            <div key={i} className="md-toolbar-sep" />
          ) : (
            <button
              key={item.label}
              type="button"
              className="md-toolbar-btn"
              title={item.title}
              onClick={() => applyAction(item)}
            >
              {item.label}
            </button>
          )
        )}
      </div>

      {/* Mobile tab switcher */}
      <div className="md-tabs">
        <button
          type="button"
          className={`md-tab${activeTab === 'edit' ? ' active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </button>
        <button
          type="button"
          className={`md-tab${activeTab === 'preview' ? ' active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
      </div>

      {/* Panes */}
      <div className="md-panes">
        <textarea
          ref={textareaRef}
          name="body"
          className={`md-textarea${activeTab === 'preview' ? ' md-pane-hidden' : ''}`}
          value={value}
          onChange={e => setValue(e.target.value)}
          spellCheck
        />
        <div
          className={`md-preview-pane${activeTab === 'edit' ? ' md-pane-hidden' : ''}`}
          dangerouslySetInnerHTML={{ __html: previewHtml || '<p style="color:var(--muted);font-style:italic">Nothing to preview yet.</p>' }}
        />
      </div>
    </div>
  )
}
