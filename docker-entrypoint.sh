#!/bin/sh

# Use PORT environment variable from Render, default to 80
PORT=${PORT:-80}

# Update nginx config to use the PORT
sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/nginx.conf

# Start nginx
nginx -g "daemon off;"
