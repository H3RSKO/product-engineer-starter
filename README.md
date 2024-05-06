### Yosef Herskovitz - Senior Product Engineer Take Home

[Loom Video](https://www.loom.com/share/a9737d17751542fab4d2445ab975b838?sid=603a27ce-4087-4b82-a0b6-cf1bdda9cf03)

##### Backend:

To run the backend, you will first need to create a virtual environement and then install the requirements. Navigate into the /backend folder and run:

- `python -m venv env`
- `source env/bin/activate`
- When the env is running run: `pip install -r requirements.txt`

You will then need to initialize the DB by running a migration, this will create a database.db file.

- `python migrations/cases.py`

To start the server, run:

- `uvicorn main:app --reload`

##### Frontend:

To run the frontend, you will need to navigate to the frontend folder and:

- run `npm install`
- clone the `.env.example` file and save as `.env.local`. Fill in the url that the backend is running on (ex: http://127.0.0.1:8000)
- run `npm run dev` to start the frontend
