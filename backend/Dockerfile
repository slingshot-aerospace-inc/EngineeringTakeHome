FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

ADD . /workspace/engineeringtakehome/backend
RUN sudo chown gitpod:gitpod -R /workspace/engineeringtakehome/backend

RUN cd /workspace/engineeringtakehome/backend && npm i
