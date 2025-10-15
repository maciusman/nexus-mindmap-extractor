# 🎯 Instrukcja użytkowania - Nexus MindMap Extractor

## Podstawowy workflow

### Krok 1: Otwórz NotebookLM

1. Przejdź do https://notebooklm.google.com
2. Otwórz dowolny notebook
3. Wejdź w widok Mind Map (jeśli dostępny)

### Krok 2: Uruchom wtyczkę

1. Kliknij ikonę Nexus w pasku Chrome
2. Otworzy się popup wtyczki
3. Sprawdź status - powinien być "Ready" (zielony)

---

## Funkcje wtyczki

### 🌳 Expand All Nodes

**Co robi:**
- Automatycznie rozwija wszystkie zwinięte węzły w mindmap
- Próbuje 5 różnych metod rozwijania

**Jak używać:**
1. Kliknij przycisk "🌳 Expand All Nodes"
2. Poczekaj na zakończenie (może potrwać 10-30s)
3. Sprawdź czy wszystkie węzły są rozwinięte

**Uwaga:**
- NotebookLM może blokować automatyczne klikanie
- Jeśli nie wszystkie węzły się rozwinęły, rozwiń je ręcznie (klikając >)

---

### 📤 Extract to JSON

**Co robi:**
- Ekstrahuje całą strukturę mindmap do formatu JSON
- Automatycznie kopiuje do schowka

**Jak używać:**
1. Kliknij przycisk "📤 Extract to JSON"
2. Poczekaj na komunikat "✓ JSON copied to clipboard!"
3. JSON jest już w schowku, możesz go wkleić gdzie chcesz (Ctrl+V)

**Format JSON:**
```json
{
  "extractedAt": "2025-10-15T10:00:00.000Z",
  "extractionMethod": "d3.js __data__",
  "metadata": {
    "totalNodes": 45,
    "domNodes": 45,
    "rootNode": "Nazwa głównego węzła",
    "coverage": 100.0
  },
  "data": {
    "text": "Nazwa głównego węzła",
    "children": [
      {
        "text": "Dziecko 1",
        "children": []
      }
    ]
  }
}
```

---

### 📊 Extract to CSV

**Co robi:**
- Konwertuje mindmap do formatu CSV
- Idealny do Google Sheets lub Excel
- Kopiuje automatycznie do schowka

**Jak używać:**
1. Kliknij przycisk "📊 Extract to CSV"
2. Poczekaj na komunikat "✓ CSV copied!"
3. Otwórz Google Sheets
4. Kliknij w komórkę A1
5. Wklej (Ctrl+V)
6. Gotowe! 🎉

**Format CSV:**

| Depth | Path | Has_Children | Children_Count | Level_0 | Level_1 | Level_2 |
|-------|------|--------------|----------------|---------|---------|---------|
| 0 | Root | YES | 3 | Root | | |
| 1 | Root > Child1 | NO | 0 | | Child1 | |
| 1 | Root > Child2 | YES | 2 | | Child2 | |
| 2 | Root > Child2 > SubChild | NO | 0 | | | SubChild |

**Kolumny:**
- **Depth** - głębokość węzła (0 = root)
- **Path** - pełna ścieżka do węzła
- **Has_Children** - czy ma dzieci (YES/NO)
- **Children_Count** - liczba dzieci
- **Level_X** - tekst węzła na danym poziomie

---

### 👁️ Open in Viewer

**Co robi:**
- Otwiera interaktywny viewer w nowej karcie
- Wyświetla mindmap jako wizualizację graficzną
- Działa offline po załadowaniu

**Jak używać:**
1. Najpierw wyekstrahuj dane (przycisk JSON lub CSV)
2. Kliknij przycisk "👁️ Open in Viewer"
3. Otworzy się nowa karta z viewerem

**Funkcje viewera:**
- **Zoom**: Scroll myszką
- **Pan**: Przeciągnij (drag) po canvas
- **Expand/Collapse**: Klikaj +/− na węzłach
- **Expand All**: Przycisk w prawym górnym rogu
- **Fit View**: Przycisk wyśrodkowania (ikona maximize)
- **Download JSON**: Pobierz dane z powrotem

---

## Przykładowe scenariusze użycia

### Scenariusz 1: Eksport do Google Sheets

1. Otwórz mindmap w NotebookLM
2. Kliknij ikonę Nexus
3. Kliknij "🌳 Expand All Nodes" (opcjonalnie)
4. Kliknij "📊 Extract to CSV"
5. Otwórz Google Sheets
6. Ctrl+V w komórkę A1
7. Pracuj z danymi w arkuszu!

**Zastosowania:**
- Analiza struktury notatek
- Planowanie projektów
- Export do innych narzędzi
- Backup treści

---

### Scenariusz 2: Wizualizacja poza NotebookLM

1. Wyekstrahuj dane (JSON lub CSV)
2. Kliknij "👁️ Open in Viewer"
3. Viewer otworzy się w nowej karcie
4. Możesz wysłać link do viewera innym osobom (z danymi w URL)

**Zastosowania:**
- Prezentacje
- Sharing z zespołem
- Archiwizacja
- Praca offline

---

### Scenariusz 3: Backup i archiwizacja

1. Wyekstrahuj JSON
2. Zapisz plik (np. `mindmap-projekt-2025-10-15.json`)
3. Później możesz otworzyć w viewerze (drag & drop)

---

## Skróty klawiszowe (Viewer)

- **Scroll** - Zoom in/out
- **Drag** - Przesuwanie canvas
- **Click** - Expand/collapse węzeł
- **Esc** - Fit view (w przyszłych wersjach)

---

## Ograniczenia

### NotebookLM
- Auto-expand może nie działać na wszystkich węzłach
- Niektóre mindmapy mogą wymagać ręcznego rozwijania
- Extension działa tylko na `notebooklm.google.com`

### Viewer
- Maksymalny rozmiar danych w URL: ~2MB
- Dla większych mindmap (>1000 węzłów) lepiej użyć manual upload

### CSV Export
- Maksymalna głębokość: praktycznie nieograniczona
- Google Sheets limit: 10 milionów komórek

---

## FAQ

### Dlaczego auto-expand nie rozwinął wszystkich węzłów?

NotebookLM może blokować programatyczne klikanie. Rozwiń pozostałe węzły ręcznie przed ekstrakcją.

### Czy mogę edytować dane w viewerze?

Obecnie viewer jest read-only. Możesz edytować JSON w zewnętrznym edytorze i wczytać ponownie.

### Czy dane są wysyłane na serwer?

NIE. Wszystko działa lokalnie w przeglądarce. Twoje dane nie opuszczają komputera.

### Jak udostępnić mindmap innym?

1. Wyekstrahuj JSON
2. Wyślij plik JSON
3. Odbiorca otworzy w viewerze (drag & drop)

---

## Wsparcie

Masz pytania? Zgłoś issue:
👉 https://github.com/maciusman/nexus-mindmap-extractor/issues
