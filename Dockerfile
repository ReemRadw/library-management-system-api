FROM node:18.12.1 as base

WORKDIR /app

# RUN npm -v

COPY package.json ./

COPY prisma ./prisma

COPY . .

RUN yarn install --frozen-lockfile

CMD ["yarn" , "start:docker"]

