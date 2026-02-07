import 'dotenv/config';
import { Client } from '@notionhq/client';

const secret = process.env.NOTION_TOOLS_SECRET;
const dbId = process.env.NOTION_TOOLS_DATABASE_ID;

const notion = new Client({ auth: secret });

async function inspect() {
    console.log(`Inspecting DB: ${dbId}`);
    try {
        const response = await notion.databases.query({
            database_id: dbId,
            page_size: 5 // Just get 5
        });

        if (response.results.length === 0) {
            console.log('No results.');
            return;
        }

        const page = response.results[0];
        console.log('Property Names:', Object.keys(page.properties));

        console.log('\n--- First Item Properties ---');
        console.log(JSON.stringify(page.properties, null, 2));

        // Check 2nd item too
        if (response.results[1]) {
            console.log('\n--- Second Item Properties ---');
            console.log(JSON.stringify(response.results[1].properties, null, 2));
        }

    } catch (error) {
        console.error('Inspect failed:', error.message);
    }
}

inspect();
