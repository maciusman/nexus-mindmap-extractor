// Background Service Worker
// Handles extension lifecycle and cross-component communication

console.log('🚀 Nexus MindMap Extractor - Background Service Worker Started');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('✅ Extension installed!');

        // Set default settings
        chrome.storage.local.set({
            viewerUrl: 'https://nexus-mindmap-viewer.netlify.app',
            autoExpand: false,
            lastExtractedData: null,
            lastExtractTime: null
        });

        // Open welcome page (optional)
        // chrome.tabs.create({ url: 'https://github.com/maciusman/nexus-mindmap-extractor' });
    } else if (details.reason === 'update') {
        console.log('🔄 Extension updated!');
    }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Background received message:', request);

    // Handle different message types
    switch (request.action) {
        case 'saveData':
            handleSaveData(request.data).then(sendResponse);
            return true;

        case 'getData':
            handleGetData().then(sendResponse);
            return true;

        case 'aiAnalysis':
            handleAIAnalysis(request.mindmapData, request.analysisType).then(sendResponse);
            return true;

        default:
            sendResponse({ success: false, error: 'Unknown action' });
            return false;
    }
});

// Save extracted data to storage
async function handleSaveData(data) {
    try {
        await chrome.storage.local.set({
            lastExtractedData: data,
            lastExtractTime: new Date().toISOString()
        });

        console.log('✅ Data saved to storage');
        return { success: true };
    } catch (error) {
        console.error('❌ Save error:', error);
        return { success: false, error: error.message };
    }
}

// Get data from storage
async function handleGetData() {
    try {
        const result = await chrome.storage.local.get(['lastExtractedData', 'lastExtractTime']);

        return {
            success: true,
            data: result.lastExtractedData,
            extractTime: result.lastExtractTime
        };
    } catch (error) {
        console.error('❌ Get data error:', error);
        return { success: false, error: error.message };
    }
}

// Handle tab updates (optional - can be used to detect when user navigates to NotebookLM)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('notebooklm.google.com')) {
        console.log('📍 NotebookLM page loaded');
        // Could inject content scripts here if needed
    }
});

// AI Analysis Handler
async function handleAIAnalysis(mindmapData, analysisType) {
    console.log('🤖 Starting AI analysis:', analysisType);
    
    try {
        // Get API credentials from storage
        const config = await chrome.storage.local.get(['openai_api_key', 'openai_base_url']);
        const apiKey = config.openai_api_key || 'gsk-eyJjb2dlbl9pZCI6ICIyYjhjY2E4Ny03YzJjLTRhNDMtOWEzMC03ZjA2NzcxYWQwYWUiLCAia2V5X2lkIjogIjU0NzA2OTc1LTU3ZTctNDllOS05ZTU0LTNkY2JiNWM2ZDQ0MiJ9fFEp-1p1MyDUh_StQuOSM4530mHDXxfECbzca5ZkPYHD';
        const baseURL = config.openai_base_url || 'https://www.genspark.ai/api/llm_proxy/v1';

        // Build prompt
        const prompt = buildAIPrompt(mindmapData, analysisType);
        
        console.log('🔄 Calling OpenAI API...');
        
        // Make API call
        const response = await fetch(`${baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
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
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        console.log('✅ AI analysis completed');
        
        return {
            success: true,
            analysis: data.choices[0].message.content,
            usage: data.usage
        };

    } catch (error) {
        console.error('❌ AI Analysis error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

function buildAIPrompt(mindmapData, analysisType) {
    const structure = flattenMindmapForAI(mindmapData);
    const nodeCount = structure.length;
    const maxDepth = Math.max(...structure.map(n => n.depth), 0);

    let prompt = `Ανάλυσε το παρακάτω mindmap που έχει ${nodeCount} κόμβους και ${maxDepth} επίπεδα βάθους.\n\n`;
    prompt += `Δομή Mindmap:\n`;
    prompt += formatStructureForAI(structure);
    prompt += `\n\n`;

    switch (analysisType) {
        case 'summary':
            prompt += `Παρέχω μια σύντομη περίληψη (2-3 παράγραφοι) των κύριων θεμάτων και της δομής.`;
            break;
        case 'insights':
            prompt += `Βρες τα πιο σημαντικά insights και συνδέσεις μεταξύ των κόμβων. Ποια είναι τα κύρια θέματα;`;
            break;
        case 'questions':
            prompt += `Δημιούργησε 5-7 ερωτήσεις κατανόησης που βασίζονται σε αυτό το mindmap.`;
            break;
        case 'expand':
            prompt += `Πρότεινε 3-5 νέες ιδέες ή κόμβους που θα μπορούσαν να προστεθούν για να εμπλουτιστεί το mindmap.`;
            break;
        default:
            prompt += `Ανέλυσε αυτό το mindmap και δώσε χρήσιμα insights.`;
    }

    return prompt;
}

function flattenMindmapForAI(node, depth = 0, result = []) {
    if (!node) return result;
    
    result.push({
        text: node.text || 'Untitled',
        depth: depth,
        childrenCount: node.children?.length || 0
    });

    if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => {
            flattenMindmapForAI(child, depth + 1, result);
        });
    }

    return result;
}

function formatStructureForAI(structure) {
    return structure
        .map(node => {
            const indent = '  '.repeat(node.depth);
            const childInfo = node.childrenCount > 0 ? ` (${node.childrenCount} υποκόμβοι)` : '';
            return `${indent}• ${node.text}${childInfo}`;
        })
        .join('\n');
}

console.log('✅ Background service worker ready');
