# 📝 Guide: Hur man lägger till nya artiklar

## Snabbstart

### Steg 1: Öppna Admin-gränssnittet
1. Öppna `index.html` i din webbläsare
2. Klicka på **"📝 Admin"** i navigationsmenyn

### Steg 2: Fyll i artikelformuläret
Fyll i följande fält:

- **Titel**: Namnet på din artikel (t.ex. "Eiffeltornet - Från kontrovers till ikon")
- **Beskrivning**: En kort sammanfattning (visas på startsidan)
- **Bild-URL**: Länk till en bild (tips: använd [Unsplash](https://unsplash.com))
- **Artikel-länk**: Lämna tomt tills vidare

### Steg 3: Skapa artikelsidan
1. Klicka på knappen **"📝 Skapa artikelsida"**
2. En HTML-fil laddas ner automatiskt (t.ex. `eiffeltornet-fran-kontrovers-till-ikon.html`)
3. Filnamnet fylls automatiskt i fältet "Artikel-länk"

### Steg 4: Redigera artikeln
1. Öppna den nedladdade HTML-filen i en textredigerare
2. Ersätt platshållartexten (t.ex. `[Skriv om byggnadens historia här...]`) med ditt innehåll
3. Spara filen i samma mapp som `index.html`

### Steg 5: Spara i CMS
1. Klicka på **"Spara artikel"** i admin-gränssnittet
2. Artikeln visas nu på startsidan!

---

## 🎯 Förklaring av fälten

### Artikel-länk
Detta är **filnamnet** till din fullständiga artikel. Exempel:
- `eiffeltornet.html`
- `drottningholms-slott.html`
- `turning-torso.html`

**När du klickar på "Skapa artikelsida"** genereras detta filnamn automatiskt från titeln.

**Om artikeln inte är klar än**, skriv bara `#` i fältet.

---

## 📋 Arbetsflöde - Exempel

### Exempel: Lägga till artikel om Sagrada Familia

1. **I admin-gränssnittet:**
   - Titel: `Sagrada Familia - Gaudís eviga mästerverk`
   - Beskrivning: `Antoni Gaudís ikoniska basilika i Barcelona har varit under konstruktion i över 140 år...`
   - Bild-URL: `https://images.unsplash.com/photo-1583422409516-2895a77efded`
   - Klicka på **"📝 Skapa artikelsida"**

2. **Filen laddas ner:**
   - Filnamn: `sagrada-familia-gaudis-eviga-masterverk.html`
   - Detta fylls automatiskt i "Artikel-länk"-fältet

3. **Redigera innehållet:**
   - Öppna `sagrada-familia-gaudis-eviga-masterverk.html`
   - Skriv din fullständiga artikel
   - Spara filen i `/Users/admin/Arkitekturfront/`

4. **Spara i CMS:**
   - Klicka på **"Spara artikel"**
   - Artikeln syns nu på startsidan med en "Läs mer →" länk

---

## 🎨 Redigera artikelinnehållet

När du öppnar den genererade HTML-filen ser du platshållare som:

```html
<h2>Historia och bakgrund</h2>
<p>
    [Skriv om byggnadens historia här...]
</p>
```

**Ersätt bara texten mellan `<p>` och `</p>`:**

```html
<h2>Historia och bakgrund</h2>
<p>
    Sagrada Familia påbörjades 1882 och har blivit ett av världens mest 
    kända arkitektoniska projekt. Antoni Gaudí övertog projektet 1883...
</p>
```

### Lägg till fler stycken
```html
<h2>Din rubrik</h2>
<p>Första stycket...</p>
<p>Andra stycket...</p>
<p>Tredje stycket...</p>
```

### Lägg till bilder
```html
<img src="https://images.unsplash.com/photo-..." alt="Beskrivning">
```

### Lägg till citat
```html
<blockquote>
    "Arkitektur är musik i sten" - Antoni Gaudí
</blockquote>
```

---

## 💡 Tips och tricks

### 1. Hitta bra bilder
- **Unsplash**: https://unsplash.com (gratis, högkvalitativa bilder)
- **Pexels**: https://pexels.com
- Sök på engelska för bäst resultat (t.ex. "eiffel tower architecture")

### 2. Kopiera URL från Unsplash
1. Hitta en bild på Unsplash
2. Högerklicka på bilden → "Kopiera bildadress"
3. Klistra in i "Bild-URL"-fältet

### 3. Skapa bra filnamn
Filnamn genereras automatiskt från titeln:
- "Eiffeltornet - Från kontrovers till ikon" → `eiffeltornet-fran-kontrovers-till-ikon.html`
- Svenska tecken (å, ä, ö) konverteras automatiskt
- Mellanslag och specialtecken blir bindestreck

### 4. Redigera befintliga artiklar
1. Klicka på **"Redigera"** i artikellistan
2. Ändra informationen
3. Klicka på **"Spara artikel"**

---

## 🔄 Så fungerar systemet

```
┌─────────────────┐
│  Admin-gränssnitt │
│  (admin.html)    │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  localStorage    │ ← Artikeldata sparas här
│  (webbläsaren)   │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Startsidan      │ ← Läser från localStorage
│  (index.html)    │    och visar artiklar
└─────────────────┘
```

### Vad händer när du klickar "Spara artikel"?
1. Artikeldata (titel, beskrivning, bild, länk) sparas i localStorage
2. Startsidan läser automatiskt från localStorage
3. Artikeln visas som ett kort på startsidan
4. När någon klickar "Läs mer →" öppnas den fullständiga artikeln

---

## ❓ Vanliga frågor

### Var skriver jag den långa artikeln?
I den HTML-fil som laddas ner när du klickar "📝 Skapa artikelsida". Öppna filen i en textredigerare och ersätt platshållartexten.

### Måste jag skapa artikelsidan först?
Nej, du kan också:
1. Kopiera en befintlig artikel (t.ex. `drottningholms-slott.html`)
2. Byt namn på filen
3. Redigera innehållet
4. Ange filnamnet i "Artikel-länk"-fältet

### Vad händer om jag rensar webbläsardata?
Artiklarna i localStorage försvinner, men de finns kvar i `articles.json` som backup. Ladda om sidan så läses de in igen.

### Kan jag lägga till bilder i artikeln?
Ja! Använd `<img>`-taggen i HTML-filen:
```html
<img src="https://..." alt="Beskrivning">
```

### Hur tar jag bort en artikel?
1. Gå till admin-gränssnittet
2. Scrolla ner till "Alla artiklar"
3. Klicka på **"Ta bort"**

---

## 🚀 Nästa steg

När du är bekväm med grunderna kan du:
- Anpassa CSS-styling i artikelmallen
- Lägga till fler sektioner i artiklarna
- Skapa kategorier för olika typer av byggnader
- Lägga till en sökfunktion

**Lycka till med dina artiklar! 🏛️✨**
