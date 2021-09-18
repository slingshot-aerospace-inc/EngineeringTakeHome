from time import sleep
import requests
import psycopg2
import psycopg2.extras
import json
import datetime

def get_database_connection():
  return psycopg2.connect("dbname=postgres host=127.0.0.1 user=postgres password=password")

def store_match_results(date, team1, team2, team1_players, team2_players, team1_score, team2_score, winner):
  conn = get_database_connection()
  cur = conn.cursor()
  cur.execute("INSERT INTO match (date, team1, team2, team1score, team2score, winner) VALUES(%s, %s, %s, %s, %s, %s) RETURNING id",
    (date, team1, team2, team1_score, team2_score, winner))
  match_id = cur.fetchall()[0][0]
  for player in team1_players:
    cur.execute("INSERT INTO match_team1_players_player (match_id, player_id) VALUES(%s, %s)", (match_id, player))
  for player in team2_players:
    cur.execute("INSERT INTO match_team1_players_player (match_id, player_id) VALUES(%s, %s)", (match_id, player))
  conn.commit()
  cur.close()
  conn.close()

def match_exists(date, team1, team2):
  conn = get_database_connection()
  cur = conn.cursor()
  cur.execute("SELECT * FROM match WHERE date=%s AND team1=%s AND team2=%s", (date, team1, team2))
  res = cur.fetchall()
  cur.close()
  conn.close()
  return len(res) != 0


def main():
  try:
    while True:
      r = requests.get('http://localhost:8000/last_match_results')
      res = json.loads(r.text)
      date = datetime.datetime.fromtimestamp(res['match_date_time'])
      team1 = res['team1']['name']
      team2 = res['team2']['name']
      team1_players = [ player['id'] for player in res['team1']['players']]
      team2_players = [ player['id'] for player in res['team2']['players']]
      team1_score = res['result']['team1_score']
      team2_score = res['result']['team2_score']
      winner = res['result']['winner']
      print(f"Got result of match on {date} between {team1} ({team1_score}) and {team2} ({team2_score}) winner: {winner}")
      if not match_exists(date, team1, team2):
        print(f"Storing match result on {date} between {team1} and {team2}")
        store_match_results(date, team1, team2, team1_players, team2_players, team1_score, team2_score, winner)

      sleep(1)
  except KeyboardInterrupt:
    print("Quitting...")
