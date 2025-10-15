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

// Notify that content script is ready
console.log('✅ Content script ready');
