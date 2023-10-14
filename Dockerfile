FROM node:20

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
#COPY .env ./

RUN npm ci 
COPY . .

RUN npx prisma generate
# RUN npx prisma migrate deploy
# RUN npx prisma db seed

ENTRYPOINT ["node", "app.js"]
