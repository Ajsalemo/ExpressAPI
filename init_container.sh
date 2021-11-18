#!/bin/sh

# Get env vars in the Dockerfile to show up in the SSH session
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)
# Execute SSH
echo "Starting SSH.."
/usr/sbin/sshd

# Start the application with PM2
pm2 start /app/ecosystem.config.js --no-daemon
