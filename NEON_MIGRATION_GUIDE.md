# 🐘 Migrera E-brevmotor till Neon PostgreSQL

## 📋 Översikt

Denna guide hjälper dig att migrera din e-brevmotor från SQLite till Neon PostgreSQL för att fungera på Vercel.

---

## 🚀 Steg 1: Installera PostgreSQL-paket

Gå till din e-brevmotor-mapp och installera `pg`:

```bash
cd /path/to/ebrevsmotor
npm install pg
```

---

## 🔧 Steg 2: Skapa databaskonfiguration

Skapa en ny fil: `db-config.js`

```javascript
const { Pool } = require('pg');

// Använd Neon connection string från miljövariabel
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
```

---

## 📝 Steg 3: Uppdatera server.js

### **Ersätt SQLite-koden:**

**FÖRE (SQLite):**
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./newsletter.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});
```

**EFTER (PostgreSQL):**
```javascript
const pool = require('./db-config');

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to PostgreSQL database');
    initializeDatabase();
  }
});
```

---

## 🗄️ Steg 4: Uppdatera databasschemat

### **Ersätt `initializeDatabase()` funktionen:**

```javascript
async function initializeDatabase() {
  try {
    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Subscribers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        phone_number TEXT,
        subscribed INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        confirmed INTEGER DEFAULT 0,
        confirmation_token TEXT
      )
    `);

    // Newsletters table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletters (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        subscriber_id INTEGER REFERENCES subscribers(id),
        newsletter_id INTEGER REFERENCES newsletters(id),
        subscribed INTEGER DEFAULT 1,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(subscriber_id, newsletter_id)
      )
    `);

    // Campaigns table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id SERIAL PRIMARY KEY,
        newsletter_id INTEGER REFERENCES newsletters(id),
        subject TEXT NOT NULL,
        html_content TEXT,
        text_content TEXT,
        status TEXT DEFAULT 'draft',
        scheduled_at TIMESTAMP,
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Campaign stats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS campaign_stats (
        id SERIAL PRIMARY KEY,
        campaign_id INTEGER REFERENCES campaigns(id),
        subscriber_id INTEGER REFERENCES subscribers(id),
        opened INTEGER DEFAULT 0,
        clicked INTEGER DEFAULT 0,
        opened_at TIMESTAMP,
        clicked_at TIMESTAMP
      )
    `);

    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
```

---

## 🔄 Steg 5: Uppdatera alla databasanrop

### **SQLite syntax → PostgreSQL syntax**

**SQLite:**
```javascript
db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], callback);
db.get('SELECT * FROM users WHERE email = ?', [email], callback);
db.all('SELECT * FROM subscribers', [], callback);
```

**PostgreSQL:**
```javascript
pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password], callback);
pool.query('SELECT * FROM users WHERE email = $1', [email], callback);
pool.query('SELECT * FROM subscribers', [], callback);
```

**Viktiga ändringar:**
- `?` → `$1, $2, $3` (numrerade parametrar)
- `db.run()` → `pool.query()`
- `db.get()` → `pool.query()` (första raden)
- `db.all()` → `pool.query()` (alla rader)
- `AUTOINCREMENT` → `SERIAL`
- `INTEGER` → `INTEGER` eller `BIGINT`
- `DATETIME` → `TIMESTAMP`

---

## ⚙️ Steg 6: Konfigurera miljövariabler

### **Lokalt (.env):**
```bash
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
EMAIL_USER=din-email@gmail.com
EMAIL_PASS=ditt-app-lösenord
JWT_SECRET=din-hemliga-nyckel
```

### **På Vercel:**
1. Gå till ditt projekt på Vercel
2. Gå till **Settings** → **Environment Variables**
3. Lägg till:
   - `DATABASE_URL` = Din Neon connection string
   - `EMAIL_USER` = Din Gmail
   - `EMAIL_PASS` = App-specifikt lösenord
   - `JWT_SECRET` = En slumpmässig sträng

---

## 🧪 Steg 7: Testa lokalt

```bash
# Starta servern
npm start

# Testa att skapa ett nyhetsbrev
curl -X POST http://localhost:3000/api/newsletters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arkitekturfront",
    "slug": "arkitekturfront",
    "description": "Nyhetsbrev om arkitektur"
  }'

# Testa att lägga till prenumerant
curl -X POST http://localhost:3000/api/subscribers \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "newsletter_slug": "arkitekturfront"
  }'
```

---

## 🚀 Steg 8: Deploya till Vercel

```bash
cd /path/to/ebrevsmotor
git add .
git commit -m "Migrera till PostgreSQL (Neon)"
git push
```

Vercel kommer automatiskt att bygga om och deploya!

---

## 🔍 Verifiera att det fungerar

1. **Kolla Vercel-loggar** för att se att databasen ansluter
2. **Testa API-endpoints** från din Arkitekturfront-sida
3. **Lägg till en prenumerant** via formuläret

---

## 📊 Neon Dashboard

I Neon kan du:
- Se alla tabeller
- Köra SQL-queries direkt
- Övervaka anslutningar
- Se databasstatistik

---

## ⚠️ Vanliga problem

### **"Connection refused"**
- Kontrollera att `DATABASE_URL` är korrekt
- Verifiera att Neon-projektet är aktivt

### **"SSL required"**
- Se till att connection string innehåller `?sslmode=require`

### **"Too many connections"**
- Neon free tier har begränsning på anslutningar
- Använd connection pooling (redan implementerat med `pg.Pool`)

---

## 💡 Tips

1. **Backup**: Neon gör automatiska backups
2. **Branching**: Neon stödjer databas-branches för utveckling
3. **Monitoring**: Använd Neon Dashboard för att övervaka prestanda
4. **Scaling**: Uppgradera till betald plan om du behöver mer kapacitet

---

## 🎯 Nästa steg efter migration

1. ✅ Uppdatera Arkitekturfront med ny API-URL
2. ✅ Testa prenumerationsformuläret
3. ✅ Skapa ditt första nyhetsbrev
4. ✅ Skicka till dina prenumeranter!

---

**Lycka till med migrationen! 🐘📧**
