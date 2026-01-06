const db = require('./src/config/db');
const fs = require('fs');
const path = require('path');

const migrationFile = path.join(__dirname, 'migrations', 'add_daily_work_logs.sql');
const sql = fs.readFileSync(migrationFile, 'utf8');

const runMigration = async () => {
    try {
        console.log('Running daily work logs migration...');
        const statements = sql.split(';').filter(s => s.trim());
        for (const statement of statements) {
            await db.query(statement);
        }
        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

runMigration();
