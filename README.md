#  Restaurant Management System

A web-based Restaurant Management System designed to manage restaurant orders, user authentication, menu items, and customer orders.

##  Features

*  User Registration and Login
*  Authentication and Authorization
*  Restaurant Menu
*  Order Management
*  View Customer Orders
*  SQLite Database
*  REST API Backend
*  Simple and User-Friendly Interface

##  Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Database

* SQLite

### Development Tools

* Visual Studio Code
* Git
* GitHub

##  Project Structure

```text
Restaurant Management/
│
├── Artisan_tables/
│   └── screen.png
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
│   ├── code.html
│   └── screen.png
│
├── menu/
│   ├── code.html
│   └── screen.png
│
├── register/
│   └── code.html
│
├── your_orders/
│   ├── code.html
│   └── screen.png
│
├── .gitignore
└── README.md
```

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/NINGANNA-45/Restaurant-Management.git
```

### 2. Open the project

```bash
cd Restaurant-Management
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Start the backend server

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

## Database

This project uses **SQLite** for storing application data.

The database connection is configured in:

```text
backend/database.js
```

##  Authentication

The application includes user authentication and protected routes.

Authentication-related files:

```text
backend/controllers/authController.js
backend/routes/authRoutes.js
backend/middleware/auth.js
```

##  Future Improvements

* Online payment integration
* Admin dashboard
* Restaurant table reservation
* Order status tracking
* Improved responsive design
* Food search and filtering
* Deployment to a cloud platform

##  Author

**Ninganna Pundalik Shirashyad**

B.Tech Computer Science Engineering Student


If you find this project useful, consider giving the repository a ⭐ on GitHub.
