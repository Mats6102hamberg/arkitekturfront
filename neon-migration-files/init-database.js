const pool = require('./db-config');

async function initializeDatabase() {
  try {
    console.log('🔧 Initializing database tables...');

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
    console.log('✅ Users table created');

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
    console.log('✅ Subscribers table created');

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
    console.log('✅ Newsletters table created');

    // Subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        subscriber_id INTEGER REFERENCES subscribers(id) ON DELETE CASCADE,
        newsletter_id INTEGER REFERENCES newsletters(id) ON DELETE CASCADE,
        subscribed INTEGER DEFAULT 1,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(subscriber_id, newsletter_id)
      )
    `);
    console.log('✅ Subscriptions table created');

    // Campaigns table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id SERIAL PRIMARY KEY,
        newsletter_id INTEGER REFERENCES newsletters(id) ON DELETE CASCADE,
        subject TEXT NOT NULL,
        html_content TEXT,
        text_content TEXT,
        status TEXT DEFAULT 'draft',
        scheduled_at TIMESTAMP,
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Campaigns table created');

    // Campaign stats table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS campaign_stats (
        id SERIAL PRIMARY KEY,
        campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
        subscriber_id INTEGER REFERENCES subscribers(id) ON DELETE CASCADE,
        opened INTEGER DEFAULT 0,
        clicked INTEGER DEFAULT 0,
        opened_at TIMESTAMP,
        clicked_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Campaign stats table created');

    // Landing pages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS landing_pages (
        id SERIAL PRIMARY KEY,
        newsletter_id INTEGER REFERENCES newsletters(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        content TEXT,
        published INTEGER DEFAULT 0,
        views INTEGER DEFAULT 0,
        conversions INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Landing pages table created');

    // Surveys table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS surveys (
        id SERIAL PRIMARY KEY,
        newsletter_id INTEGER REFERENCES newsletters(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        questions TEXT,
        active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Surveys table created');

    // Survey responses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id SERIAL PRIMARY KEY,
        survey_id INTEGER REFERENCES surveys(id) ON DELETE CASCADE,
        subscriber_id INTEGER REFERENCES subscribers(id) ON DELETE CASCADE,
        responses TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Survey responses table created');

    // SMS campaigns table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sms_campaigns (
        id SERIAL PRIMARY KEY,
        newsletter_id INTEGER REFERENCES newsletters(id) ON DELETE CASCADE,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        scheduled_at TIMESTAMP,
        sent_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ SMS campaigns table created');

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
      CREATE INDEX IF NOT EXISTS idx_newsletters_slug ON newsletters(slug);
      CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_subscriber ON subscriptions(subscriber_id);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_newsletter ON subscriptions(newsletter_id);
    `);
    console.log('✅ Indexes created');

    console.log('🎉 Database initialization complete!');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

module.exports = initializeDatabase;
