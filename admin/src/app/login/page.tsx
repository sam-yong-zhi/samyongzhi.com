type Props = {
  searchParams: Promise<{ error?: string }>
}

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: 'Access denied. This admin is restricted to the repo owner.',
  invalid_state: 'Authentication failed (invalid state). Please try again.',
  token_exchange: 'Authentication failed (token exchange). Please try again.',
  no_token: 'Authentication failed (no token). Please try again.',
  user_fetch: 'Authentication failed (could not fetch user). Please try again.',
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams
  const errorMessage = error ? (ERROR_MESSAGES[error] ?? 'Authentication failed. Please try again.') : null

  return (
    <>
      <header>
        <div className="container">
          <span className="site-title">Blog Admin</span>
        </div>
      </header>

      <main className="container">
        <div style={{ maxWidth: '360px', margin: '4rem auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            samyongzhi.com
          </h1>
          <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Blog Admin
          </p>

          {errorMessage && (
            <div className="alert alert-error" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              {errorMessage}
            </div>
          )}

          <a href="/api/auth/login" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
            Sign in with GitHub
          </a>

          <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
            Access restricted to repo owner.
          </p>
        </div>
      </main>
    </>
  )
}
