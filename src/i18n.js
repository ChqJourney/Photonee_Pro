import { register } from 'svelte-i18n';

register('zh-CN', () => import('./i18n/zh-CN.json'));
register('en-US', () => import('./i18n/en-US.json'));
