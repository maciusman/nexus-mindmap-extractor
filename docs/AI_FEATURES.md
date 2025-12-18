# 🤖 AI Analysis Features

## Επισκόπηση

Το **Nexus MindMap Extractor** τώρα περιλαμβάνει ενσωματωμένη ανάλυση με τεχνητή νοημοσύνη χρησιμοποιώντας το OpenAI API. Μπορείτε να αναλύσετε αυτόματα τα mindmaps σας και να λάβετε insights, περιλήψεις, ερωτήσεις κατανόησης και προτάσεις για επέκταση.

## 🎯 Λειτουργίες

### 1. **Περίληψη** (Summary)
- Δημιουργεί μια σύντομη περίληψη 2-3 παραγράφων
- Αναδεικνύει τα κύρια θέματα και τη δομή
- Ιδανικό για γρήγορη κατανόηση μεγάλων mindmaps

### 2. **Insights** 
- Βρίσκει τις πιο σημαντικές συνδέσεις μεταξύ των κόμβων
- Εντοπίζει patterns και κρυφά νοήματα
- Προτείνει πιθανές σχέσεις αιτίου-αποτελέσματος

### 3. **Ερωτήσεις Κατανόησης** (Questions)
- Δημιουργεί 5-7 ερωτήσεις που βασίζονται στο περιεχόμενο
- Χρήσιμο για εκπαίδευση και αξιολόγηση
- Βοηθά στην εμβάθυνση της κατανόησης

### 4. **Προτάσεις Επέκτασης** (Expand)
- Προτείνει 3-5 νέες ιδέες για κόμβους
- Βοηθά στον εμπλουτισμό του mindmap
- Προσφέρει νέες προοπτικές και γωνίες

## 🚀 Χρήση

### Βήμα 1: Ανοίξτε το AI Modal
1. Ανοίξτε το Nexus Extension στο NotebookLM
2. Κάντε κλικ στο κουμπί **"🤖 AI Analysis"**
3. Θα ανοίξει ένα modal με τις επιλογές ανάλυσης

### Βήμα 2: Επιλέξτε Τύπο Ανάλυσης
- Κάντε κλικ σε μία από τις 4 επιλογές:
  - **📝 Περίληψη**
  - **💡 Insights**
  - **❓ Ερωτήσεις**
  - **🌱 Επέκταση**

### Βήμα 3: Περιμένετε το Αποτέλεσμα
- Το AI θα αναλύσει το τρέχον mindmap
- Η ανάλυση διαρκεί συνήθως 5-15 δευτερόλεπτα
- Το αποτέλεσμα θα εμφανιστεί στο modal

### Βήμα 4: Αντιγραφή Αποτελέσματος
- Κάντε κλικ στο κουμπί **"📋 Copy"**
- Το κείμενο αντιγράφεται στο clipboard
- Μπορείτε να το επικολλήσετε όπου θέλετε

## 🔧 Τεχνικές Λεπτομέρειες

### API Configuration

Το extension χρησιμοποιεί το GenSpark OpenAI proxy:
```javascript
API Base URL: https://www.genspark.ai/api/llm_proxy/v1
Model: gpt-5-mini
```

### Πώς Λειτουργεί

1. **Extraction**: Εξάγει την τρέχουσα δομή του mindmap
2. **Flattening**: Μετατρέπει το δένδρο σε επίπεδη δομή
3. **Prompt Building**: Δημιουργεί ένα structured prompt
4. **API Call**: Στέλνει το request στο OpenAI API
5. **Display**: Εμφανίζει το αποτέλεσμα στο UI

### Example Prompt Structure

```
Ανάλυσε το παρακάτω mindmap που έχει 8 κόμβους και 2 επίπεδα βάθους.

Δομή Mindmap:
• Κεντρικό Θέμα (2 υποκόμβοι)
  • Υποθέμα 1 (3 υποκόμβοι)
    • Λεπτομέρεια 1
    • Λεπτομέρεια 2
  • Υποθέμα 2 (1 υποκόμβοι)
    • Λεπτομέρεια 3

[Specific analysis request based on type]
```

## 📊 Supported Models

Το extension υποστηρίζει τα ακόλουθα μοντέλα:
- ✅ `gpt-5-mini` (default, ταχύτερο)
- ✅ `gpt-5` (πιο δυνατό)
- ✅ `gpt-5.1` (latest)
- ✅ `gpt-5.2` (advanced)

## ⚙️ Configuration

### Custom API Key (Optional)

Αν θέλετε να χρησιμοποιήσετε το δικό σας API key:

```javascript
// Στο Chrome DevTools Console:
chrome.storage.local.set({
  openai_api_key: 'your-api-key-here',
  openai_base_url: 'https://www.genspark.ai/api/llm_proxy/v1'
});
```

### Changing Model

Για να αλλάξετε το μοντέλο, επεξεργαστείτε το `popup.js`:

```javascript
// Γραμμή ~398
body: JSON.stringify({
    model: 'gpt-5',  // Αλλάξτε εδώ
    messages: [...],
    ...
})
```

## 🐛 Troubleshooting

### "Failed to extract mindmap data"
**Αιτία**: Το extension δεν μπορεί να διαβάσει το mindmap  
**Λύση**: Βεβαιωθείτε ότι είστε σε μια σελίδα NotebookLM με ανοιχτό mindmap

### "API Error 400"
**Αιτία**: Invalid request ή λάθος API key  
**Λύση**: Ελέγξτε το API key configuration

### "API Error 403"
**Αιτία**: Cloudflare protection (μόνο σε command line tests)  
**Λύση**: Το AI analysis λειτουργεί ΜΟΝΟ μέσω του browser extension, όχι από command line

### "API Error 429"
**Αιτία**: Rate limit exceeded  
**Λύση**: Περιμένετε λίγα λεπτά πριν ξαναδοκιμάσετε

### Ανάλυση Παίρνει Πολύ Ώρα
**Αιτία**: Μεγάλο mindmap ή αργό API  
**Λύση**: Περιμένετε έως 30 δευτερόλεπτα, το API μπορεί να είναι αργό

## 💡 Best Practices

### 1. Expand Before Analysis
Για καλύτερα αποτελέσματα, κάντε "Expand All Nodes" πριν την ανάλυση:
```
1. Click "🌳 Expand All Nodes"
2. Wait for expansion to complete
3. Click "🤖 AI Analysis"
```

### 2. Choose Right Analysis Type
- **Μεγάλα mindmaps**: Χρησιμοποιήστε "Περίληψη"
- **Μελέτη/Εκπαίδευση**: Χρησιμοποιήστε "Ερωτήσεις"
- **Brainstorming**: Χρησιμοποιήστε "Επέκταση"
- **Deep Dive**: Χρησιμοποιήστε "Insights"

### 3. Save Results
Αντιγράψτε πάντα τα αποτελέσματα γιατί:
- Το modal κλείνει μετά την έξοδο
- Τα results δεν αποθηκεύονται αυτόματα
- Το API call κοστίζει tokens

### 4. Iterate
Μπορείτε να τρέξετε πολλαπλές αναλύσεις:
```
Summary → Insights → Questions → Expand
```
Κάθε ανάλυση παρέχει διαφορετική προοπτική.

## 🔒 Privacy & Security

### Data Privacy
- Τα δεδομένα στέλνονται στο GenSpark OpenAI proxy
- Χρησιμοποιείται HTTPS encryption
- Δεν αποθηκεύονται δεδομένα server-side
- Τα αποτελέσματα είναι μόνο local (στο browser)

### API Key Security
- Το API key αποθηκεύεται μόνο στο local chrome storage
- Δεν μοιράζεται ποτέ με τρίτους
- Μπορείτε να το διαγράψετε οποτεδήποτε

## 📈 Limitations

### Current Limitations
- ⚠️ Μέγιστο mindmap size: ~1000 nodes (για καλή απόδοση)
- ⚠️ Max tokens: 2000 (για απαντήσεις)
- ⚠️ Rate limits: Εξαρτώνται από το GenSpark tier
- ⚠️ Γλώσσα: Τα αποτελέσματα είναι στα Ελληνικά

### Future Improvements
- 🔄 Streaming responses (real-time updates)
- 🔄 Πολυγλωσσική υποστήριξη
- 🔄 Custom prompts
- 🔄 Batch analysis για πολλά mindmaps
- 🔄 Export AI results to PDF/Markdown

## 📚 Examples

### Example 1: Summary
**Input**: Mindmap με 15 nodes για "Project Management"  
**Output**:
```
Το mindmap αυτό παρουσιάζει μια ολοκληρωμένη προσέγγιση στη 
διαχείριση έργων, με έμφαση στους 4 βασικούς πυλώνες...
```

### Example 2: Insights
**Input**: Mindmap για "Marketing Strategy"  
**Output**:
```
Τα πιο σημαντικά insights:
1. Η σύνδεση μεταξύ Social Media και Brand Awareness είναι κρίσιμη
2. Το SEO και το Content Marketing συνεργάζονται στενά...
```

### Example 3: Questions
**Input**: Mindmap για "Greek History"  
**Output**:
```
1. Ποιες ήταν οι κύριες αιτίες των Περσικών Πολέμων;
2. Πώς επηρέασε η δημοκρατία της Αθήνας την ευρωπαϊκή σκέψη;
...
```

## 🙏 Credits

AI Analysis powered by:
- **OpenAI API** via GenSpark proxy
- **Model**: GPT-5-mini
- **Integration**: Custom-built for Nexus MindMap Extractor

---

**Questions or Issues?**  
Open an issue on GitHub: [nexus-mindmap-extractor/issues](https://github.com/nvoskos/nexus-mindmap-extractor/issues)

**🌟 Enjoy AI-powered mindmap analysis!**
