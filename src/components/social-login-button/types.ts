export type ProviderName = 'vk' | 'google' | 'github' | 'discord';

export interface IProvider {
  name: ProviderName;
  iconHtml?: string;
}
