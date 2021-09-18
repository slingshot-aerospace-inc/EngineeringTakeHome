from fastapi import FastAPI
from src import match_simulator

app = FastAPI()

@app.get("/last_match_results")
def get_last_match_results():
    return match_simulator.get_last_match()
