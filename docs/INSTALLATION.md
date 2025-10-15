# 📦 Instrukcja instalacji - Nexus MindMap Extractor

## Instalacja wtyczki Chrome (Developer Mode)

### Krok 1: Pobierz kod

**Opcja A - Sklonuj repozytorium:**
```bash
git clone https://github.com/maciusman/nexus-mindmap-extractor.git
cd nexus-mindmap-extractor
```

**Opcja B - Pobierz ZIP:**
1. Przejdź do https://github.com/maciusman/nexus-mindmap-extractor
2. Kliknij zielony przycisk "Code" → "Download ZIP"
3. Rozpakuj archiwum w wybranym miejscu

### Krok 2: Otwórz Chrome Extensions

1. Otwórz przeglądarkę Chrome/Edge
2. W pasku adresu wpisz: `chrome://extensions/`
3. Naciśnij Enter

### Krok 3: Włącz Developer Mode

1. W prawym górnym rogu znajdź przełącznik **"Developer mode"**
2. Kliknij, aby włączyć (powinien być niebieski/aktywny)

### Krok 4: Załaduj wtyczkę

1. Kliknij przycisk **"Load unpacked"** (po lewej stronie, pod paskiem)
2. W oknie wyboru plików przejdź do folderu projektu
3. **WAŻNE:** Wybierz folder `extension/` (nie główny folder projektu!)
4. Kliknij "Select Folder" / "Wybierz folder"

### Krok 5: Weryfikacja

✅ Jeśli wszystko poszło dobrze:
- Wtyczka pojawi się na liście z nazwą "Nexus MindMap Extractor"
- Status będzie "Enabled" (zielony)
- Zobaczysz fioletowo-zieloną ikonę

❌ Jeśli pojawił się błąd:
- Upewnij się, że wybrałeś folder `extension/`, nie główny folder
- Sprawdź czy wszystkie pliki są na miejscu
- Zobacz sekcję "Troubleshooting" poniżej

### Krok 6: Przypnij wtyczkę (opcjonalnie)

1. Kliknij ikonę puzzla w pasku Chrome (obok paska adresu)
2. Znajdź "Nexus MindMap Extractor"
3. Kliknij ikonę pinezki, aby przypiąć do paska

---

## Struktura folderu `extension/`

Upewnij się, że folder `extension/` zawiera:

```
extension/
├── manifest.json          ← MUSI być obecny
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/
│   ├── content.js
│   ├── extractor.js
│   └── auto-expand.js
├── background/
│   └── background.js
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── assets/
    └── logo-full.png
```

---

## Troubleshooting

### Błąd: "Manifest file is missing or unreadable"
**Przyczyna:** Wybrałeś niewłaściwy folder
**Rozwiązanie:** Wybierz folder `extension/` zamiast głównego folderu projektu

### Błąd: "Failed to load extension"
**Przyczyna:** Brakujące pliki
**Rozwiązanie:** Upewnij się, że wszystkie pliki z repozytorium są pobrane

### Ikona nie wyświetla się
**Przyczyna:** Brakujące pliki ikon
**Rozwiązanie:** Uruchom `python resize_logo.py` w głównym folderze projektu

### Wtyczka nie działa na NotebookLM
**Przyczyna:** Brak uprawnień
**Rozwiązanie:**
1. Przejdź do `chrome://extensions/`
2. Znajdź wtyczkę i kliknij "Details"
3. Przewiń do "Site access"
4. Upewnij się, że `notebooklm.google.com` jest dozwolone

---

## Aktualizacja wtyczki

Gdy pobierzesz nową wersję:

1. Przejdź do `chrome://extensions/`
2. Znajdź "Nexus MindMap Extractor"
3. Kliknij ikonę odświeżania (⟳)
4. Lub usuń starą wersję i załaduj ponownie

---

## Deinstalacja

1. Przejdź do `chrome://extensions/`
2. Znajdź "Nexus MindMap Extractor"
3. Kliknij "Remove"
4. Potwierdź usunięcie

---

## Wsparcie

Problemy? Zgłoś issue na GitHub:
👉 https://github.com/maciusman/nexus-mindmap-extractor/issues
