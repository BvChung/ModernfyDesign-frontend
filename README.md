# ModernfyDesign Frontend

### [ModernfyDesign backend] (https://github.com/BvChung/MordernfyDesign-backend)

## Overview

## Table of Contents

- [Tech](#tech)<br/>
- [Demos](#demo-gifs)<br/>

## Tech

### Front-End

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Development

1. Install dependencies

```
npm i
```

2. Set up `.env`

```bash
# [development] for development
# Change to [production] for deployment to connect to react frontend
NODE_ENV = development

# Port number can be changed to any value
PORT = 3001

# Connect your mongoDB cluster using the url from your mongo account
MONGO_URI = mongoDB_cluster_connection

# Any value can be provided in order to generate JWTs
JWT_ACCESS_SECRET = value1

JWT_REFRESH_SECRET = value2

# Connect your Cloudinary account configs
CLOUDINARY_CLOUD_NAME = your_cloud_name

CLOUDINARY_API_KEY = your_cloud_key

CLOUDINARY_API_SECRET = your_cloud_secret

# Connection to the respective upload folders for image upload/deletion
CLOUDINARY_AVATAR_UPLOAD = folder1

CLOUDINARY_ICON_UPLOAD = folder2
```

3. Starting backend server with nodemon

```
npm run server
```

### Running frontend

1. Install dependencies

```
cd frontend
npm i
```

2. Set up `.env` **(.env will be in .gitignore)**

```bash
# PORT is your respective port value from the backend

# Url for Axios and Socket.IO connection to backend
REACT_APP_CHAT_API = http://localhost:PORT

# Create demo guest account information in mongoDB (these values can be changed)
REACT_APP_GUEST_EMAIL = guestaccount@gmail.com

REACT_APP_GUEST_PASSWORD = guestaccount
```

3. In frontend in [api/axios.js](https://github.com/BvChung/groupcord/blob/main/frontend/src/api/axios.js) uncomment the BASE_URL to make a connection with axios and your backend.

```bash
const BASE_URL = process.env.REACT_APP_CHAT_API

# In public and private axios
baseURL: BASE_URL
```

4. Starting frontend

```
npm run start
```
