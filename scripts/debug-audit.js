import 'dotenv/config';
import { Client } from '@notionhq/client';

const secret = process.env.NOTION_TOOLS_SECRET;
const dbId = process.env.NOTION_TOOLS_DATABASE_ID;

const notion = new Client({ auth: secret });

async function audit() {
    console.log(`Auditing DB: ${dbId}`);
    const response = await notion.databases.query({ database_id: dbId });

    console.log('--- ITEMS ---');
    response.results.forEach(page => {
        const name = page.properties.Name?.title?.[0]?.plain_text || 'Untitled';
        const type = page.properties.Type?.select?.name || 'No Type';
        const link = page.properties['File Link']?.url || 'No Link';

        console.log(`[${type}] ${name} (Link: ${link})`);
    });
}

audit();
