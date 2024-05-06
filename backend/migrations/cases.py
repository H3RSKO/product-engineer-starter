import sqlite3

def get_connection():
    conn = sqlite3.connect("database.db")
    return conn

def migrate_cases_table():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS cases (
                id TEXT PRIMARY KEY DEFAULT (hex(randomblob(16))),
                created_at TEXT DEFAULT (DATETIME('now', 'localtime')),
                status TEXT DEFAULT submitted,
                fetched_status INTEGER DEFAULT 1
            )
        """)
        conn.commit()

if __name__ == "__main__":
    migrate_cases_table()