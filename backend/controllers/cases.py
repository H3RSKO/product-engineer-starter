import sqlite3
from utils.interpolate_case_data import interpolate_case_data, Case


def get_connection():
    conn = sqlite3.connect("database.db")
    return conn

def create_case():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO cases DEFAULT VALUES  
        """)  
        conn.commit()

        cursor.execute("SELECT id FROM cases WHERE rowid = last_insert_rowid()")
        case_id = cursor.fetchone()[0]

    return case_id

def get_case_by_id(case_id: str):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cases WHERE id = ?", (case_id,))
        case_data = cursor.fetchone()
        if case_data:
            case_dict = {
                "id": case_data[0],
                "created_at": case_data[1],
                "status": case_data[2],
                "fetched_status": case_data[3]
            }
            case = Case(**case_dict)
            return interpolate_case_data(case)
        else:
            return None

def get_all_cases():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM cases")
        case_data_list = cursor.fetchall()

        cases = []
        for case_data in case_data_list:
            case_dict = {
                "id": case_data[0],
                "created_at": case_data[1],
                "status": case_data[2],
                "fetched_status": case_data[3]
            }
            case = Case(**case_dict)
            interpolated_data = interpolate_case_data(case)
            cases.append(interpolated_data)

        return cases