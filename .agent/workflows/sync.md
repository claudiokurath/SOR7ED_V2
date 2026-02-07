---
description: How to sync content from Notion, build the site, and deploy to Vercel and GitHub.
---

### 1. Update Content from Notion & Build
This fetches the latest blog posts and tools from Notion, downloads images, and prepares the production build.
// turbo
```bash
cd sor7ed-website
npm run build
```

### 2. Deploy to Vercel
Push the latest build to the live site.
// turbo
```bash
cd sor7ed-website
vercel --prod
```

### 3. Sync to GitHub
Save your changes and assets to the cloud.
// turbo
```bash
git add .
git commit -m "Update content and styles"
git push
```

### 4. All-in-One Command (The "Sync Everything" button)
// turbo
```bash
cd sor7ed-website && npm run build && cd .. && git add . && git commit -m "Sync update" && git push && cd sor7ed-website && vercel --prod
```
