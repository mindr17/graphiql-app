import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authConfig } from '@/helpers/auth/auth-config';

const PUBLIC_FILE = /\.(.*)$/;

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/explorer', '/profile'],
};

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  // const session = getServerSession(authConfig);
  // console.log('session: ', session);

  // return NextResponse.redirect('/');
}
