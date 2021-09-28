from watchgod import run_process


def main():
  from .main import main
  main()

run_process('.', main, args=())
