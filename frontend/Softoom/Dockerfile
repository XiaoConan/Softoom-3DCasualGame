# Build the Angular App
# basically, this compiles the Angular project to static HTML and js files.
FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve these static files with NGINX.
FROM nginx:1.21.6-alpine
COPY --from=build /app/dist/softoom /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
