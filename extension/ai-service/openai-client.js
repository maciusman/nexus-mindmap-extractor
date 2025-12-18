// OpenAI Client for Nexus MindMap Extractor
// Provides AI-powered analysis of mindmap data

class OpenAIClient {
    constructor(apiKey, baseURL) {
        this.apiKey = apiKey;
        this.baseURL = baseURL || 'https://www.genspark.ai/api/llm_proxy/v1';
    }

    /**
     * Analyze mindmap data using OpenAI
     * @param {Object} mindmapData - The hierarchical mindmap structure
     * @param {string} analysisType - Type of analysis to perform
     * @returns {Promise<Object>} Analysis results
     */
    async analyzeMindmap(mindmapData, analysisType = 'summary') {
        try {
            const prompt = this.buildPrompt(mindmapData, analysisType);
            
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
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
            return {
                success: true,
                analysis: data.choices[0].message.content,
                usage: data.usage
            };

        } catch (error) {
            console.error('OpenAI Analysis Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Build prompt based on mindmap data and analysis type
     * @param {Object} mindmapData - The mindmap structure
     * @param {string} analysisType - Type of analysis
     * @returns {string} The formatted prompt
     */
    buildPrompt(mindmapData, analysisType) {
        const structure = this.flattenMindmap(mindmapData);
        const nodeCount = structure.length;
        const maxDepth = Math.max(...structure.map(n => n.depth));

        let prompt = `Ανάλυσε το παρακάτω mindmap που έχει ${nodeCount} κόμβους και ${maxDepth} επίπεδα βάθους.\n\n`;
        prompt += `Δομή Mindmap:\n`;
        prompt += this.formatStructure(structure);
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

    /**
     * Flatten mindmap hierarchy for analysis
     * @param {Object} node - Root node
     * @param {number} depth - Current depth
     * @param {Array} result - Accumulated results
     * @returns {Array} Flattened structure
     */
    flattenMindmap(node, depth = 0, result = []) {
        result.push({
            text: node.text,
            depth: depth,
            childrenCount: node.children?.length || 0
        });

        if (node.children) {
            node.children.forEach(child => {
                this.flattenMindmap(child, depth + 1, result);
            });
        }

        return result;
    }

    /**
     * Format structure for prompt
     * @param {Array} structure - Flattened structure
     * @returns {string} Formatted text
     */
    formatStructure(structure) {
        return structure
            .map(node => {
                const indent = '  '.repeat(node.depth);
                const childInfo = node.childrenCount > 0 ? ` (${node.childrenCount} υποκόμβοι)` : '';
                return `${indent}• ${node.text}${childInfo}`;
            })
            .join('\n');
    }

    /**
     * Stream analysis (for real-time updates)
     * @param {Object} mindmapData - The mindmap structure
     * @param {string} analysisType - Type of analysis
     * @param {Function} onChunk - Callback for each chunk
     * @returns {Promise<void>}
     */
    async analyzeMindmapStream(mindmapData, analysisType, onChunk) {
        try {
            const prompt = this.buildPrompt(mindmapData, analysisType);
            
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
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
                    max_tokens: 2000,
                    stream: true
                })
            });

            if (!response.ok) {
                throw new Error(`API Error ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(line => line.trim() !== '');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content;
                            if (content) {
                                onChunk(content);
                            }
                        } catch (e) {
                            console.warn('Failed to parse chunk:', e);
                        }
                    }
                }
            }

        } catch (error) {
            console.error('Stream Error:', error);
            throw error;
        }
    }
}

// Export for use in extension
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OpenAIClient;
}
