# Restaurant Management System

A web-based Restaurant Management System designed to manage restaurant orders, user authentication, menu items, and customer orders.

## Features

- User Registration and Login
- Authentication and Authorization
- Restaurant Menu
- Order Management
- View Customer Orders
- SQLite Database
- REST API Backend
- Simple and User-Friendly Interface

## Technologies Used

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST API

### Database

- SQLite
- Turso / libSQL for production deployment

### Development Tools

- Visual Studio Code
- Git
- GitHub

## Project Structure

```text
Restaurant Management/
│
├── Artisan_tables/
│   └── screen.png
│
├── api/
│   └── index.js
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── orderController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── login/
│   └── code.html
│
├── menu/
│   └── code.html
│
├── register/
│   └── code.html
│
├── your_orders/
│   └── code.html
│
├── .gitignore
├── vercel.json
└── README.md

Installation
1. Clone the repository
git clone https://github.com/NINGANNA-45/Restaurant-Management.git

2. Open the project
cd Restaurant-Management

3. Install backend dependencies
cd backend
npm install

4. Start the backend server
node server.js

The backend will run on:
http://localhost:5000

Database
The application uses SQLite for local development.
For production deployment on Vercel, the application can use a Turso/libSQL database through the following environment variables:
TURSO_DATABASE_URL
TURSO_AUTH_TOKEN

The database connection is configured in:
backend/database.js

Authentication
The application includes user authentication and protected routes.
Authentication-related files:
backend/controllers/authController.js
backend/routes/authRoutes.js
backend/middleware/auth.js

API Routes
Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

Orders
POST /api/orders
GET /api/orders

Deployment
The project is configured for deployment on Vercel.
The Vercel API entry point is:
api/index.js

The deployment configuration is:
vercel.json

Production environment variables should be configured in the Vercel project settings.
Future Improvements
- Online payment integration
- Admin dashboard
- Restaurant table reservation
- Order status tracking
- Improved responsive design
- Food search and filtering
Author
Ninganna Pundalik Shirashyad
B.Tech Computer Science Engineering Student