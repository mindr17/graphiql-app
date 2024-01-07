import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_CLIENT_ID || '';
const clientSecret = process.env.GOOGLE_SECRET || '';

export const googleProvider = GoogleProvider({
  clientId,
  clientSecret,
});
