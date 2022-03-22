# BUILD
FROM node:16-alpine as builder

COPY ./mywatchlist-frontend /frontend

WORKDIR /frontend

RUN npm install
RUN npm install react-scripts 
RUN npm run build --prod --nomaps

# RUN
FROM caddy:latest

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /frontend/build /srv
