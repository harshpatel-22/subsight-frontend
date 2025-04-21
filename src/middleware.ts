import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value

	const isDashboardRoute =
		request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/subscriptions') || 
        request.nextUrl.pathname.startsWith('/profile') || 
        
    console.log('token',token)
	if (isDashboardRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/subscriptions/:path*', '/profile/:path*'],
}
