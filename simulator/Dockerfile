FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

ADD . /workspace/engineeringtakehome/simulator
RUN sudo chown gitpod:gitpod -R /workspace/engineeringtakehome/simulator

RUN cd /workspace/engineeringtakehome/simulator && pipenv install
