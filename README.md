# Arkitekturfront CMS

Ett enkelt Content Management System (CMS) för att hantera artiklar på Arkitekturfront-webbplatsen.

## 🚀 Funktioner

- ✅ Lägg till nya artiklar enkelt via ett admin-gränssnitt
- ✅ Redigera befintliga artiklar
- ✅ Ta bort artiklar
- ✅ Automatisk sortering efter datum (nyaste först)
- ✅ Responsiv design för mobil och desktop
- ✅ Ingen databas krävs - använder localStorage

## 📁 Projektstruktur

```
Arkitekturfront/
├── index.html              # Huvudsidan (visar artiklar dynamiskt)
├── admin.html              # CMS admin-gränssnitt
├── articles.json           # Initial artikeldata
├── drottningholms-slott.html
├── stockholms-stadshus.html
├── turning-torso.html
└── README.md
```

## 🎯 Hur man använder CMS:et

### Steg 1: Öppna Admin-gränssnittet

1. Öppna `index.html` i din webbläsare
2. Klicka på **"📝 Admin"** i navigationsmenyn
3. Eller öppna `admin.html` direkt

### Steg 2: Lägg till en ny artikel

1. Fyll i formuläret med:
   - **Titel**: Namnet på artikeln (t.ex. "Eiffeltornet - Från kontrovers till ikon")
   - **Beskrivning**: En kort beskrivning av artikeln
   - **Bild-URL**: URL till en bild (tips: använd [Unsplash](https://unsplash.com) för gratis bilder)
   - **Artikel-länk**: Länk till artikelsidan (t.ex. `eiffeltornet.html` eller `#` för kommande artiklar)

2. Klicka på **"Spara artikel"**
3. Artikeln läggs automatiskt till och visas på hemsidan!

### Steg 3: Redigera en artikel

1. Scrolla ner till "Alla artiklar"-sektionen
2. Klicka på **"Redigera"** för den artikel du vill ändra
3. Uppdatera informationen i formuläret
4. Klicka på **"Spara artikel"**

### Steg 4: Ta bort en artikel

1. Scrolla ner till "Alla artiklar"-sektionen
2. Klicka på **"Ta bort"** för den artikel du vill radera
3. Bekräfta borttagningen

## 💾 Datalagring

CMS:et använder **localStorage** för att spara artiklar direkt i din webbläsare. Detta betyder:

- ✅ Inga servrar eller databaser behövs
- ✅ Snabb och enkel att använda
- ⚠️ Data sparas per webbläsare (om du rensar webbläsardata försvinner artiklarna)
- ⚠️ Fungerar endast lokalt (för produktion behövs en backend)

## 🖼️ Tips för bilder

För bästa resultat, använd bilder från:
- [Unsplash](https://unsplash.com) - Gratis högkvalitativa bilder
- [Pexels](https://pexels.com) - Gratis stockfoton
- Använd bilder i liggande format (landscape)
- Rekommenderad storlek: minst 800px bredd

### Exempel på bild-URL från Unsplash:
```
https://images.unsplash.com/photo-1234567890?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80
```

## 🔄 Hur det fungerar

1. **Initial laddning**: När du öppnar hemsidan första gången laddas artiklar från `articles.json`
2. **Sparar till localStorage**: Artiklarna sparas automatiskt i webbläsarens localStorage
3. **Admin-ändringar**: När du lägger till/redigerar/tar bort artiklar i admin-gränssnittet uppdateras localStorage
4. **Dynamisk visning**: Hemsidan läser alltid från localStorage och visar artiklarna dynamiskt

## 🎨 Anpassning

### Ändra färgtema
Redigera CSS-variablerna i `admin.html` och `index.html`:
- Guldfärg: `#d4af37`
- Bakgrundsfärg: `#0a0a0a`
- Kortfärg: `#1a1a1a`

### Ändra antal artiklar som visas
Alla artiklar visas automatiskt, sorterade efter datum (nyaste först).

## 🚀 Framtida förbättringar

För en produktionsmiljö kan du lägga till:
- Backend-server (Node.js, PHP, Python)
- Riktig databas (MySQL, MongoDB)
- Användarautentisering
- Bilduppladdning
- Rich text editor för artikelinnehåll
- Kategorier och taggar

## 📝 Support

Om du stöter på problem:
1. Kontrollera att du använder en modern webbläsare (Chrome, Firefox, Safari, Edge)
2. Öppna Developer Console (F12) för att se eventuella felmeddelanden
3. Rensa localStorage om något går fel: `localStorage.clear()` i konsolen

## 📄 Licens

Detta projekt är skapat för Arkitekturfront.

---

**Lycka till med din arkitekturblogg! 🏛️✨**
