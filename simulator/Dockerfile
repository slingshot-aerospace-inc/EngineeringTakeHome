FROM gitpod/workspace-full

RUN sudo apt-get update  && sudo apt-get install -y postgresql-client

ADD . /workspace/slingshot-takehome/simulator
RUN sudo chown gitpod:gitpod -R /workspace/slingshot-takehome/simulator

RUN cd /workspace/slingshot-takehome/simulator && pipenv install
