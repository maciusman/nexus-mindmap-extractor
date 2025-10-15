# 🧠 Nexus MindMap Extractor

> Chrome Extension do ekstrakcji i eksportu Mind Maps z NotebookLM od Google

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Chrome](https://img.shields.io/badge/chrome-extension-green)
![License](https://img.shields.io/badge/license-MIT-purple)

## 📖 Opis

**Nexus MindMap Extractor** to potężna wtyczka do Chrome, która umożliwia:
- ✅ Automatyczne rozwijanie wszystkich węzłów w NotebookLM Mind Map
- ✅ Ekstrakcję struktury mindmap do formatu JSON
- ✅ Konwersję danych do CSV (kompatybilny z Google Sheets)
- ✅ Wizualizację wyeksportowanych danych w interaktywnym viewerze

## 🚀 Funkcjonalności

### Chrome Extension
- **Expand All Nodes** - Automatycznie rozwija całe drzewo mindmap
- **Extract to JSON** - Eksportuje strukturę do JSON (kopiuje do schowka)
- **Extract to CSV** - Konwertuje dane do CSV dla Google Sheets
- **Open in Viewer** - Otwiera interaktywny viewer z wizualizacją

### Standalone Viewer
- Interaktywna wizualizacja hierarchii mindmap
- Zoom, pan, expand/collapse nodes
- Search w węzłach
- Export JSON/CSV bezpośrednio z viewera
- Działa offline po załadowaniu

## 📦 Instalacja

### Instalacja lokalna (Developer Mode)

1. **Pobierz kod:**
   ```bash
   git clone https://github.com/maciusman/nexus-mindmap-extractor.git
   cd nexus-mindmap-extractor
   ```

2. **Załaduj wtyczkę do Chrome:**
   - Otwórz Chrome i przejdź do `chrome://extensions/`
   - Włącz **Developer mode** (przełącznik w prawym górnym rogu)
   - Kliknij **Load unpacked**
   - Wybierz folder `extension/` z tego projektu

3. **Gotowe!** Ikona Nexus pojawi się w pasku narzędzi Chrome

## 🎯 Jak używać

### Podstawowy workflow:

1. **Otwórz Mind Map w NotebookLM**
   - Przejdź do https://notebooklm.google.com
   - Otwórz dowolny notebook z Mind Map

2. **Kliknij ikonę Nexus** w pasku Chrome
   - Otworzy się popup wtyczki

3. **Rozwiń węzły** (opcjonalnie)
   - Kliknij "🌳 Expand All Nodes"
   - Poczekaj aż wszystkie węzły się rozwiną

4. **Eksportuj dane**
   - **Do CSV**: Kliknij "📊 Extract to CSV" → dane w schowku → Ctrl+V w Google Sheets
   - **Do JSON**: Kliknij "📤 Extract to JSON" → JSON w schowku
   - **Do Viewera**: Kliknij "👁️ Open in Viewer" → otwiera się interaktywna wizualizacja

## 🏗️ Struktura projektu

```
nexus-mindmap-extractor/
├── extension/              # Chrome Extension
│   ├── manifest.json      # Konfiguracja wtyczki
│   ├── popup/             # UI wtyczki
│   ├── content/           # Scripts działające na NotebookLM
│   ├── background/        # Service worker
│   ├── utils/             # Utility functions
│   └── icons/             # Ikony (16, 48, 128px)
├── viewer/                # Standalone Viewer (Netlify)
│   └── index.html         # Single-file React app
├── docs/                  # Dokumentacja + screenshots
└── README.md
```

## 🎨 Identyfikacja wizualna

- **Kolory**: Dark theme (#0f0f0f, #1a1a1a)
- **Akcenty**: Fioletowy (#a855f7), Pomarańczowy (#f97316)
- **Font**: Inter, Lato
- **Logo**: Network graph gradient (niebiesko-zielony)

## 🌐 Viewer (Netlify)

Standalone viewer jest dostępny pod adresem:
```
https://nexus-mindmap-extractor.netlify.app
```

✅ **Live Demo:** [Otwórz Viewer](https://nexus-mindmap-extractor.netlify.app)

Viewer akceptuje dane przez:
- URL parameter: `?data=<compressed-json>`
- Manual upload pliku JSON
- localStorage (przekazane z wtyczki)

## 🛠️ Rozwój

### Wymagania
- Chrome/Edge (wersja 88+)
- Git

### Development
```bash
# Klonuj repo
git clone https://github.com/maciusman/nexus-mindmap-extractor.git

# Zmiany w extension/ → przeładuj wtyczkę w chrome://extensions
# Zmiany w viewer/ → deploy automatycznie przez Netlify (GitHub integration)
```

## 🐛 Znane ograniczenia

- NotebookLM może blokować automatyczne klikanie → może być potrzebne ręczne rozwijanie niektórych węzłów
- Maksymalny rozmiar danych w URL (viewer): ~2MB (po kompresji)
- Extension działa tylko na `notebooklm.google.com`

## 📄 Licencja

MIT License - możesz używać, modyfikować i dystrybuować

## 🙏 Autor

Stworzony przez [maciusman](https://github.com/maciusman)

---

**⭐ Jeśli projekt Ci się podoba, zostaw gwiazdkę na GitHub!**
