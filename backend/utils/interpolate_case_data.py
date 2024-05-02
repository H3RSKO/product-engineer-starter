import json
from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Case(SQLModel, table=True):
    id: Optional[str] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    status: str = Field(default="submitted")
    fetched_status: int = Field(default=1) 

def interpolate_case_data(case: Case):
    if case.fetched_status in (1, 2, 3):
        filename = f"utils/response-{case.fetched_status}.json"
        with open(filename, "r") as f:
            json_data = json.load(f)

        json_data["case_id"] = case.id
        json_data["status"] = case.status
    
        return json_data
    else:
        return case