import 'dotenv/config';
import { Client } from '@notionhq/client';

const secret = process.env.NOTION_TOOLS_SECRET;
const dbId = process.env.NOTION_TOOLS_DATABASE_ID;

const notion = new Client({ auth: secret });

async function getPlan() {
    console.log(`Getting Plan from DB: ${dbId}`);
    try {
        const response = await notion.databases.query({
            database_id: dbId,
            filter: {
                property: 'Name',
                title: {
                    equals: 'REVISED BUSINESS PLAN — Tools + Blog First (Feb 2026)'
                }
            }
        });

        if (response.results.length === 0) {
            console.log('Plan not found via exact match.');
            return;
        }

        const pageId = response.results[0].id;
        console.log(`Found Plan Page ID: ${pageId}`);

        // Get blocks (content)
        const blocks = await notion.blocks.children.list({
            block_id: pageId,
            page_size: 100
        });

        console.log('\n--- PLAN CONTENT ---\n');
        blocks.results.forEach(block => {
            const type = block.type;
            if (block[type].rich_text) {
                const text = block[type].rich_text.map(t => t.plain_text).join('');
                if (text) console.log(text);
            } else {
                // For structure
                // console.log(`[${type}]`); 
            }
        });


    } catch (error) {
        console.error('Plan fetch failed:', error.message);
    }
}

getPlan();
