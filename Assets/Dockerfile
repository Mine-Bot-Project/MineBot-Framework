FROM node:18

RUN apt update && apt upgrade -y

WORKDIR /home/workspace
COPY package.json /home/workspace
RUN npm install

COPY . /home/workspace

CMD [ "node", "index.js" ]

# docker build -t minebot:v0.1 .
# Build the docker image after creating a index file in the root directory of the repo.
# Suggested to finish testing before building a docker image.
