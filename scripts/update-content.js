import 'dotenv/config';
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notionTools = new Client({ auth: process.env.NOTION_TOOLS_SECRET });
const notionBlog = new Client({ auth: process.env.NOTION_BLOG_SECRET });

// Default client for generic functions
const notion = notionTools;

const dataDir = path.join(__dirname, '../src/data');
const publicImagesDir = path.join(__dirname, '../public/content-images');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir, { recursive: true });

async function downloadImage(url, id, type) {
    if (!url) return '';
    try {
        const ext = url.includes('.png') ? 'png' : 'jpg';
        const filename = `${type}-${id}.${ext}`;
        const filepath = path.join(publicImagesDir, filename);
        const publicPath = `/content-images/${filename}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
        await streamPipeline(response.body, fs.createWriteStream(filepath));
        return publicPath;
    } catch (error) {
        console.error(`Failed to download image for ${id}:`, error.message);
        return '';
    }
}

async function fetchFromDatabase(client, dbId, itemType) {
    if (!dbId) {
        console.warn(`No Database ID provided for ${itemType}`);
        return [];
    }

    const cleanId = dbId.replace(/-/g, '');

    try {
        console.log(`Querying ${itemType} Database: ${cleanId}...`);

        const queryOptions = {
            database_id: cleanId,
        };

        // Initial query without filters to be safe
        let response;
        try {
            response = await client.databases.query(queryOptions);
        } catch (error) {
            console.error(`Initial query failed for ${itemType}:`, error.message);
            throw error;
        }

        const items = [];
        for (const page of response.results) {
            const props = page.properties;

            // Handle both Name or Title property
            const name = props.Name?.title?.[0]?.plain_text ||
                props.Title?.title?.[0]?.plain_text ||
                'Untitled';

            // Skip utility pages
            const excludedNames = ['Tools', 'STRATEGY', 'BUSINESS GLOSSARY', 'Documents README', 'BLOG', 'TOOLS'];
            if (excludedNames.includes(name)) continue;

            const rawCover = page.cover?.external?.url || page.cover?.file?.url || '';

            if (itemType === 'tool') {
                const content = props.Content?.rich_text?.map(rt => rt.plain_text).join('') || '';
                const link = props['File Link']?.url || '';
                const type = props.Branch?.select?.name || props.Type?.select?.name || 'No Type';
                const localImage = await downloadImage(rawCover, page.id, 'tool');
                const status = props.Status?.status?.name || props.Status?.select?.name || '';

                items.push({
                    id: page.id,
                    name: name,
                    description: content || 'No description available.',
                    image: localImage,
                    link: link,
                    type: type,
                    status: status
                });
            } else {
                const localCover = await downloadImage(rawCover, page.id, 'blog-cover');

                const body = props['Post Body']?.rich_text?.map(rt => rt.plain_text).join('') || '';
                const summary = props.Summary?.rich_text?.map(rt => rt.plain_text).join('') || '';
                const cta1 = props['CTA 1']?.rich_text?.map(rt => rt.plain_text).join('') || '';
                const trigger = props.Trigger?.rich_text?.[0]?.plain_text || '';
                const slug = props.Slug?.rich_text?.[0]?.plain_text || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                const branch = props.Branch?.select?.name || '';
                const tags = props.Tags?.multi_select?.map(tag => tag.name) || [];
                const publishDate = props['Publish Date']?.date?.start || page.created_time;
                const status = props.Status?.status?.name || props.Status?.select?.name || '';

                items.push({
                    id: page.id,
                    title: name,
                    branch: branch,
                    slug: slug,
                    trigger: trigger,
                    excerpt: summary || body.substring(0, 150) + (body.length > 150 ? '...' : ''),
                    body: body,
                    cta1: cta1,
                    date: publishDate,
                    cover: localCover,
                    tags: tags,
                    status: status,
                    branchColor: 'bg-zinc-500',
                    ctakeyword: trigger
                });
            }
        }
        return items;
    } catch (error) {
        if (error.code === 'object_not_found') {
            if (itemType !== 'doc') {
                console.error(`❌ NOT FOUND: The database ${dbId} was not found. Please ensure it is shared with your integration.`);
            } else {
                console.log(`ℹ️ Optional database ${itemType} (${dbId}) not found. Skipping.`);
            }
        } else {
            console.error(`❌ Error fetching ${itemType}:`, error.message);
        }
        return [];
    }
}

async function main() {
    const toolsId = process.env.NOTION_TOOLS_DATABASE_ID;
    const blogId = process.env.NOTION_BLOG_DATABASE_ID;
    const docsId = process.env.NOTION_DOCS_DATABASE_ID;

    console.log('--- Notion Content Update ---');
    console.log(`Tools DB: ${toolsId}`);
    console.log(`Blog DB: ${blogId}`);
    console.log(`Docs DB:  ${docsId}`);
    console.log('----------------------------');

    const tools = await fetchFromDatabase(notionTools, toolsId, 'tool');
    const blog = await fetchFromDatabase(notionBlog, blogId, 'blog');
    const docs = await fetchFromDatabase(notionTools, docsId, 'doc');

    const data = {
        tools,
        blog,
        docs,
        lastUpdated: new Date().toISOString(),
    };

    const outputPath = path.join(dataDir, 'content.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log('\n--- Results ---');
    console.log(`✅ Content updated at ${outputPath}`);
    console.log(`   - ${tools.length} Tools found`);
    console.log(`   - ${blog.length} Blog Posts found`);
    console.log(`   - ${docs.length} Documents found`);
}

main();
