import 'dotenv/config';
import { Client } from '@notionhq/client';

const notionBlog = new Client({ auth: process.env.NOTION_BLOG_SECRET });
const BLOG_DB_ID = process.env.NOTION_BLOG_DATABASE_ID;

async function inspect() {
    try {
        const response = await notionBlog.databases.query({
            database_id: BLOG_DB_ID,
            page_size: 1,
        });
        if (response.results.length > 0) {
            console.log(JSON.stringify(response.results[0].properties, null, 2));
        } else {
            console.log('No blog posts found.');
        }
    } catch (error) {
        console.error(error);
    }
}
inspect();
