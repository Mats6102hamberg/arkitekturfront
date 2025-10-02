# 📧 E-brevmotor Integration Guide

## 🎯 Översikt

Arkitekturfront är nu integrerad med din e-brevmotor! Besökare kan prenumerera på nyhetsbrev direkt från hemsidan.

---

## ⚙️ Setup

### **Steg 1: Starta din e-brevmotor**

```bash
cd /path/to/ebrevsmotor
npm install
npm start
```

E-brevmotorn körs nu på: `http://localhost:3000`

### **Steg 2: Skapa Arkitekturfront-nyhetsbrevet**

Använd din e-brevmotors API för att skapa ett nyhetsbrev för Arkitekturfront:

```bash
curl -X POST http://localhost:3000/api/newsletters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arkitekturfront",
    "slug": "arkitekturfront",
    "description": "Nyhetsbrev om arkitektur och design"
  }'
```

Eller skapa det via din e-brevmotors admin-gränssnitt.

### **Steg 3: Konfigurera URL (för produktion)**

När du deployar till Vercel, uppdatera API-URL:en i `index.html`:

```javascript
// Ändra från:
const EBREVMOTOR_API_URL = 'http://localhost:3000';

// Till din produktions-URL:
const EBREVMOTOR_API_URL = 'https://din-ebrevmotor.herokuapp.com';
```

---

## 🚀 Hur det fungerar

### **1. Prenumeration från hemsidan**

När någon fyller i e-postadressen i footern:
1. ✅ E-postadressen skickas till din e-brevmotor
2. ✅ Prenumeranten läggs till i databasen
3. ✅ Prenumeranten kopplas till "Arkitekturfront"-nyhetsbrevet
4. ✅ Bekräftelsemeddelande visas på sidan

### **2. Hantera prenumeranter**

Alla prenumeranter finns i din e-brevmotors databas:
- Se alla prenumeranter i admin-gränssnittet
- Exportera listor
- Hantera avregistreringar

### **3. Skicka nyhetsbrev**

När du vill skicka ett nyhetsbrev om nya artiklar:

**Alternativ A: Via e-brevmotorns admin-gränssnitt**
1. Logga in på `http://localhost:5173`
2. Skapa en ny kampanj
3. Välj "Arkitekturfront" som nyhetsbrev
4. Skriv ditt meddelande
5. Skicka!

**Alternativ B: Via API**
```bash
curl -X POST http://localhost:3000/api/campaigns \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "newsletter_id": 1,
    "subject": "Ny artikel: Gamla Stan",
    "html_content": "<h1>Ny artikel!</h1><p>Läs vår senaste artikel...</p>",
    "text_content": "Ny artikel! Läs vår senaste artikel..."
  }'
```

---

## 📝 E-postmallar för artiklar

Här är en mall du kan använda för att skicka nyhetsbrev om nya artiklar:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #000; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a1a1a; padding: 20px; text-align: center; }
        .logo { color: #d4af37; font-size: 24px; font-weight: bold; }
        .article { background-color: #1a1a1a; margin: 20px 0; padding: 20px; border-radius: 10px; }
        .article img { width: 100%; border-radius: 8px; margin-bottom: 15px; }
        .article h2 { color: #d4af37; margin-bottom: 10px; }
        .article p { color: #ddd; line-height: 1.6; margin-bottom: 15px; }
        .button { display: inline-block; background-color: #d4af37; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">ARKITEKTURFRONT</div>
        </div>
        
        <div class="article">
            <img src="[ARTIKEL_BILD_URL]" alt="Artikel">
            <h2>[ARTIKEL_TITEL]</h2>
            <p>[ARTIKEL_BESKRIVNING]</p>
            <a href="[ARTIKEL_URL]" class="button">Läs mer →</a>
        </div>
        
        <div class="footer">
            <p>Du får detta mail för att du prenumererar på Arkitekturfront.</p>
            <p><a href="[AVREGISTRERINGS_LÄNK]" style="color: #666;">Avregistrera</a></p>
        </div>
    </div>
</body>
</html>
```

---

## 🔧 Avancerade funktioner

### **Automatisk utskick vid nya artiklar**

Du kan skapa en webhook i admin-gränssnittet som automatiskt skickar ett mail när en ny artikel publiceras:

1. När du sparar en artikel i admin.html
2. Trigga ett API-anrop till e-brevmotorn
3. Skicka automatiskt ett nyhetsbrev

(Denna funktion kan implementeras om du vill!)

### **Segmentering**

Din e-brevmotor stödjer flera nyhetsbrev. Du kan skapa:
- Arkitekturfront (arkitektur)
- Boulefront (klättring)
- Konstfront (konst)
- Etc.

Prenumeranter kan välja vilka de vill prenumerera på!

---

## 🛡️ Säkerhet

### **CORS-konfiguration**

För produktion, konfigurera CORS i din e-brevmotor:

```javascript
// I server.js
app.use(cors({
  origin: ['https://arkitekturfront.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### **Rate Limiting**

Din e-brevmotor har redan rate limiting för att förhindra spam.

---

## 📊 Statistik

Din e-brevmotor spårar automatiskt:
- ✅ Antal prenumeranter
- ✅ Öppningsfrekvens
- ✅ Klickfrekvens
- ✅ Avregistreringar

Se statistik i admin-gränssnittet!

---

## 🚀 Deployment till produktion

### **1. Deploya e-brevmotorn**

Rekommenderade plattformar:
- **Heroku** (enklast)
- **Railway**
- **Render**
- **DigitalOcean**

### **2. Uppdatera Arkitekturfront**

Ändra API-URL:en i `index.html` till din produktions-URL.

### **3. Konfigurera miljövariabler**

Se till att din e-brevmotor har rätt miljövariabler:
- `EMAIL_USER`
- `EMAIL_PASS`
- `JWT_SECRET`
- `DATABASE_URL` (om du använder PostgreSQL i produktion)

---

## 💡 Tips

1. **Testa lokalt först** - Kör både Arkitekturfront och e-brevmotorn lokalt
2. **Använd mallar** - Din e-brevmotor har 12+ färdiga mallar
3. **Schemalägg** - Skicka nyhetsbrev vid optimala tider
4. **A/B-testning** - Testa olika ämnesrader
5. **Personalisering** - Använd prenumerantens namn i mailen

---

## ❓ Felsökning

### **"Kunde inte ansluta till servern"**
- Kontrollera att e-brevmotorn körs på `http://localhost:3000`
- Kolla CORS-inställningar

### **"Något gick fel"**
- Kontrollera att "arkitekturfront"-nyhetsbrevet finns i databasen
- Se server-loggar för detaljer

### **Prenumeranter syns inte**
- Kontrollera databasen: `sqlite3 newsletter.db "SELECT * FROM subscribers;"`
- Verifiera att API-anropet lyckas (kolla Network-fliken i DevTools)

---

## 📞 Support

Om du behöver hjälp:
1. Kolla server-loggar
2. Använd DevTools Network-flik
3. Testa API-endpoints med Postman/curl

---

**Lycka till med ditt nyhetsbrev! 📧🏛️**
