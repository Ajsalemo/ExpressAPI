#!/bin/sh

# Execute SSH
echo "Starting SSH.."
/usr/sbin/sshd

# Start the application with PM2
pm2 start /app/ecosystem.config.js --no-daemon