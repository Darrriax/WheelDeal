FROM node:lts-alpine as build
WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN npm i
RUN npm run build

# Stage 2: Serve the application with a lightweight web server
FROM nginx:stable-alpine

# Copy the built files to the Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Replace the default Nginx configuration with your custom configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for the Nginx server
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]