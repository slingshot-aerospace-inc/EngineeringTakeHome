FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

ADD . /workspace/slingshot-takehome/ingest
RUN sudo chown gitpod:gitpod -R /workspace/slingshot-takehome/ingest

RUN cd /workspace/slingshot-takehome/ingest && pipenv install
