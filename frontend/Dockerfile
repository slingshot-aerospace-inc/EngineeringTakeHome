FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

ADD . /workspace/engineeringtakehome/frontend
RUN sudo chown gitpod:gitpod -R /workspace/engineeringtakehome/frontend

RUN cd /workspace/engineeringtakehome/frontend && npm i
