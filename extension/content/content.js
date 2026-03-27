// Main Content Script
// Handles communication between popup and page scripts

console.log('🔌 Nexus MindMap Extractor - Content Script Loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Message received:', request.action);

    handleMessage(request)
        .then(response => {
            console.log('✅ Response:', response);
            sendResponse(response);
        })
        .catch(error => {
            console.error('❌ Error:', error);
            sendResponse({ success: false, error: error.message });
        });

    // Return true to indicate async response
    return true;
});

async function handleMessage(request) {
    switch (request.action) {
        case 'ping':
            return { success: true, message: 'Content script ready' };

        case 'expandAll':
            return await handleExpandAll();

        case 'extractJSON':
            return await handleExtractJSON();

        case 'aiAnalysis':
            return await handleAIAnalysis(request.mindmapData, request.analysisType);

        default:
            return { success: false, error: 'Unknown action' };
    }
}

async function handleExpandAll() {
    try {
        // Check if AutoExpand is available
        if (typeof AutoExpand === 'undefined') {
            throw new Error('AutoExpand module not loaded');
        }

        const result = await AutoExpand.expandAllNodes();
        return result;
    } catch (error) {
        console.error('Expand error:', error);
        return { success: false, error: error.message, expandedCount: 0 };
    }
}

async function handleExtractJSON() {
    try {
        // INJECT script into main world (not isolated world)
        // This way it can access __data__ from d3.js
        const result = await injectAndExtract();
        return result;
    } catch (error) {
        console.error('Extract error:', error);
        return { success: false, error: error.message };
    }
}

function injectAndExtract() {
    return new Promise((resolve) => {
        // Create unique ID for this extraction
        const extractionId = 'extraction_' + Date.now();

        // Listen for response from injected script
        const messageHandler = (event) => {
            if (event.data && event.data.type === 'NEXUS_EXTRACTION_RESULT' && event.data.id === extractionId) {
                window.removeEventListener('message', messageHandler);
                resolve(event.data.result);
            }
        };

        window.addEventListener('message', messageHandler);

        // Load external script (chrome-extension:// URLs are allowed by CSP)
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('content/injected-extractor.js');

        script.onload = function() {
            console.log('✅ Extractor script loaded');
            // Small delay to ensure event listeners are registered
            setTimeout(() => {
                // Set extraction ID again (now listeners are ready)
                window.dispatchEvent(new CustomEvent('NEXUS_SET_EXTRACTION_ID', {
                    detail: { id: extractionId }
                }));
                // Trigger extraction
                window.dispatchEvent(new CustomEvent('NEXUS_EXTRACT'));
            }, 50);
            this.remove();
        };

        script.onerror = function() {
            console.error('❌ Failed to load injected-extractor.js');
            resolve({ success: false, error: 'Failed to load extractor script' });
            this.remove();
        };

        document.documentElement.appendChild(script);

        // Timeout after 5 seconds
        setTimeout(() => {
            window.removeEventListener('message', messageHandler);
            resolve({ success: false, error: 'Extraction timeout' });
        }, 5000);
    });
}

// AI Analysis Handler (runs in page context - no CORS restrictions!)
async function handleAIAnalysis(mindmapData, analysisType) {
    console.log('🤖 Content script: Starting AI analysis:', analysisType);
    
    try {
        // Get API credentials from storage
        const config = await chrome.storage.local.get(['openai_api_key', 'openai_base_url']);
        const apiKey = config.openai_api_key || 'gsk-eyJjb2dlbl9pZCI6ICIyYjhjY2E4Ny03YzJjLTRhNDMtOWEzMC03ZjA2NzcxYWQwYWUiLCAia2V5X2lkIjogIjU0NzA2OTc1LTU3ZTctNDllOS05ZTU0LTNkY2JiNWM2ZDQ0MiJ9fFEp-1p1MyDUh_StQuOSM4530mHDXxfECbzca5ZkPYHD';
        const baseURL = config.openai_base_url || 'https://www.genspark.ai/api/llm_proxy/v1';

        console.log('🔑 Using API URL:', baseURL);

        // Build prompt
        const prompt = buildAIPrompt(mindmapData, analysisType);
        console.log('📝 Prompt ready, length:', prompt.length);
        
        // Make API call FROM PAGE CONTEXT (no CORS!)
        console.log('🔄 Calling OpenAI API from page context...');
        
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

        console.log('📥 Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        console.log('✅ AI analysis completed successfully!');
        
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

// Notify that content script is ready
console.log('✅ Content script ready');
