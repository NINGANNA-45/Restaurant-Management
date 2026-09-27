const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    // Vercel / Turso database
    const { createClient } = require('@libsql/client');

    const client = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    });

    const ready = (async () => {
        await client.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fullname TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);

        await client.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                item_name TEXT NOT NULL,
                price INTEGER NOT NULL,
                status TEXT DEFAULT 'PENDING',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        `);
    })();

    db = {
        run(sql, params, callback) {
            ready
                .then(() => client.execute({
                    sql,
                    args: params || []
                }))
                .then((result) => {
                    const context = {
                        lastID: Number(result.lastInsertRowid || 0)
                    };

                    callback.call(context, null);
                })
                .catch((err) => {
                    callback.call({}, err);
                });
        },

        get(sql, params, callback) {
            ready
                .then(() => client.execute({
                    sql,
                    args: params || []
                }))
                .then((result) => {
                    callback(null, result.rows[0] || undefined);
                })
                .catch((err) => {
                    callback(err);
                });
        },

        all(sql, params, callback) {
            ready
                .then(() => client.execute({
                    sql,
                    args: params || []
                }))
                .then((result) => {
                    callback(null, result.rows);
                })
                .catch((err) => {
                    callback(err);
                });
        }
    };

} else {
    // Local development database
    const dbPath = path.resolve(__dirname, 'artisan_table.db');

    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Database connection error:', err.message);
        } else {
            console.log('Connected to SQLite database.');
        }
    });

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                fullname TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                item_name TEXT NOT NULL,
                price INTEGER NOT NULL,
                status TEXT DEFAULT 'PENDING',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        `);
    });
}

module.exports = db;