import 'dotenv/config';
import { Client } from '@notionhq/client';

const secret = process.env.NOTION_TOOLS_SECRET || 'ntn_J35904089083JU9AvfWdsOzeW4OZZupsG2iiEApTU7z35i';
const notion = new Client({ auth: secret });

async function fullSearch() {
    console.log('Searching for ALL objects (pages and databases)...');
    try {
        const response = await notion.search({});

        console.log(`Found ${response.results.length} results.`);
        response.results.forEach(item => {
            const title = item.object === 'page'
                ? (item.properties?.Name?.title?.[0]?.plain_text || item.properties?.title?.title?.[0]?.plain_text || 'Untitled Page')
                : (item.title?.[0]?.plain_text || 'Untitled DB');

            console.log(`- Type: ${item.object}`);
            console.log(`  Name: ${title}`);
            console.log(`  ID: ${item.id}`);
            if (item.url) console.log(`  URL: ${item.url}`);
        });

    } catch (error) {
        console.error('Search failed:', error.message);
    }
}

fullSearch();
