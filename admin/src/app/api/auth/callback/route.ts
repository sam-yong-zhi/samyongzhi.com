import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  const cookieStore = await cookies()
  const savedState = cookieStore.get('oauth_state')?.value

  // Clear the state cookie regardless of outcome
  cookieStore.delete('oauth_state')

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(
      new URL('/login?error=invalid_state', request.url)
    )
  }

  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
    }),
  })

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL('/login?error=token_exchange', request.url))
  }

  const tokenData = await tokenRes.json()
  const accessToken = tokenData.access_token

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=no_token', request.url))
  }

  // Fetch GitHub user info
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
    },
  })

  if (!userRes.ok) {
    return NextResponse.redirect(new URL('/login?error=user_fetch', request.url))
  }

  const user = await userRes.json()

  // Enforce allowlist — only the repo owner can access
  if (user.login !== process.env.ALLOWED_GITHUB_LOGIN) {
    return NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
  }

  // Set session
  const response = NextResponse.redirect(new URL('/posts', request.url))
  const session = await getIronSession<SessionData>(request, response, sessionOptions)
  session.login = user.login
  session.token = accessToken
  await session.save()

  return response
}
