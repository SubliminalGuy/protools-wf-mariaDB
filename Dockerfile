# Alpine image with node.js
FROM nginx:latest
# Copy your custom Nginx configuration file to the container
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]