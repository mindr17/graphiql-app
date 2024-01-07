import VkProvider from 'next-auth/providers/vk';

export const vkProvider = VkProvider({
  clientId: process.env.VK_CLIENT_ID || '',
  clientSecret: process.env.VK_CLIENT_SECRET || '',
});
