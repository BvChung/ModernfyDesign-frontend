# ModernfyDesign Frontend

### [ModernfyDesign backend](https://github.com/BvChung/MordernfyDesign-backend)

## Overview

ModernfyDesign is a modern e-commerce furniture store with simulated transactions, creating orders, and CRUD functionality with products implemented with an admin page.

## Table of Contents

- [Tech](#tech)<br/>

## Tech

### Front-End

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)

## Development

### Running frontend

1. Install dependencies

```
npm i
```

2. Set up `.env`

```bash
# Respective port value to backend
REACT_APP_API_URL = http://localhost:

# Respective cloudinary account cloud name
REACT_APP_CLOUDINARY_CLOUD_NAME =

# Your image link to display on category and carousel on the landing page
REACT_APP_CAROUSEL_IMAGE_1 =
REACT_APP_CAROUSEL_IMAGE_2 =
REACT_APP_CAROUSEL_IMAGE_3 =
REACT_APP_CAROUSEL_IMAGE_4 =
REACT_APP_CAROUSEL_IMAGE_5 =
REACT_APP_CATEGORY_IMAGE_1 =
REACT_APP_CATEGORY_IMAGE_2 =
REACT_APP_CATEGORY_IMAGE_3 =
REACT_APP_CATEGORY_IMAGE_4 =
REACT_APP_CATEGORY_IMAGE_5 =
REACT_APP_CATEGORY_IMAGE_6 =

# Guest account and guest admin information
REACT_APP_GUEST_EMAIL =
REACT_APP_GUEST_PASSWORD =
REACT_APP_GUEST_ADMIN_EMAIL =
REACT_APP_GUEST_ADMIN_PASSWORD =
REACT_APP_GUEST_ADDRESS =
REACT_APP_GUEST_CITY=
REACT_APP_GUEST_STATE =
REACT_APP_GUEST_ZIPCODE =
REACT_APP_GUEST_PHONE =
REACT_APP_GUEST_CARDNUMBER =
REACT_APP_GUEST_CARDFIRSTNAME =
REACT_APP_GUEST_CARDLASTNAME =
REACT_APP_GUEST_ADMIN_CARDLASTNAME =
REACT_APP_GUEST_CARDEXPMONTH =
REACT_APP_GUEST_CARDEXPYEAR =
REACT_APP_GUEST_CARDCVV =

# Respective mongoDB admin account id
REACT_APP_GUEST_ADMIN_ACCOUNT_ID =
```

3. Starting frontend

```
npm run start
```
