import { Handler } from '@netlify/functions';
import { Client } from '@notionhq/client';

// Use Notion Secret from env
const notion = new Client({ auth: process.env.NOTION_BLOG_SECRET || process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID;

export const handler: Handler = async (event) => {
    // Only allow GET
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        if (!DATABASE_ID) {
            throw new Error('NOTION_BLOG_DATABASE_ID is not defined');
        }

        const response = await notion.databases.query({
            database_id: DATABASE_ID,
            filter: {
                property: 'Status',
                status: { equals: 'Done' } // Only published posts
            },
            sorts: [{ property: 'Publish Date', direction: 'descending' }]
        });

        const posts = response.results.map((page: any) => {
            const properties = page.properties;

            return {
                id: page.id,
                title: properties.Name?.title?.[0]?.plain_text || '',
                branch: properties.Branch?.select?.name || '',
                slug: properties.Slug?.rich_text?.[0]?.plain_text || '',
                trigger: properties.Trigger?.rich_text?.[0]?.plain_text || '',
                summary: properties.Summary?.rich_text?.map((rt: any) => rt.plain_text).join('') || '',
                body: properties['Post Body']?.rich_text?.map((rt: any) => rt.plain_text).join('') || '',
                cta1: properties['CTA 1']?.rich_text?.map((rt: any) => rt.plain_text).join('') || '',
                tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
                publishDate: properties['Publish Date']?.date?.start || ''
            };
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow CORS for dev
            },
            body: JSON.stringify({ posts })
        };
    } catch (error: any) {
        console.error('Notion Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
