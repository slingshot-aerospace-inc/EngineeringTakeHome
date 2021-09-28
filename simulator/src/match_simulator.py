import psycopg2
import psycopg2.extras
import random
import math
import time
import os

DB_HOST = os.getenv("DB_HOST", "localhost")

def get_database_connection():
  return psycopg2.connect(f"dbname=postgres host={DB_HOST} user=postgres password=password")

def query(query, params=None):
  conn = get_database_connection()
  cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
  cur.execute(query, params)
  results = cur.fetchall()
  cur.close()
  conn.close()
  return results

def get_players(team: str, limit=12):
  return query("SELECT * FROM player WHERE team=%s ORDER BY RANDOM() LIMIT %s", (team,limit))

def get_teams():
  return query("SELECT DISTINCT(team) FROM player")

def simulate_match():
  teams = get_teams()
  if len(teams) == 0:
    return {}
  team1, team2 = list(map(lambda x: x['team'], random.sample(get_teams(), k=2)))

  team1_players = get_players(team1)
  team2_players = get_players(team2)
  if len(team1_players) == 0 or len(team2_players) == 0:
    return {}

  team1_rating = sum([player['rating'] for player in team1_players])
  team2_rating = sum([player['rating'] for player in team2_players])

  team1_rating_result = team1_rating + random.randint(-1000, 1000)
  team2_rating_result = team2_rating + random.randint(-1000, 1000)

  winner = team1 if team1_rating_result > team2_rating_result else team2
  loser = team1 if winner == team2 else team2
  loser_score = math.floor(random.triangular(0, 5, 0))
  winner_score = loser_score + math.floor(random.triangular(1, 5, 1))
  team1_score = winner_score if winner == team1 else loser_score
  team2_score = winner_score if winner == team2 else loser_score

  results = {
    "match_date_time": time.time(),
    "team1": {
      "name": team1,
      "players": team1_players,
    },
    "team2": {
      "name": team2,
      "players": team2_players,
    },
    "result": {
      "winner": winner,
      "loser": loser,
      "team1_score": team1_score,
      "team2_score": team2_score
    }
  }

  return results

last_match = None
next_match_time = None
def get_last_match():
  global last_match, next_match_time
  if last_match is None or time.time() > next_match_time:
    last_match = simulate_match()
    next_match_time = time.time() + random.randint(1, 15)
    return last_match
  else:
    return last_match
