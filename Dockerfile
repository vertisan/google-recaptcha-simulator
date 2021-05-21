ARG FROM_IMAGE=14-slim

### Build & serve
FROM node:${FROM_IMAGE}

COPY docker/etc /etc/

ENV DIR /var/www
WORKDIR $DIR

# For Docker build cache
COPY ./app/package*.json ./app/yarn.* $DIR/
RUN yarn install --check-files

COPY ./app $DIR

COPY docker/docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "start"]
EXPOSE 80
