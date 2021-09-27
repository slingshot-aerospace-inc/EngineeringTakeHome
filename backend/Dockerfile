FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

ADD . /workspace/slingshot-takehome/backend
RUN sudo chown gitpod:gitpod -R /workspace/slingshot-takehome/backend

RUN cd /workspace/slingshot-takehome/backend && npm i
