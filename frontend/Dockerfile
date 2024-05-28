# Stage 1: Build
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
