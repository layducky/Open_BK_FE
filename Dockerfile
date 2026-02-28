FROM node:18-bullseye

WORKDIR /usr/src/app

# Build-time args - NEXT_PUBLIC_API_URL needed for client bundle
# Google secrets (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET) passed at runtime via -e
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
