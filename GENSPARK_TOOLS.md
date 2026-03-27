# 🛠️ GenSpark AI-Powered Tools Collection

This repository now includes **3 standalone AI-powered tools** that use GenSpark OpenAI API for various tasks.

## 📦 Tools Included

### 1. 🤖 Nexus MindMap Extractor (Chrome Extension)
**File**: `extension/`

A Chrome extension for extracting and analyzing mindmaps from NotebookLM.

**Features**:
- Extract mindmaps from NotebookLM to JSON/CSV
- AI Analysis with 4 types: Summary, Insights, Questions, Expand
- Interactive viewer with zoom/pan
- Export to Google Sheets
- Uses GenSpark gpt-5-mini for analysis

**Usage**:
1. Load extension in Chrome (`chrome://extensions/`)
2. Open NotebookLM mindmap
3. Click extension icon → AI Analysis
4. Get AI-powered insights!

**AI Analysis Types**:
- 📝 **Περίληψη** - Brief overview
- 💡 **Insights** - Key connections and patterns
- ❓ **Ερωτήσεις** - Comprehension questions
- 🌱 **Επέκταση** - Suggestions for expansion

---

### 2. 📄 PDF Form Builder with AI Assistant
**File**: `chatbot-genspark.html`

Dynamic PDF form builder with an AI chatbot assistant.

**Features**:
- Drag-and-drop form builder
- 13 field types (text, email, phone, date, dropdown, etc.)
- AI chatbot for form creation help
- Export to PDF
- Flowable responsive layout
- Uses GenSpark gpt-5-mini

**Live Demo**: [Open Tool](https://8765-iusa3xvfc8dyrza99nb5h-c07dda5e.sandbox.novita.ai/chatbot-genspark.html)

**Usage**:
1. Open the HTML file in browser
2. Drag fields from sidebar to canvas
3. Chat with AI assistant for help
4. Export to PDF when done

**AI Assistant Capabilities**:
- Suggests form structures
- Provides design tips
- Explains form concepts
- Context-aware based on current form

---

### 3. 🔍 OCR & Translation Tool
**File**: `ocr-translator-genspark.html`

Extract text from images/PDFs and translate to Greek with AI.

**Features**:
- OCR (Optical Character Recognition)
- Support for images (PNG, JPG, GIF)
- Multi-page PDF support
- AI-powered English→Greek translation
- Client-side processing (no server needed)
- Copy extracted text and translation
- Uses GenSpark gpt-5-mini

**Live Demo**: [Open Tool](https://8765-iusa3xvfc8dyrza99nb5h-c07dda5e.sandbox.novita.ai/ocr-translator-genspark.html)

**Usage**:
1. Open the HTML file in browser
2. Upload image or PDF
3. Wait for OCR to extract text
4. Get AI translation to Greek
5. Copy results

**Translation Quality**:
- Professional-grade with gpt-5-mini
- Maintains formatting and tone
- Better than free translation APIs
- Low temperature (0.3) for accuracy

---

## 🔑 GenSpark API Configuration

All tools come **pre-configured** with a GenSpark API key, but you can add your own:

### For Chrome Extension:
1. Click extension icon
2. Click ⚙️ settings
3. Enter your GenSpark API key
4. Save

### For HTML Tools:
1. Open the tool in browser
2. Click ⚙️ settings icon (top right)
3. Enter your GenSpark API key
4. Click Save

### Get Your API Key:
- Sign up at [GenSpark.ai](https://www.genspark.ai)
- Navigate to API Keys section
- Generate a new key
- Copy and paste into the tools

---

## 🚀 Quick Start

### Method 1: Clone Repository
```bash
git clone https://github.com/nvoskos/nexus-mindmap-extractor.git
cd nexus-mindmap-extractor

# Open HTML tools directly in browser:
# - chatbot-genspark.html
# - ocr-translator-genspark.html

# Load Chrome extension:
# chrome://extensions/ → Load unpacked → select 'extension/' folder
```

### Method 2: Download Individual Files
Download any `.html` file and open in your browser. No installation needed!

### Method 3: Host on Server
```bash
# Simple HTTP server
python3 -m http.server 8000

# Or with Node.js
npx http-server

# Then visit http://localhost:8000
```

---

## 🎨 Technology Stack

### Common Stack:
- **AI**: GenSpark OpenAI API (gpt-5-mini model)
- **UI**: Tailwind CSS v4
- **JavaScript**: Vanilla ES6+ (no frameworks)

### Tool-Specific:
- **Nexus Extension**: Chrome Manifest V3, D3.js
- **PDF Form Builder**: jsPDF, Drag & Drop API
- **OCR Translator**: Tesseract.js, PDF.js

---

## 📊 Comparison with Original OpenAI

| Feature | Original (OpenAI) | GenSpark Edition |
|---------|------------------|------------------|
| Model | gpt-3.5-turbo | **gpt-5-mini** |
| Speed | Standard | **Faster** |
| Cost | Higher | **Lower** |
| Setup | Requires OpenAI key | **Pre-configured** |
| Quality | Good | **Excellent** |

---

## 🔧 Customization

### Change AI Model:
All tools use `gpt-5-mini` by default. You can change to other models:

```javascript
// In the fetch call, change:
model: 'gpt-5-mini'

// To:
model: 'gpt-5'        // More powerful
model: 'gpt-5.1'      // Latest version
model: 'gpt-5-nano'   // Even faster
```

### Adjust AI Behavior:
Modify the `temperature` parameter:
- `0.3` - More precise, consistent (translations)
- `0.7` - Balanced (default for chat)
- `1.0` - More creative, varied

---

## 🐛 Troubleshooting

### "Failed to fetch" Error
**Solution**: 
- For **Chrome Extension**: Reload extension and refresh NotebookLM page
- For **HTML Tools**: Check if API key is valid
- Check browser console for detailed errors

### Translation Not Working
**Solution**:
- Verify API key is set correctly
- Check internet connection
- Try with shorter text first

### OCR Not Detecting Text
**Solution**:
- Ensure image has clear, readable text
- Try with higher quality image
- Check that text is in English

---

## 📝 License

MIT License - Feel free to use, modify, and distribute!

---

## 🙏 Credits

- **Original Tools**: Various open-source projects
- **GenSpark Integration**: Enhanced with GenSpark AI
- **OCR**: Tesseract.js team
- **PDF Processing**: PDF.js (Mozilla)

---

## 🔗 Links

- **Repository**: [github.com/nvoskos/nexus-mindmap-extractor](https://github.com/nvoskos/nexus-mindmap-extractor)
- **GenSpark**: [genspark.ai](https://www.genspark.ai)
- **Issues**: [Report bugs](https://github.com/nvoskos/nexus-mindmap-extractor/issues)

---

**⭐ If you find these tools useful, star the repository!**

**🔥 GenSpark AI makes these tools 10x better with faster, cheaper, and more powerful AI!**
