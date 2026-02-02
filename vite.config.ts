import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/',
    plugins: [react()],
    server: {
      proxy: {
        '/api/notion': {
          target: 'https://api.notion.com/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/notion/, ''),
          headers: {
            Authorization: `Bearer ${env.NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
          },
        },
      },
    },
  };
});
