import 'dotenv/config';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_CRM_SECRET });
const databaseId = process.env.NOTION_CRM_DATABASE_ID.replace(/-/g, '');

async function addLead(name, email, phone, requested) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                'Name': {
                    title: [
                        { text: { content: name } }
                    ]
                },
                'Email': {
                    email: email
                },
                'Phone': {
                    phone_number: phone
                },
                'Status': {
                    select: { name: 'New Lead' }
                },
                'Notes': {
                    rich_text: [
                        { text: { content: `Requested: ${requested}` } }
                    ]
                }
            }
        });
        console.log('✅ Lead added successfully:', response.id);
    } catch (error) {
        console.error('❌ Error adding lead:', error.message);
    }
}

// Test call
addLead('Test User', 'test@example.com', '+4400000000', 'Sovereign Hub');
