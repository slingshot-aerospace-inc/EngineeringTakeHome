FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

STOPSIGNAL SIGINT

ADD . /workspace/engineeringtakehome/ingest
RUN sudo chown gitpod:gitpod -R /workspace/engineeringtakehome/ingest

RUN eval "$(pyenv init -)" && cd /workspace/engineeringtakehome/ingest && pipenv install
