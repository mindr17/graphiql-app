import DiscordProvider from 'next-auth/providers/discord';

const clientId = process.env.DISCORD_CLIENT_ID || '';
const clientSecret = process.env.DISCORD_CLIENT_SECRET || '';

export const discordProvider = DiscordProvider({
  clientId,
  clientSecret,
});
