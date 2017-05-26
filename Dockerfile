FROM mongo
RUN apt-get update && apt-get install npm -y && apt-get install nodejs -y
RUN mkdir app
ADD src app/src
ADD dist app/dist
ADD test app/test
ADD package.json app/package.json
ADD LICENSE app/LICENSE
ADD app.js app/app.js
RUN cd app
RUN npm install
CMD "/bin/bash"
