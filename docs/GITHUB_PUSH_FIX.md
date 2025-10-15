# 🔧 Fix: GitHub Push 403 Error

## Problem
```
remote: Permission to maciusman/nexus-mindmap-extractor.git denied to maciusman.
fatal: unable to access 'https://github.com/maciusman/nexus-mindmap-extractor.git/': The requested URL returned error: 403
```

## Rozwiązanie - Personal Access Token

### Krok 1: Wygeneruj token

1. Przejdź do: https://github.com/settings/tokens/new
2. Wypełnij:
   - **Note**: `nexus-mindmap-extractor-push`
   - **Expiration**: `90 days` (lub dłużej)
   - **Scopes**: Zaznacz:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)

3. Kliknij **"Generate token"** na dole strony
4. **SKOPIUJ TOKEN** (pokazuje się tylko raz!)
   - Będzie wyglądać tak: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Krok 2: Użyj tokenu do push

Wykonaj w PowerShell:

```powershell
cd "X:\Aplikacje\nexus-mind-map-extractor"

# Usuń stary remote
git remote remove origin

# Dodaj nowy remote z tokenem
git remote add origin https://TwojToken@github.com/maciusman/nexus-mindmap-extractor.git

# Push
git push -u origin main
```

**UWAGA:** Zamień `TwojToken` na faktyczny token!

### Przykład:
```powershell
git remote add origin https://ghp_ABC123XYZ456@github.com/maciusman/nexus-mindmap-extractor.git
```

---

## Alternatywne rozwiązanie - SSH

Jeśli wolisz SSH (bardziej bezpieczne):

### 1. Wygeneruj klucz SSH (jeśli nie masz)
```powershell
ssh-keygen -t ed25519 -C "seomaciej85@gmail.com"
```

### 2. Dodaj klucz do GitHub
```powershell
# Skopiuj klucz publiczny
cat ~/.ssh/id_ed25519.pub
```

Przejdź do: https://github.com/settings/keys
- Kliknij "New SSH key"
- Wklej klucz
- Zapisz

### 3. Zmień remote na SSH
```powershell
git remote remove origin
git remote add origin git@github.com:maciusman/nexus-mindmap-extractor.git
git push -u origin main
```

---

## Szybkie rozwiązanie (POLECAM)

Po wygenerowaniu tokena na https://github.com/settings/tokens/new:

```powershell
git remote set-url origin https://ghp_TWOJ_TOKEN_TUTAJ@github.com/maciusman/nexus-mindmap-extractor.git
git push -u origin main
```

✅ To powinno zadziałać!
