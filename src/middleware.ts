import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname === '/favicon.ico') {
    return NextResponse.next();
  }
  const accessToken = request.cookies.get('accessToken');
  
  if (
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/course'
  ) {
    return NextResponse.next();
  }

  if (!accessToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!login|register|course).*)', 
};
