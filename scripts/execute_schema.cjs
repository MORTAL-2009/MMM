const fs = require('fs');
const path = require('path');

async function main() {
  const sqlPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const connectionString = process.argv[2] || process.env.DATABASE_URL || process.env.SUPABASE_DB_URL;

  if (!connectionString) {
    console.log('------------------------------------------------------------');
    console.log('Make My Marriage — Database Architecture Execution Helper');
    console.log('------------------------------------------------------------');
    console.log('SQL Migration has been saved to:');
    console.log('  1. supabase/schema.sql');
    console.log('  2. supabase/migrations/20261021000000_database_architecture.sql');
    console.log('');
    console.log('HOW TO EXECUTE:');
    console.log('Option A (Supabase Dashboard - Recommended):');
    console.log('  1. Open your Supabase Dashboard: https://supabase.com/dashboard');
    console.log('  2. Go to your project -> SQL Editor -> New Query');
    console.log('  3. Paste the contents of supabase/schema.sql and click "RUN"');
    console.log('');
    console.log('Option B (Direct Connection String):');
    console.log('  node scripts/execute_schema.cjs "postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"');
    console.log('------------------------------------------------------------');
    return;
  }

  let pg;
  try {
    pg = require('pg');
  } catch (err) {
    console.log('Installing pg package to run direct connection...');
    const { execSync } = require('child_process');
    execSync('npm install --no-save pg', { stdio: 'inherit' });
    pg = require('pg');
  }

  const { Client } = pg;
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting to PostgreSQL database...');
    await client.connect();
    console.log('Connected successfully! Executing database architecture...');
    await client.query(sql);
    console.log('✓ Database architecture executed successfully!');
    console.log('Tables, ENUMs, Indexes, RLS Policies, and Triggers created.');
  } catch (err) {
    console.error('Execution error:', err.message);
  } finally {
    await client.end();
  }
}

main().catch(console.error);
