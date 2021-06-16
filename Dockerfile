FROM node:lts-alpine
WORKDIR /usr/src/app
COPY . ./
RUN npm install
RUN ls -l
CMD ["npm", "run", "build"]
CMD ["npm", "run", "prod"]