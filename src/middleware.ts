import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value

	const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard')
    console.log('token',token)
	if (isDashboardRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*'],
}
