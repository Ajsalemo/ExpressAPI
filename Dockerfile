FROM node:12-alpine 

WORKDIR /app
COPY package.json /app
RUN yarn install && \
    yarn global add pm2

COPY . /app
COPY sshd_config /etc/ssh/

# SSH enablement
# ----------------------------------------------------------------- #
# Use this to add SSH 
# Start and enable SSH
# Set the working directory to /etc/ssh and generate SSH keys 
WORKDIR /etc/ssh/
RUN apk add openssh \
     && echo "root:Docker!" | chpasswd \
     && chmod +x /app/init_container.sh \
     && ssh-keygen -A
# ----------------------------------------------------------------- #

EXPOSE 3000 2222
ENTRYPOINT [ "/app/init_container.sh" ]
