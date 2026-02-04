import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';

// Simple env parser
const parseEnv = (content) => {
    const config = {};
    const lines = content.toString().split('\n');
    for (const line of lines) {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^['"]|['"]$/g, '');
            config[key] = value;
        }
    }
    return config;
};

// Load env vars
const envPath = path.resolve(process.cwd(), '.env');
let envConfig = {};
if (fs.existsSync(envPath)) {
    envConfig = parseEnv(fs.readFileSync(envPath));
} else {
    console.error('.env file not found');
    process.exit(1);
}

const notion = new Client({ auth: envConfig.NOTION_API_KEY });
const databaseId = envConfig.VITE_NOTION_DATABASE_ID;

const BASE_URL = 'https://planetsorted.com/templates';

const MAPPINGS = {
    'dopamine-menu': 'dopamine-menu.md',
    'digital-declutter': 'digital-declutter.md',
    'financial-zen': 'financial-zen.md',
    // Fallback for titles if slugs aren't set yet
    'THE DOPAMINE MENU': 'dopamine-menu.md',
    'DIGITAL DECLUTTER': 'digital-declutter.md',
    'FINANCIAL ZEN': 'financial-zen.md'
};

async function updateTemplates() {
    console.log('Fetching pages from database:', databaseId);

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });

        console.log(`Found ${response.results.length} pages.`);

        for (const page of response.results) {
            const props = page.properties;

            // Try to identify the page by Slug or Title
            const slug = props.Slug?.rich_text?.[0]?.plain_text;
            const title = props.Title?.title?.[0]?.plain_text || props.Name?.title?.[0]?.plain_text;

            let filename = null;
            if (slug && MAPPINGS[slug]) filename = MAPPINGS[slug];
            else if (title && MAPPINGS[title]) filename = MAPPINGS[title];
            else if (title) {
                // Fuzzy match or check partials
                const upper = title.toUpperCase();
                if (upper.includes('DOPAMINE')) filename = 'dopamine-menu.md';
                if (upper.includes('DECLUTTER')) filename = 'digital-declutter.md';
                if (upper.includes('FINANCIAL') || upper.includes('ZEN')) filename = 'financial-zen.md';
            }

            if (filename) {
                console.log(`Updating page "${title}" (${page.id}) with template: ${filename}`);

                const fileUrl = `${BASE_URL}/${filename}`;

                await notion.pages.update({
                    page_id: page.id,
                    properties: {
                        'template': {
                            files: [
                                {
                                    name: filename,
                                    type: 'external',
                                    external: {
                                        url: fileUrl
                                    }
                                }
                            ]
                        }
                    }
                });
                console.log('✅ Success');
            } else {
                console.log(`Skipping page "${title}" - no matching template found.`);
            }
        }

    } catch (error) {
        console.error('Error updating Notion:', error.body || error);
    }
}

updateTemplates();
