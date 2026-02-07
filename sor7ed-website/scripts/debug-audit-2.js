import 'dotenv/config';
import { Client } from '@notionhq/client';

const secret = process.env.NOTION_TOOLS_SECRET;
const dbId = '2fb0d601-4acc-802b-8894-f89513132a57'; // Untitled DB ID

const notion = new Client({ auth: secret });

async function audit() {
    console.log(`Auditing DB: ${dbId}`);
    try {
        const response = await notion.databases.query({ database_id: dbId });
        console.log('--- ITEMS ---');
        response.results.forEach(page => {
            const name = page.properties.Name?.title?.[0]?.plain_text || 'Untitled';
            console.log(`- ${name}`);
        });
    } catch (e) {
        console.log("Error:", e.message);
    }
}

audit();
