FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

ADD . /workspace/slingshot-takehome/frontend
RUN sudo chown gitpod:gitpod -R /workspace/slingshot-takehome/frontend

RUN cd /workspace/slingshot-takehome/frontend && npm i
