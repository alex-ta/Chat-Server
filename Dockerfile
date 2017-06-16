FROM mongo
RUN apt-get update && apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN mkdir app
ADD server app/server
ADD build app/build
ADD package.json app/package.json
ADD LICENSE app/LICENSE
RUN cd app && npm install
RUN echo "#!/bin/sh\n mongod &\ncd app \n npm run server" >> run.sh
CMD ["/bin/bash","run.sh"]
