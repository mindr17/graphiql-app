import {
  discordIconHtml,
  githubIconHtml,
  googleIconHtml,
  vkIconHtml,
} from '@/app/Icon/IconsHtml';
import { IProvider } from '@/components/social-login-button/types';

export const socialProviders: IProvider[] = [
  {
    name: 'github',
    iconHtml: githubIconHtml,
  },
  {
    name: 'google',
    iconHtml: googleIconHtml,
  },
  {
    name: 'vk',
    iconHtml: vkIconHtml,
  },
  {
    name: 'discord',
    iconHtml: discordIconHtml,
  },
];
