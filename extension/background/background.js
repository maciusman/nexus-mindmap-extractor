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

console.log('✅ Background service worker ready');
