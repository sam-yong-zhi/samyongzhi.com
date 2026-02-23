'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header>
      <div className="container">
        <Link href="/posts" className="site-title" style={{ textDecoration: 'none' }}>
          Blog Admin
        </Link>
        <div className="header-actions">
          <ThemeToggle />
          <form action="/api/logout" method="POST">
            <button type="submit" className="btn" style={{ fontSize: '0.85rem' }}>
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
