FROM postgres:12.0-alpine
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=aniles
COPY ./db/init /docker-entrypoint-initdb.d
EXPOSE 5432