import 'dotenv/config';
import { Client } from '@notionhq/client';

const secret = process.env.NOTION_TOOLS_SECRET || 'ntn_J35904089083JU9AvfWdsOzeW4OZZupsG2iiEApTU7z35i';
const notion = new Client({ auth: secret });

async function search() {
    console.log('Searching for databases...');
    try {
        const response = await notion.search({
            filter: {
                value: 'database',
                property: 'object'
            },
        });

        console.log(`Found ${response.results.length} databases.`);
        response.results.forEach(db => {
            console.log(`- Name: ${db.title?.[0]?.plain_text || 'Untitled'}`);
            console.log(`  ID: ${db.id}`);
            console.log(`  URL: ${db.url}`);
        });

    } catch (error) {
        console.error('Search failed:', error.message);
    }
}

search();
