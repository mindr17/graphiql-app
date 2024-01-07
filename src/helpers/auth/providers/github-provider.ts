import GitHubProvider from 'next-auth/providers/github';
export const githubProvider = GitHubProvider({
  clientId: process.env.GITHUB_ID || '',
  clientSecret: process.env.GITHUB_SECRET || '',
});
