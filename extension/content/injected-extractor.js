// EKSTRAKTOR NOTEBOOKLM - WERSJA D3.JS (100% DOKŁADNA) 🎯
// Czyta hierarchię bezpośrednio z __data__ zamiast zgadywać po współrzędnych!
// Modified for Chrome Extension injection

(function() {
    let currentExtractionId = null;

    // Listen for extraction ID setup
    window.addEventListener('NEXUS_SET_EXTRACTION_ID', (event) => {
        currentExtractionId = event.detail.id;
    });

    // Listen for extraction trigger
    window.addEventListener('NEXUS_EXTRACT', () => {
        const extractionId = currentExtractionId;
        if (!extractionId) {
            console.warn('⚠️ No extraction ID set - skipping extraction');
            return;
        }

        performExtraction(extractionId);
    });

    function performExtraction(extractionId) {
    console.log('🚀 NOTEBOOKLM MIND MAP EKSTRAKTOR v6 (d3.js)');
    console.log('='.repeat(80));

    // Znajdź główne SVG z węzłami
    let mainSvg = null;
    document.querySelectorAll('svg').forEach(svg => {
        const nodeCount = svg.querySelectorAll('g.node').length;
        if (nodeCount > 0 && nodeCount > (mainSvg?.querySelectorAll('g.node').length || 0)) {
            mainSvg = svg;
        }
    });

    if (!mainSvg) {
        console.error('❌ Nie znaleziono SVG z węzłami Mind Map!');
        window.postMessage({
            type: 'NEXUS_EXTRACTION_RESULT',
            id: extractionId,
            result: { success: false, error: 'No Mind Map found' }
        }, '*');
        return null;
    }

    const nodes = mainSvg.querySelectorAll('g.node');
    console.log(`✅ Znaleziono ${nodes.length} węzłów\n`);

    // Sprawdź czy pierwszy węzeł ma __data__
    const firstNode = nodes[0];
    if (!firstNode.__data__) {
        console.error('❌ Węzły nie mają __data__! NotebookLM zmienił strukturę.');
        console.log('💡 Użyj starego ekstraktora opartego na współrzędnych.');
        window.postMessage({
            type: 'NEXUS_EXTRACTION_RESULT',
            id: extractionId,
            result: { success: false, error: 'Cannot access d3.js data' }
        }, '*');
        return null;
    }

    console.log('✅ Znaleziono dane d3.js w __data__!\n');

    // Funkcja do czyszczenia d3.js data (usuwa circular references)
    function cleanD3Data(node, depth = 0, visited = new Set()) {
        // Zabezpieczenie przed nieskończoną rekursją
        if (depth > 50) {
            return { text: 'ERROR: Too deep', children: [] };
        }

        // Jeśli to nie jest obiekt d3.js, zwróć prosty obiekt
        if (!node || typeof node !== 'object') {
            return { text: String(node), children: [] };
        }

        // Użyj ID jeśli istnieje do śledzenia visited
        const nodeId = node.id || node.data?.name || JSON.stringify(node).substring(0, 50);
        if (visited.has(nodeId)) {
            return null; // Skip circular reference
        }
        visited.add(nodeId);

        // Wyciągnij tekst węzła (różne możliwe lokacje)
        const text = node.data?.name || node.name || node.text || node.value || 'Unknown';

        // Wyciągnij dzieci
        const children = node.children || node._children || [];

        const cleanNode = {
            text: String(text).trim(),
            children: []
        };

        // Rekurencyjnie oczyść dzieci
        if (Array.isArray(children) && children.length > 0) {
            children.forEach(child => {
                const cleanChild = cleanD3Data(child, depth + 1, new Set(visited));
                if (cleanChild) {
                    cleanNode.children.push(cleanChild);
                }
            });
        }

        return cleanNode;
    }

    // Funkcja alternatywna - szukaj root węzła
    function findRootData() {
        // Metoda 1: Pierwszy węzeł (często root)
        let rootData = firstNode.__data__;

        // Metoda 2: Jeśli pierwszy węzeł ma parenta, idź w górę
        let current = rootData;
        let safety = 0;
        while (current.parent && safety < 100) {
            current = current.parent;
            safety++;
        }

        if (safety > 0) {
            console.log(`📍 Znaleziono root idąc ${safety} poziomów w górę hierarchii\n`);
            rootData = current;
        }

        return rootData;
    }

    // Znajdź root
    console.log('🔍 Szukam węzła głównego...');
    const rootData = findRootData();

    if (!rootData) {
        console.error('❌ Nie znaleziono danych root!');
        window.postMessage({
            type: 'NEXUS_EXTRACTION_RESULT',
            id: extractionId,
            result: { success: false, error: 'Root node not found' }
        }, '*');
        return null;
    }

    const rootText = rootData.data?.name || rootData.name || rootData.text || 'Root';
    console.log(`🎯 Root: "${rootText}"\n`);

    // Oczyść dane
    console.log('🧹 Czyszczę dane z circular references...');
    const hierarchy = cleanD3Data(rootData);

    // Policz węzły w hierarchii
    function countNodes(tree) {
        return 1 + (tree.children?.reduce((sum, child) => sum + countNodes(child), 0) || 0);
    }

    const hierarchyNodeCount = countNodes(hierarchy);
    const coverage = ((hierarchyNodeCount / nodes.length) * 100).toFixed(1);

    console.log(`✅ Hierarchia wyczyszczona!\n`);

    // Statystyki
    console.log('📊 STATYSTYKI:');
    console.log(`   Węzły w DOM: ${nodes.length}`);
    console.log(`   Węzły w hierarchii: ${hierarchyNodeCount}`);
    console.log(`   Coverage: ${coverage}%`);

    if (hierarchyNodeCount < nodes.length) {
        console.warn(`   ⚠️ Brakuje ${nodes.length - hierarchyNodeCount} węzłów!`);
    } else if (hierarchyNodeCount > nodes.length) {
        console.warn(`   ⚠️ Hierarchia ma więcej węzłów niż DOM - możliwe duplikaty`);
    } else {
        console.log(`   ✅ Perfekcyjny match!`);
    }

    // Eksport
    const output = {
        extractedAt: new Date().toISOString(),
        extractionMethod: 'd3.js __data__',
        metadata: {
            totalNodes: hierarchyNodeCount,
            domNodes: nodes.length,
            rootNode: hierarchy.text,
            coverage: parseFloat(coverage)
        },
        data: hierarchy
    };

    console.log('\n' + '='.repeat(80));
    console.log('✨ EKSTRAKCJA ZAKOŃCZONA!\n');

    // Send result back to extension via postMessage
    window.postMessage({
        type: 'NEXUS_EXTRACTION_RESULT',
        id: extractionId,
        result: { success: true, data: output }
    }, '*');

    return output;
    }
})();
