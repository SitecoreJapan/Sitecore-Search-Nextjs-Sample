ARG PARENT_IMAGE

FROM ${PARENT_IMAGE} 

WORKDIR /usr/app
COPY . /usr/app

RUN cd /usr/app \ 
    && npm install \
    && npm run build

CMD ["npm","run","start"]