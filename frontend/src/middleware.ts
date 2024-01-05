export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/backendProfile', '/protected/:path*', '/profile'],
};
