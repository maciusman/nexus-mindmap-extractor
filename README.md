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
- **Open in Viewer** - Otwiera interaktywny viewer z aktualnym widokiem mindmap
- **🤖 AI Analysis** (NEW!) - Ανάλυση mindmap με τεχνητή νοημοσύνη (OpenAI)

### Standalone Viewer
- Interaktywna wizualizacja hierarchii mindmap
- Zoom, pan, expand/collapse nodes
- Download JSON lub CSV bezpośrednio z viewera
- Działa offline po załadowaniu
- Kolorowa wizualizacja poziomów (fioletowy, niebieski, zielony)

## 📦 Instalacja

### Szybki start (5 minut)

**Dla osób bez doświadczenia z Git:**

1. **Pobierz projekt:**
   - Wejdź na: https://github.com/maciusman/nexus-mindmap-extractor
   - Kliknij zielony przycisk **"Code"** → **"Download ZIP"**
   - Zapisz plik ZIP na dysku (np. w folderze Pobrane)
   - **Rozpakuj** archiwum (prawy przycisk → Wyodrębnij wszystko)

2. **Otwórz Chrome Extensions:**
   - Otwórz Chrome
   - W pasku adresu wpisz: `chrome://extensions/`
   - Naciśnij **Enter**

3. **Włącz tryb dewelopera:**
   - W prawym górnym rogu znajdź przełącznik **"Developer mode"** (Tryb dewelopera)
   - **Kliknij**, aby włączyć (powinien być niebieski/aktywny)

4. **Załaduj wtyczkę:**
   - Kliknij przycisk **"Load unpacked"** (Załaduj rozpakowane)
   - W oknie wyboru plików przejdź do miejsca gdzie rozpakowałeś projekt
   - **WAŻNE:** Wejdź do folderu i wybierz podfolder **`extension`** (nie główny folder!)
   - Kliknij **"Select Folder"** / **"Wybierz folder"**

5. **Gotowe!** 🎉
   - Wtyczka pojawi się na liście
   - Zobaczysz fioletowo-zieloną ikonę
   - Kliknij ikonę puzzla w pasku Chrome i **przypnij** Nexus MindMap Extractor

### Dla użytkowników Git:

```bash
git clone https://github.com/maciusman/nexus-mindmap-extractor.git
cd nexus-mindmap-extractor
```

Następnie wykonaj kroki 2-5 z powyższej instrukcji.

## 🎯 Jak używać

### Kompletny przewodnik krok po kroku:

#### 1️⃣ Otwórz Mind Map w NotebookLM

1. Przejdź do https://notebooklm.google.com
2. Zaloguj się na swoje konto Google
3. Otwórz dowolny notebook
4. Upewnij się, że widzisz widok Mind Map

#### 2️⃣ Uruchom wtyczkę

1. Kliknij ikonę **Nexus MindMap Extractor** w pasku Chrome
   - Jeśli nie widzisz ikony, kliknij ikonę puzzla i znajdź wtyczkę
2. Otworzy się fioletowe okienko wtyczki
3. Sprawdź czy na górze jest status **"Ready"** (zielony punkt)
   - Jeśli jest **"Not on NotebookLM"** → upewnij się że jesteś na notebooklm.google.com
   - Jeśli jest **"Content script not loaded"** → odśwież stronę (F5)

#### 3️⃣ Wybierz akcję

**Opcja A: Szybka wizualizacja**
1. Kliknij **"👁️ Open in Viewer"**
2. Wtyczka automatycznie wyekstrahuje aktualny widok i otworzy viewer
3. Możesz zoomować (scroll), przeciągać (drag), rozwijać węzły (klik)

**Opcja B: Eksport do Google Sheets**
1. (Opcjonalnie) Kliknij **"🌳 Expand All Nodes"** aby rozwinąć wszystkie węzły
2. Kliknij **"📊 Extract to CSV"**
3. Zobaczysz komunikat: **"✓ CSV copied! Paste in Google Sheets"**
4. Otwórz Google Sheets
5. Kliknij w komórkę **A1**
6. Wklej dane: **Ctrl+V** (Windows) lub **Cmd+V** (Mac)
7. Gotowe! Dane są w arkuszu

**Opcja C: Eksport do JSON**
1. Kliknij **"📤 Extract to JSON"**
2. JSON jest skopiowany do schowka
3. Możesz wkleić go gdzie chcesz (edytor tekstu, narzędzie do analizy, etc.)

**Opcja D: AI Analysis (NEW!)** 🤖
1. Kliknij **"🤖 AI Analysis"**
2. Wybierz typ analizy:
   - 📝 **Περίληψη** - Σύντομη περίληψη του mindmap
   - 💡 **Insights** - Βασικά συμπεράσματα και συνδέσεις
   - ❓ **Ερωτήσεις** - Ερωτήσεις κατανόησης
   - 🌱 **Επέκταση** - Προτάσεις για νέους κόμβους
3. Περίμενε 5-15 δευτερόλεπτα για το AI analysis
4. Αντίγραψε το αποτέλεσμα με το κουμπί "Copy"

Δες περισσότερα: [AI Features Documentation](docs/AI_FEATURES.md)

### ⚡ Ważne informacje

**"Open in Viewer" zawsze pokazuje aktualny widok:**
- NIE musisz najpierw klikać "Extract to JSON"
- Viewer pokaże dokładnie to, co masz teraz rozwinięte w NotebookLM
- Jeśli zmienisz coś w drzewie i klikniesz ponownie "Open in Viewer" → zobaczysz nowy stan

**"Expand All Nodes" jest opcjonalne:**
- Jeśli chcesz zobaczyć CAŁE drzewo → kliknij najpierw "Expand All Nodes"
- Jeśli chcesz zobaczyć tylko to co już masz rozwinięte → kliknij od razu "Open in Viewer"

## 🏗️ Struktura projektu

```
nexus-mindmap-extractor/
├── extension/              # Chrome Extension
│   ├── manifest.json      # Konfiguracja wtyczki (Manifest V3)
│   ├── popup/             # UI wtyczki (HTML, CSS, JS)
│   ├── content/           # Scripts działające na NotebookLM
│   │   ├── content.js           # Komunikacja popup ↔ page
│   │   ├── auto-expand.js       # Auto-expand logic
│   │   ├── extractor.js         # Legacy extractor
│   │   └── injected-extractor.js # Main d3.js extractor
│   ├── background/        # Service worker
│   ├── assets/            # Logo (pełne)
│   └── icons/             # Ikony (16, 48, 128px)
├── viewer/                # Standalone Viewer (Netlify)
│   ├── index.html         # Single-file React app
│   ├── logo.png           # Logo dla viewera
│   └── _redirects         # Netlify routing
├── docs/                  # Szczegółowa dokumentacja
│   ├── INSTALLATION.md    # Instrukcja instalacji
│   ├── USAGE.md          # Instrukcja użytkowania
│   └── NETLIFY_DEPLOYMENT.md # Deploy na Netlify
├── assety koncepcyjne/    # Oryginalne działające skrypty
├── README.md             # Ten plik
└── QUICKSTART.md         # Szybki start dla developerów
```

## 🎨 Identyfikacja wizualna

- **Kolory główne**: Dark theme (#0f0f0f tło, #1a1a1a sekcje)
- **Akcent główny**: Fioletowy (#a855f7) - ramki, przyciski, tytuł
- **Akcenty dodatkowe**: Niebieski (#3b82f6), Zielony (#10b981), Pomarańczowy (#f97316)
- **Font**: Inter (Extension), Lato (Viewer)
- **Logo**: Network graph gradient (niebiesko-zielony)
- **Styl**: Zaokrąglone rogi (16px), fioletowa świecąca ramka

## 🌐 Live Viewer

Standalone viewer jest dostępny pod adresem:
```
https://nexus-mindmap-extractor.netlify.app
```

✅ **[Otwórz Live Viewer](https://nexus-mindmap-extractor.netlify.app)**

Viewer akceptuje dane przez:
- **URL parameter**: `?data=<compressed-json>` (automatycznie z wtyczki)
- **Manual upload**: Przeciągnij plik JSON na stronę (drag & drop)
- **Paste**: Wklej JSON bezpośrednio w upload box

## 🛠️ Dla developerów

### Wymagania
- Chrome/Edge (wersja 88+)
- Git (opcjonalnie)

### Development workflow

**Zmiany w extension:**
1. Edytuj pliki w folderze `extension/`
2. Przejdź do `chrome://extensions/`
3. Znajdź wtyczkę i kliknij ikonę odświeżania (⟳)
4. Przeładuj stronę NotebookLM (F5)

**Zmiany w viewer:**
1. Edytuj `viewer/index.html`
2. Commit i push do GitHub
3. Netlify automatycznie zdeployuje nową wersję (~1-2 minuty)

### Tech stack

**Extension:**
- Chrome Manifest V3
- Vanilla JavaScript (ES6+)
- CSP-compliant script injection
- d3.js data extraction via injected script

**Viewer:**
- React 18 (via unpkg CDN)
- Babel Standalone (JSX in browser)
- No build process needed
- Single-file deployment

## 🐛 Rozwiązywanie problemów

### Wtyczka nie pojawia się w pasku Chrome
**Rozwiązanie:** Kliknij ikonę puzzla w pasku i przypnij wtyczkę

### "Not on NotebookLM" w statusie
**Rozwiązanie:** Upewnij się że jesteś na stronie notebooklm.google.com z otwartym Mind Map

### "Content script not loaded"
**Rozwiązanie:** Odśwież stronę NotebookLM (F5), poczekaj chwilę, spróbuj ponownie

### Auto-expand nie rozwinął wszystkich węzłów
**Rozwiązanie:** To normalne - NotebookLM czasem blokuje automatyczne klikanie. Rozwiń pozostałe węzły ręcznie przed ekstrakcją.

### Błąd "Manifest file is missing"
**Rozwiązanie:** Upewnij się że wybrałeś folder `extension/`, nie główny folder projektu

### CSV wklejony do Sheets pokazuje dziwne znaki
**Rozwiązanie:** Użyj "Paste special" → "Paste values only" lub otwórz nowy czysty arkusz

## 📊 Znane ograniczenia

**Extension:**
- Działa tylko na `notebooklm.google.com`
- Auto-expand może nie działać na wszystkich węzłach (ograniczenie NotebookLM)
- Wymaga ręcznego załadowania w Developer Mode (nie jest w Chrome Web Store)

**Viewer:**
- Maksymalny rozmiar danych w URL: ~2MB (po kompresji base64)
- Dla bardzo dużych mindmap (>1000 węzłów) lepiej użyć manual upload
- Read-only - nie można edytować danych

## 📖 Dokumentacja

Szczegółowa dokumentacja znajduje się w folderze `docs/`:
- **[INSTALLATION.md](docs/INSTALLATION.md)** - Szczegółowa instrukcja instalacji z troubleshooting
- **[USAGE.md](docs/USAGE.md)** - Kompletny przewodnik użytkownika z przykładami
- **[NETLIFY_DEPLOYMENT.md](docs/NETLIFY_DEPLOYMENT.md)** - Jak zdeployować własną instancję viewera
- **[AI_FEATURES.md](docs/AI_FEATURES.md)** - 🤖 Οδηγός χρήσης AI Analysis features (NEW!)

## 🤝 Dla kontrybutorów

Chcesz pomóc w rozwoju? Świetnie!

1. Fork repozytorium
2. Stwórz branch dla swojej funkcji (`git checkout -b feature/AmazingFeature`)
3. Commit zmian (`git commit -m 'Add some AmazingFeature'`)
4. Push do brancha (`git push origin feature/AmazingFeature`)
5. Otwórz Pull Request

## 📄 Licencja

MIT License - możesz używać, modyfikować i dystrybuować ten projekt w dowolny sposób.

Zobacz pełną licencję w pliku [LICENSE](LICENSE).

## 🙏 Autor

Stworzony przez **[maciusman](https://github.com/maciusman)**

## 💬 Wsparcie

Masz pytania lub napotkałeś problem?

- 🐛 **Zgłoś bug**: [GitHub Issues](https://github.com/maciusman/nexus-mindmap-extractor/issues)
- 💡 **Zaproponuj funkcję**: [GitHub Issues](https://github.com/maciusman/nexus-mindmap-extractor/issues)
- 📧 **Kontakt**: Przez GitHub

---

**⭐ Jeśli projekt Ci się podoba, zostaw gwiazdkę na GitHub!**

**🔗 Udostępnij**: Podziel się linkiem z innymi użytkownikami NotebookLM!
