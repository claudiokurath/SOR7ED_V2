import 'dotenv/config';
import { Client } from '@notionhq/client';

const notionBlog = new Client({ auth: process.env.NOTION_BLOG_SECRET });
const BLOG_DB_ID = process.env.NOTION_BLOG_DATABASE_ID;

async function inspectKeys() {
    try {
        const response = await notionBlog.databases.query({
            database_id: BLOG_DB_ID,
            page_size: 1,
        });
        if (response.results.length > 0) {
            console.log('Keys:', Object.keys(response.results[0].properties));
            // Also find which one is the title type
            for (const [key, value] of Object.entries(response.results[0].properties)) {
                if (value.type === 'title') {
                    console.log(`Title property is: "${key}"`);
                    console.log('Value:', JSON.stringify(value, null, 2));
                }
            }
        } else {
            console.log('No blog posts found.');
        }
    } catch (error) {
        console.error(error);
    }
}
inspectKeys();
