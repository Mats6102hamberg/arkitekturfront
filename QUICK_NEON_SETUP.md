# ⚡ Snabb Neon Setup (5 minuter)

## 🎯 Steg 1: Hämta Neon Connection String

1. Gå till: https://console.neon.tech
2. Välj ditt projekt (eller skapa ett nytt)
3. Gå till **Dashboard** → **Connection Details**
4. Kopiera **Connection string** (välj "Pooled connection")

Det ser ut så här:
```
postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

## 🔧 Steg 2: Uppdatera e-brevmotorn

### **A. Installera PostgreSQL-paket**
```bash
cd /path/to/ebrevsmotor
npm install pg
```

### **B. Kopiera filer**
Kopiera dessa filer från `neon-migration-files/` till din e-brevmotor:
- `db-config.js` → `/path/to/ebrevsmotor/db-config.js`
- `init-database.js` → `/path/to/ebrevsmotor/init-database.js`

### **C. Skapa .env-fil**
```bash
cd /path/to/ebrevsmotor
nano .env
```

Lägg till:
```
DATABASE_URL=postgresql://din-connection-string-här
EMAIL_USER=din-email@gmail.com
EMAIL_PASS=ditt-app-lösenord
JWT_SECRET=en-slumpmässig-sträng-här
EMAIL_FROM_NAME=Arkitekturfront
EMAIL_REPLY_TO=kontakt@arkitekturfront.se
```

### **D. Uppdatera server.js**

Hitta denna rad (ca rad 45):
```javascript
const db = new sqlite3.Database('./newsletter.db', (err) => {
```

Ersätt hela SQLite-blocket med:
```javascript
const pool = require('./db-config');
const initializeDatabase = require('./init-database');

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to PostgreSQL database at:', res.rows[0].now);
    initializeDatabase();
  }
});
```

### **E. Uppdatera alla databasanrop**

**Sök och ersätt i server.js:**

1. **Parametrar:**
   - `?` → `$1, $2, $3` etc.

2. **Metoder:**
   - `db.run(` → `pool.query(`
   - `db.get(` → `pool.query(`
   - `db.all(` → `pool.query(`

3. **Callbacks:**
```javascript
// FÖRE (SQLite)
db.run(sql, params, function(err) {
  if (err) return res.status(500).json({ error: err.message });
  res.json({ id: this.lastID });
});

// EFTER (PostgreSQL)
pool.query(sql, params, (err, result) => {
  if (err) return res.status(500).json({ error: err.message });
  res.json({ id: result.rows[0].id });
});
```

---

## 🧪 Steg 3: Testa lokalt

```bash
# Starta servern
npm start

# Du borde se:
# ✅ Connected to PostgreSQL database
# 🔧 Initializing database tables...
# ✅ Users table created
# ... etc

# Testa API
curl -X POST http://localhost:3000/api/newsletters \
  -H "Content-Type: application/json" \
  -d '{"name":"Arkitekturfront","slug":"arkitekturfront","description":"Arkitektur"}'
```

---

## 🚀 Steg 4: Deploya till Vercel

### **A. Lägg till miljövariabler på Vercel**
1. Gå till: https://vercel.com/dashboard
2. Välj ditt e-brevmotor-projekt
3. **Settings** → **Environment Variables**
4. Lägg till:
   - `DATABASE_URL` = Din Neon connection string
   - `EMAIL_USER` = Din Gmail
   - `EMAIL_PASS` = App-lösenord
   - `JWT_SECRET` = Slumpmässig sträng

### **B. Pusha till GitHub**
```bash
cd /path/to/ebrevsmotor
git add .
git commit -m "Migrera till PostgreSQL (Neon)"
git push
```

Vercel deployar automatiskt!

---

## 🔗 Steg 5: Uppdatera Arkitekturfront

När e-brevmotorn är deployad, uppdatera `index.html`:

```javascript
// Rad 533 i index.html
const EBREVMOTOR_API_URL = 'https://din-ebrevmotor.vercel.app';
```

Pusha till GitHub:
```bash
cd /Users/admin/Arkitekturfront
git add index.html
git commit -m "Uppdatera API-URL till Vercel"
git push
```

---

## ✅ Verifiera

1. **Testa prenumerationsformuläret** på din Arkitekturfront-sida
2. **Kolla Neon Dashboard** - se att prenumeranten finns i `subscribers`-tabellen
3. **Logga in på e-brevmotorns admin** - se prenumeranten där

---

## 🆘 Behöver du hjälp?

Om något inte fungerar, kolla:
1. **Vercel Logs** - Se felmeddelanden
2. **Neon Dashboard** - Verifiera anslutningar
3. **Browser Console** - Se JavaScript-fel

---

**Du är redo! 🎉**
