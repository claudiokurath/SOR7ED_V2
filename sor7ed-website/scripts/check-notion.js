import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOOLS_SECRET });

async function checkAccess() {
    try {
        console.log('Searching for accessible objects...');
        const response = await notion.search({
            filter: { property: 'object', value: 'database' }
        });
        console.log('Accessible databases:');
        response.results.forEach(db => {
            console.log(`- ${db.title?.[0]?.plain_text || 'Untitled'} (ID: ${db.id})`);
        });
        if (response.results.length === 0) {
            console.log('No databases found. Make sure you have shared the database with the integration.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkAccess();
