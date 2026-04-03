import { defineConfig } from 'astro/config';
import remarkHeadingId from 'remark-heading-id';

export default defineConfig({
  site: 'https://samyongzhi.com',
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
