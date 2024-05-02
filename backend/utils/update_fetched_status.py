import sqlite3
import asyncio

def get_connection():
    conn = sqlite3.connect("database.db")
    return conn

async def update_fetched_status(case_id: str, new_fetched_status: int, new_status: str, delay: int):
    await asyncio.sleep(delay)

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE cases SET fetched_status = ?, status = ? WHERE id = ?
        """, (new_fetched_status, new_status, case_id))
        conn.commit()