// Nexus MindMap Extractor - Popup Logic
// Handles UI interactions and communication with content scripts

const VIEWER_URL = 'https://nexus-mindmap-extractor.netlify.app';

// DOM Elements
const expandBtn = document.getElementById('expandBtn');
const extractJsonBtn = document.getElementById('extractJsonBtn');
const extractCsvBtn = document.getElementById('extractCsvBtn');
const viewerBtn = document.getElementById('viewerBtn');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const domainValue = document.getElementById('domainValue');
const lastExport = document.getElementById('lastExport');
const toast = document.getElementById('toast');

// State
let currentTab = null;
let lastExtractedData = null;

// Initialize
document.addEventListener('DOMContentLoaded', init);

async function init() {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTab = tab;

    // Check if on NotebookLM
    const isNotebookLM = tab.url?.includes('notebooklm.google.com');

    if (isNotebookLM) {
        // Ping content script to check if loaded
        const pingResponse = await sendMessageToContent({ action: 'ping' });

        if (pingResponse && pingResponse.success) {
            setStatus('ready', 'Ready');
            domainValue.textContent = 'notebooklm.google.com';
        } else {
            setStatus('error', 'Content script not loaded');
            domainValue.textContent = 'Reload page';
            showToast('error', 'Please reload the NotebookLM page', '⚠');
        }
    } else {
        setStatus('error', 'Not on NotebookLM');
        domainValue.textContent = 'Invalid domain';
        disableButtons();
    }

    // Load last export info
    loadLastExportInfo();

    // Event listeners
    expandBtn.addEventListener('click', handleExpandAll);
    extractJsonBtn.addEventListener('click', handleExtractJSON);
    extractCsvBtn.addEventListener('click', handleExtractCSV);
    viewerBtn.addEventListener('click', handleOpenViewer);
}

// Button Handlers
async function handleExpandAll() {
    setStatus('working', 'Expanding nodes...');
    setButtonLoading(expandBtn, true);

    try {
        const response = await sendMessageToContent({ action: 'expandAll' });

        if (response.success) {
            showToast('success', `✓ Expanded ${response.expandedCount} nodes`, '✓');
            setStatus('ready', 'Ready');
        } else {
            showToast('error', response.error || 'Failed to expand', '✗');
            setStatus('error', 'Error');
        }
    } catch (error) {
        showToast('error', 'Communication error', '✗');
        setStatus('error', 'Error');
    }

    setButtonLoading(expandBtn, false);
}

async function handleExtractJSON() {
    setStatus('working', 'Extracting...');
    setButtonLoading(extractJsonBtn, true);

    try {
        const response = await sendMessageToContent({ action: 'extractJSON' });

        if (response.success) {
            lastExtractedData = response.data;

            // Copy to clipboard
            await copyToClipboard(JSON.stringify(response.data, null, 2));

            // Save to storage
            await saveExtractedData(response.data);

            showToast('success', '✓ JSON copied to clipboard!', '✓');
            setStatus('ready', 'Ready');
            updateLastExportInfo();
        } else {
            showToast('error', response.error || 'Extraction failed', '✗');
            setStatus('error', 'Error');
        }
    } catch (error) {
        console.error('Extract error:', error);
        showToast('error', 'Extraction error', '✗');
        setStatus('error', 'Error');
    }

    setButtonLoading(extractJsonBtn, false);
}

async function handleExtractCSV() {
    setStatus('working', 'Converting to CSV...');
    setButtonLoading(extractCsvBtn, true);

    try {
        // If no data, extract first
        if (!lastExtractedData) {
            const extractResponse = await sendMessageToContent({ action: 'extractJSON' });

            if (!extractResponse.success) {
                throw new Error(extractResponse.error || 'Extraction failed');
            }

            lastExtractedData = extractResponse.data;
            await saveExtractedData(extractResponse.data);
        }

        // Convert to CSV
        const csv = convertToCSV(lastExtractedData.data);

        // Copy to clipboard
        await copyToClipboard(csv);

        showToast('success', '✓ CSV copied! Paste in Google Sheets', '✓');
        setStatus('ready', 'Ready');
        updateLastExportInfo();
    } catch (error) {
        console.error('CSV error:', error);
        showToast('error', error.message || 'CSV conversion failed', '✗');
        setStatus('error', 'Error');
    }

    setButtonLoading(extractCsvBtn, false);
}

async function handleOpenViewer() {
    setStatus('working', 'Extracting current view...');
    setButtonLoading(viewerBtn, true);

    try {
        // ALWAYS extract fresh data from current view
        // This ensures viewer shows exactly what user sees now
        showToast('info', 'Reading current mindmap...', 'ℹ');
        const extractResponse = await sendMessageToContent({ action: 'extractJSON' });

        if (!extractResponse.success) {
            throw new Error('Extraction failed');
        }

        const data = extractResponse.data;

        // Compress and encode data for URL
        const compressed = await compressData(data);
        const viewerUrlWithData = `${VIEWER_URL}?data=${compressed}`;

        // Open in new tab
        chrome.tabs.create({ url: viewerUrlWithData });

        showToast('success', '✓ Viewer opened in new tab', '✓');
        setStatus('ready', 'Ready');
    } catch (error) {
        console.error('Viewer error:', error);
        showToast('error', 'Failed to open viewer', '✗');
        setStatus('error', 'Error');
    }

    setButtonLoading(viewerBtn, false);
}

// Helper Functions
async function sendMessageToContent(message) {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(currentTab.id, message, (response) => {
            if (chrome.runtime.lastError) {
                resolve({ success: false, error: chrome.runtime.lastError.message });
            } else {
                resolve(response || { success: false, error: 'No response' });
            }
        });
    });
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

async function saveExtractedData(data) {
    const saveData = {
        lastExtractedData: data,
        lastExtractTime: new Date().toISOString()
    };
    await chrome.storage.local.set(saveData);
}

async function loadLastExportInfo() {
    const result = await chrome.storage.local.get(['lastExtractTime', 'lastExtractedData']);

    if (result.lastExtractTime) {
        const timeAgo = getTimeAgo(new Date(result.lastExtractTime));
        lastExport.textContent = `Last export: ${timeAgo}`;
        lastExtractedData = result.lastExtractedData;
    }
}

function updateLastExportInfo() {
    lastExport.textContent = 'Last export: just now';
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

function setStatus(type, text) {
    statusIndicator.className = `status-indicator ${type}`;
    statusText.textContent = text;
}

function setButtonLoading(button, loading) {
    button.disabled = loading;
    if (loading) {
        button.style.opacity = '0.7';
    } else {
        button.style.opacity = '1';
    }
}

function disableButtons() {
    expandBtn.disabled = true;
    extractJsonBtn.disabled = true;
    extractCsvBtn.disabled = true;
    viewerBtn.disabled = true;
}

function showToast(type, message, icon) {
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');

    toast.className = `toast ${type}`;
    toastIcon.textContent = icon;
    toastMessage.textContent = message;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// CSV Conversion
function convertToCSV(hierarchyData) {
    if (!hierarchyData || !hierarchyData.text) {
        throw new Error('Invalid data structure');
    }

    const rows = [];
    let maxDepth = 0;

    function flattenTree(node, depth = 0, path = []) {
        maxDepth = Math.max(maxDepth, depth);

        const row = {
            depth: depth,
            path: [...path, node.text].join(' > '),
            text: node.text,
            childrenCount: node.children?.length || 0,
            hasChildren: (node.children?.length || 0) > 0 ? 'YES' : 'NO',
        };

        for (let i = 0; i <= depth; i++) {
            row[`level_${i}`] = i === depth ? node.text : '';
        }

        rows.push(row);

        (node.children || []).forEach(child => {
            flattenTree(child, depth + 1, [...path, node.text]);
        });
    }

    flattenTree(hierarchyData);

    // Build CSV
    const headers = ['Depth', 'Path', 'Has_Children', 'Children_Count'];
    for (let i = 0; i <= maxDepth; i++) {
        headers.push(`Level_${i}`);
    }

    function escapeCSV(value) {
        if (value === null || value === undefined) return '';
        const str = String(value);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    }

    const csvLines = [];
    csvLines.push(headers.map(escapeCSV).join(','));

    rows.forEach(row => {
        const values = [
            row.depth,
            row.path,
            row.hasChildren,
            row.childrenCount
        ];

        for (let i = 0; i <= maxDepth; i++) {
            values.push(row[`level_${i}`] || '');
        }

        csvLines.push(values.map(escapeCSV).join(','));
    });

    return csvLines.join('\n');
}

// Data Compression for URL
async function compressData(data) {
    const jsonString = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(jsonString));
    return encoded;
}
