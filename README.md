# Stellar Burgers — React & TypeScript SPA

A single-page burger ordering application built with React and TypeScript.

The application includes product selection, drag-and-drop burger construction, user authentication, protected routes, order management, and API integration.

> **Project type:** Educational / portfolio project
> **Focus:** React, TypeScript, Redux, API integration

## Key Features

* Burger constructor with drag-and-drop
* Product and ingredient catalog
* Shopping/order flow
* User registration and authentication
* Protected routes
* User profile
* Order history
* Dynamic routing
* API integration
* Global state management with Redux
* Responsive user interface

## Tech Stack

* **React**
* **TypeScript**
* **Redux Toolkit**
* **React Router**
* **React DnD**
* **REST API**
* **Webpack**
* **HTML / CSS**
* **ESLint**
* **Prettier**

## Application Architecture

The application follows a component-based architecture with separate responsibilities for:

* pages
* reusable UI components
* application state
* API requests
* routing
* authentication
* utility functions
* TypeScript types

Example structure:

```text
src/
├── components/
├── pages/
├── services/
├── utils/
├── hooks/
├── types/
├── app.tsx
└── index.tsx
```

## Authentication

The application supports:

* user registration
* login/logout
* protected routes
* authenticated API requests
* user profile management
* personal order history

Unauthenticated users cannot access protected user functionality.

## Routing

The application uses client-side routing with React Router.

The routing structure includes public and protected pages as well as dynamic routes for individual ingredients and orders.

This allows the application to behave as a full SPA without requiring a page reload during navigation.

## Burger Constructor

One of the main features is an interactive burger constructor.

Users can:

1. Select ingredients
2. Add them to the constructor
3. Reorder ingredients using drag-and-drop
4. Review the final burger
5. Submit an order

The application keeps the constructor state synchronized with the global Redux store.

## API Integration

The frontend communicates with a REST API to:

* retrieve ingredients
* authenticate users
* create orders
* retrieve user information
* retrieve order data
* update user information

Asynchronous operations are handled through the application state layer.

## State Management

Redux Toolkit is used for global application state.

The store manages data such as:

* available ingredients
* current burger constructor
* user authentication state
* orders
* loading states
* API responses

This keeps shared application state predictable and easier to maintain.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dasmindme/stellar-burgers.git
cd stellar-burgers
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example` and provide the required API configuration.

### 4. Start the development server

```bash
npm start
```

## Code Quality

The project uses:

* ESLint
* Prettier
* TypeScript

These tools help maintain consistent formatting, catch common errors, and keep the codebase easier to maintain.

## What This Project Demonstrates

This project demonstrates practical experience with:

* React development
* TypeScript
* Redux Toolkit
* client-side routing
* authentication
* protected routes
* REST API integration
* asynchronous application logic
* drag-and-drop interfaces
* reusable components
* SPA architecture
* frontend tooling and code quality

## About

This project is part of my frontend/full-stack development portfolio and demonstrates my ability to build interactive React applications with TypeScript, global state management, authentication, routing, and API integration.
