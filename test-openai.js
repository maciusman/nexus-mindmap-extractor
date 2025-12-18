#!/usr/bin/env node

/**
 * Test OpenAI Integration for Nexus MindMap Extractor
 * This script tests the OpenAI API connection and analyzes a sample mindmap
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load configuration
const configPath = path.join(process.env.HOME, '.genspark_llm.yaml');
let apiKey, baseURL;

if (fs.existsSync(configPath)) {
    const yaml = require('js-yaml');
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
    apiKey = config.openai.api_key;
    baseURL = config.openai.base_url;
} else {
    apiKey = process.env.OPENAI_API_KEY;
    baseURL = process.env.OPENAI_BASE_URL;
}

// Sample mindmap data for testing
const sampleMindmap = {
    text: "PowerSave: Τεχνική Ανάπτυξη & Οικοσυστήμα",
    children: [
        {
            text: "Ανοικτά API",
            children: [
                { text: "Avapopd API", children: [] },
                { text: "Σχήμα Βάσης Δεδομένων (PostgreSQL)", children: [] },
                { text: "PowerSave Kids Program", children: [] },
                { text: "Business Packages (CSR & ESG)", children: [] }
            ]
        },
        {
            text: "National Alliance Ecosystem (4 Πυλώνες)",
            children: [
                { text: "Εξοικονόμηση Ενέργειας στην Κύπρο (MULEFT EE)", children: [] }
            ]
        }
    ]
};

console.log('🧪 Testing OpenAI Integration for Nexus MindMap Extractor\n');
console.log('=' .repeat(60));
console.log(`API Base URL: ${baseURL}`);
console.log(`API Key: ${apiKey ? apiKey.substring(0, 20) + '...' : 'NOT FOUND'}`);
console.log('=' .repeat(60));
console.log('\n📊 Sample Mindmap:');
console.log(JSON.stringify(sampleMindmap, null, 2));
console.log('\n' + '='.repeat(60));

// Build prompt
function flattenMindmap(node, depth = 0, result = []) {
    result.push({
        text: node.text,
        depth: depth,
        childrenCount: node.children?.length || 0
    });

    if (node.children) {
        node.children.forEach(child => {
            flattenMindmap(child, depth + 1, result);
        });
    }

    return result;
}

function formatStructure(structure) {
    return structure
        .map(node => {
            const indent = '  '.repeat(node.depth);
            const childInfo = node.childrenCount > 0 ? ` (${node.childrenCount} υποκόμβοι)` : '';
            return `${indent}• ${node.text}${childInfo}`;
        })
        .join('\n');
}

const structure = flattenMindmap(sampleMindmap);
const nodeCount = structure.length;
const maxDepth = Math.max(...structure.map(n => n.depth));

const prompt = `Ανάλυσε το παρακάτω mindmap που έχει ${nodeCount} κόμβους και ${maxDepth} επίπεδα βάθους.

Δομή Mindmap:
${formatStructure(structure)}

Παρέχω μια σύντομη περίληψη (2-3 παράγραφοι) των κύριων θεμάτων και της δομής.`;

console.log('\n📝 Prompt sent to AI:');
console.log('-'.repeat(60));
console.log(prompt);
console.log('-'.repeat(60));

// Make API call
async function testAPI() {
    console.log('\n🚀 Sending request to OpenAI API...\n');

    const requestBody = JSON.stringify({
        model: 'gpt-5-mini',
        messages: [
            {
                role: 'system',
                content: 'You are an expert mindmap analyst. Analyze the provided mindmap structure and provide insights in Greek language.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        temperature: 0.7,
        max_tokens: 2000
    });

    const url = new URL(`${baseURL}/chat/completions`);
    
    const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'Content-Length': Buffer.byteLength(requestBody)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(`✅ Response Status: ${res.statusCode}`);
                
                if (res.statusCode !== 200) {
                    console.error(`❌ Error Response: ${data}`);
                    reject(new Error(`API Error ${res.statusCode}`));
                    return;
                }

                try {
                    const response = JSON.parse(data);
                    console.log('\n' + '='.repeat(60));
                    console.log('🤖 AI Analysis Result:');
                    console.log('='.repeat(60));
                    console.log(response.choices[0].message.content);
                    console.log('\n' + '='.repeat(60));
                    console.log('📊 Usage Stats:');
                    console.log(`  Prompt Tokens: ${response.usage.prompt_tokens}`);
                    console.log(`  Completion Tokens: ${response.usage.completion_tokens}`);
                    console.log(`  Total Tokens: ${response.usage.total_tokens}`);
                    console.log('='.repeat(60));
                    console.log('\n✅ Test Completed Successfully!\n');
                    resolve(response);
                } catch (error) {
                    console.error('❌ Failed to parse response:', error);
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.error('❌ Request Error:', error);
            reject(error);
        });

        req.write(requestBody);
        req.end();
    });
}

// Run test
testAPI().catch(error => {
    console.error('\n❌ Test Failed:', error.message);
    process.exit(1);
});
