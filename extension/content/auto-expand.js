// Auto-expand functionality for NotebookLM Mind Map
// Based on notebooklm-auto-expand-v2.js

const AutoExpand = {
    async expandAllNodes() {
        console.log('🌳 NOTEBOOKLM AUTO-EXPAND - Starting...');

        // Find main SVG
        let mainSvg = null;
        document.querySelectorAll('svg').forEach(svg => {
            const nodeCount = svg.querySelectorAll('g.node').length;
            if (nodeCount > 0 && nodeCount > (mainSvg?.querySelectorAll('g.node').length || 0)) {
                mainSvg = svg;
            }
        });

        if (!mainSvg) {
            console.error('❌ No Mind Map SVG found');
            return { success: false, error: 'No Mind Map found', expandedCount: 0 };
        }

        const initialNodes = mainSvg.querySelectorAll('g.node');
        console.log(`📊 Found ${initialNodes.length} nodes`);

        // Method 1: Click expand symbols
        const result = await this.clickExpandSymbols(mainSvg, initialNodes.length);

        return result;
    },

    async clickExpandSymbols(mainSvg, initialNodeCount) {
        let clickedCount = 0;
        const maxIterations = 50;
        let totalExpanded = 0;

        for (let iteration = 0; iteration < maxIterations; iteration++) {
            const currentNodes = mainSvg.querySelectorAll('g.node');
            let clickedInIteration = 0;

            for (const node of currentNodes) {
                const expandSymbol = node.querySelector('text.expand-symbol');

                if (expandSymbol && expandSymbol.textContent.trim() === '>') {
                    // Find the circle (actual clickable element)
                    const circle = node.querySelector('circle');

                    if (circle) {
                        // Dispatch click events
                        const events = [
                            new MouseEvent('mousedown', { bubbles: true, cancelable: true }),
                            new MouseEvent('mouseup', { bubbles: true, cancelable: true }),
                            new MouseEvent('click', { bubbles: true, cancelable: true }),
                        ];

                        events.forEach(event => circle.dispatchEvent(event));

                        clickedInIteration++;
                        await this.sleep(50);
                    }
                }
            }

            totalExpanded += clickedInIteration;

            if (clickedInIteration === 0) {
                console.log(`✅ Completed after ${iteration} iterations`);
                break;
            }

            console.log(`Iteration ${iteration + 1}: Clicked ${clickedInIteration} nodes`);
            await this.sleep(200);
        }

        const finalNodes = mainSvg.querySelectorAll('g.node');
        const success = finalNodes.length > initialNodeCount || totalExpanded > 0;

        console.log(`${success ? '✅' : '⚠️'} Expansion complete: ${totalExpanded} nodes clicked`);

        return {
            success: success,
            expandedCount: totalExpanded,
            error: success ? null : 'No nodes expanded'
        };
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Make available globally for content.js
window.AutoExpand = AutoExpand;
