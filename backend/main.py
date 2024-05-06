from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from uuid import UUID
from controllers.cases import get_connection, create_case, get_all_cases, get_case_by_id
from utils.update_fetched_status import update_fetched_status

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    with get_connection() as conn:
        yield conn

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/cases")
async def get_all_cases_from_db():
    cases = get_all_cases()
    return cases

@app.post("/cases")
async def create_new_case(background_tasks: BackgroundTasks = BackgroundTasks()):
    case_id = create_case()

    # Schedule background tasks to modify fetched_status
    background_tasks.add_task(update_fetched_status, case_id, 2, "processing", 10)
    background_tasks.add_task(update_fetched_status, case_id, 3,"complete", 20)

    return {"id": case_id}

@app.get("/cases/{case_id}")
async def get_case(case_id: str):
    error = HTTPException(status_code=404, detail="Error")
    try: 
        UUID(case_id)
    except ValueError:
        raise error 
    case = get_case_by_id(case_id)
    if not case:
        raise error
    return case