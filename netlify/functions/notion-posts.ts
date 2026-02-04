import { Client } from '@notionhq/client';
import type { Handler } from '@netlify/functions';

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.VITE_NOTION_DATABASE_ID || '';

export const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        console.log('Fetching from database:', DATABASE_ID);

        // First, get database schema to understand properties
        const dbInfo = await notion.databases.retrieve({ database_id: DATABASE_ID });
        const propertyNames = Object.keys((dbInfo as any).properties);
        console.log('Database properties:', propertyNames);

        // Build filter dynamically based on available properties
        let filter: any = undefined;
        const props = (dbInfo as any).properties;

        // Check for Status property (Notion's built-in status type)
        if (props.Status?.type === 'status') {
            filter = {
                property: 'Status',
                status: { equals: 'Published' },
            };
            console.log('Using Status filter: Published');
        } else {
            // Fallback: Find a checkbox property for published/live
            const publishedProp = propertyNames.find(name =>
                props[name].type === 'checkbox' &&
                (name.toLowerCase().includes('publish') || name.toLowerCase().includes('live'))
            );

            if (publishedProp) {
                filter = {
                    property: publishedProp,
                    checkbox: { equals: true },
                };
                console.log('Using checkbox filter:', publishedProp);
            }
        }

        // Find date property for sorting
        const dateProp = propertyNames.find(name => props[name].type === 'date');

        const queryOptions: any = { database_id: DATABASE_ID };
        if (filter) queryOptions.filter = filter;
        if (dateProp) {
            queryOptions.sorts = [{ property: dateProp, direction: 'descending' }];
        }

        const response = await notion.databases.query(queryOptions);

        console.log('Found', response.results.length, 'posts');

        const posts = response.results.map((page: any) => {
            const properties = page.properties;

            // Log properties for debugging
            console.log('Page properties:', Object.keys(properties));

            // Get the image from "Files & media" property
            let image = '';

            // First try to get from "Files & media" property
            const filesMedia = properties['Files & media'];
            if (filesMedia?.files?.[0]) {
                const file = filesMedia.files[0];
                image = file.type === 'external' ? file.external.url : file.file?.url || '';
                console.log('Found image in Files & media property:', image);
            }

            // If not found, check any files type property as fallback
            if (!image) {
                for (const [key, value] of Object.entries(properties) as any) {
                    if (value.type === 'files' && value.files?.[0]) {
                        const file = value.files[0];
                        image = file.type === 'external' ? file.external.url : file.file?.url || '';
                        console.log(`Found image in ${key} property:`, image);
                        break;
                    }
                }
            }

            // Also check for cover image on the page itself
            if (!image && page.cover) {
                if (page.cover.type === 'external') {
                    image = page.cover.external.url;
                } else if (page.cover.type === 'file') {
                    image = page.cover.file.url;
                }
                console.log('Found image in page cover:', image);
            }

            // Get title
            let title = 'Untitled';
            for (const [key, value] of Object.entries(properties) as any) {
                if (value.type === 'title' && value.title?.[0]?.plain_text) {
                    title = value.title[0].plain_text;
                    break;
                }
            }

            // Get slug from rich_text properties
            let slug = '';
            for (const [key, value] of Object.entries(properties) as any) {
                if (value.type === 'rich_text' && key.toLowerCase().includes('slug') && value.rich_text?.[0]?.plain_text) {
                    slug = value.rich_text[0].plain_text;
                    break;
                }
            }
            if (!slug) {
                slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }

            // Get excerpt from rich_text
            let excerpt = '';
            for (const [key, value] of Object.entries(properties) as any) {
                if (value.type === 'rich_text' &&
                    (key.toLowerCase().includes('excerpt') || key.toLowerCase().includes('description') || key.toLowerCase().includes('summary')) &&
                    value.rich_text?.[0]?.plain_text) {
                    excerpt = value.rich_text[0].plain_text;
                    break;
                }
            }

            // Get branch/category from select
            let branch = 'GENERAL';
            for (const [key, value] of Object.entries(properties) as any) {
                if (value.type === 'select' && value.select?.name) {
                    branch = value.select.name;
                    break;
                }
                if (value.type === 'multi_select' && value.multi_select?.[0]?.name) {
                    branch = value.multi_select[0].name;
                    break;
                }
            }

            // Get date
            let date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            for (const [key, value] of Object.entries(properties) as any) {
                if (value.type === 'date' && value.date?.start) {
                    date = new Date(value.date.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    break;
                }
            }

            // Get Post Body from rich_text
            let body = '';
            if (properties['Post Body']?.rich_text) {
                body = properties['Post Body'].rich_text
                    .map((rt: any) => rt.plain_text)
                    .join('');
            }

            // Get CTA 1 from rich_text
            let cta1 = '';
            if (properties['CTA 1']?.rich_text) {
                cta1 = properties['CTA 1'].rich_text
                    .map((rt: any) => rt.plain_text)
                    .join('');
            }

            return {
                id: page.id,
                slug,
                title: title.toUpperCase(),
                excerpt,
                branch: branch.toUpperCase(),
                date,
                image,
                body,
                cta1,
            };
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(posts),
        };
    } catch (error: any) {
        console.error('Notion API Error:', error.message, error.code);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message,
                code: error.code,
                hint: 'Make sure the Notion integration has access to the database'
            }),
        };
    }
};
