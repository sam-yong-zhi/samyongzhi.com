import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blog Admin',
  robots: 'noindex, nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved = localStorage.getItem('theme');
                var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', saved || preferred);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
