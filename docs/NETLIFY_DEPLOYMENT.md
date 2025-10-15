# 🌐 Deployment Viewera na Netlify

## Automatyczny deployment z GitHub

### Krok 1: Zaloguj się do Netlify

1. Przejdź do: https://app.netlify.com/
2. Zaloguj się przez GitHub (jeśli nie masz konta - załóż)

### Krok 2: Dodaj nową stronę

1. Kliknij **"Add new site"** → **"Import an existing project"**
2. Wybierz **"Deploy with GitHub"**
3. Autoryzuj Netlify (jeśli pierwszy raz)
4. Znajdź i wybierz repo: **`maciusman/nexus-mindmap-extractor`**

### Krok 3: Konfiguracja build settings

**WAŻNE:** Viewer jest w folderze `viewer/`, więc:

```
Base directory: viewer
Build command: (pozostaw puste)
Publish directory: .
```

Lub prościej - ustaw:
```
Publish directory: viewer
```

### Krok 4: Deploy!

1. Kliknij **"Deploy site"**
2. Poczekaj ~30 sekund na deployment
3. ✅ Strona będzie dostępna pod losowym URL, np: `https://random-name-123.netlify.app`

### Krok 5: Zmień URL (opcjonalnie)

1. W ustawieniach site kliknij **"Site settings"**
2. **"Change site name"**
3. Wpisz: `nexus-mindmap-viewer` (jeśli dostępne)
4. URL zmieni się na: `https://nexus-mindmap-viewer.netlify.app`

### Krok 6: Zaktualizuj URL w extension

Po uzyskaniu finalnego URL Netlify:

1. Edytuj plik: `extension/popup/popup.js`
2. Zmień linię 4:
   ```javascript
   const VIEWER_URL = 'https://nexus-mindmap-viewer.netlify.app';
   ```
3. Zapisz i commit:
   ```bash
   git add extension/popup/popup.js
   git commit -m "Update viewer URL to Netlify deployment"
   git push origin main
   ```

---

## Automatyczne updaty

**✅ Automatyzacja działa!**

Każdy push do `main` branch automatycznie:
1. Netlify wykryje zmiany w repo
2. Prze-deployuje viewer
3. Strona będzie zaktualizowana w ~1 minutę

---

## Custom Domain (opcjonalnie)

Jeśli masz własną domenę:

1. **Netlify Dashboard** → **Site settings** → **Domain management**
2. Kliknij **"Add custom domain"**
3. Wpisz swoją domenę (np. `viewer.nexusmindmap.com`)
4. Dodaj CNAME record w DNS:
   ```
   CNAME viewer nexus-mindmap-viewer.netlify.app
   ```
5. SSL certyfikat zostanie dodany automatycznie (Let's Encrypt)

---

## Weryfikacja

Po deployment sprawdź:

1. **Viewer działa**: Otwórz URL viewera w przeglądarce
2. **Upload JSON**: Przeciągnij plik JSON (test)
3. **URL params**: Test z `?data=...` (z wtyczki)

---

## Troubleshooting

### Błąd 404 na subpages
**Rozwiązanie:** Plik `viewer/_redirects` powinien zawierać:
```
/*    /index.html   200
```
✅ To już jest w projekcie!

### Viewer nie ładuje danych z URL
**Sprawdź:**
- Czy URL jest poprawnie zakodowany (base64)
- Czy rozmiar danych nie przekracza 2MB
- Console (F12) dla błędów JavaScript

### Długi czas deployment
- Normalnie 30-60 sekund
- Jeśli dłużej - sprawdź build logs w Netlify Dashboard

---

## Monitoring

**Netlify Dashboard** pokazuje:
- Deploy history
- Build logs
- Analytics (w darmowym planie - podstawowe)
- Error tracking

---

## Koszty

**Darmowy plan Netlify:**
- ✅ 100 GB bandwidth/miesiąc
- ✅ Unlimited sites
- ✅ Continuous deployment z Git
- ✅ SSL/HTTPS automatyczny
- ✅ W zupełności wystarczający dla tego projektu!

---

## Następne kroki po deployment

1. Skopiuj finalny URL viewera
2. Zaktualizuj `VIEWER_URL` w `extension/popup/popup.js`
3. Push do GitHub
4. Przetestuj całą integrację:
   - Załaduj wtyczkę do Chrome
   - Otwórz NotebookLM
   - Wyekstrahuj dane
   - Kliknij "Open in Viewer"
   - ✅ Powinno otworzyć viewer z danymi!

---

**Potrzebujesz pomocy?** Zgłoś issue na GitHub:
https://github.com/maciusman/nexus-mindmap-extractor/issues
