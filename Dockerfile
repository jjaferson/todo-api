FROM node:8

# Create app directory
WORKDIR /server

# Install typescript and nodemon
RUN yarn global add typescript nodemon

CMD ["yarn", "install"]




