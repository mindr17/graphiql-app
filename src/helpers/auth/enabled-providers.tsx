import { githubIconHtml, vkIconHtml } from '@/app/Icon/IconsHtml';
import { IProvider } from '@/components/social-login-button/types';

export const socialProviders: IProvider[] = [
  {
    name: 'github',
    iconHtml: githubIconHtml,
  },
  {
    name: 'vk',
    iconHtml: vkIconHtml,
  },
];
