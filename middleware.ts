import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/dashboard'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Only protect /dashboard and subroutes
  if (PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
    // Check for Supabase auth cookie (sb-access-token or sb-refresh-token)
    const hasAuth = req.cookies.has('sb-access-token') || req.cookies.has('sb-refresh-token');
    if (!hasAuth) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('redirectedFrom', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
}; 