# Fullstack Application Setup

This project contains two main parts: a NestJS backend and a Vite-powered React frontend. Both applications must be configured and run separately.

## Table of Contents

- [Fullstack Application Setup](#fullstack-application-setup)
  - [Table of Contents](#table-of-contents)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Configuration](#environment-configuration)
  - [Scripts](#scripts)
    - [Backend Scripts](#backend-scripts)
    - [Frontend Scripts](#frontend-scripts)
  - [Development](#development)

## Backend Setup

The backend is a NestJS application. Follow these steps to get it up and running:

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables by copying `.env.sample` to `.env`:

   ```bash
   cp .env.sample .env
   ```

4. Ensure all necessary environment variables are correctly set in the `.env` file.

5. Start the backend server:

   ```bash
   npm run start:dev
   ```

The backend will be available at `http://localhost:<PORT>` where `<PORT>` is specified in the `.env` file.

## Frontend Setup

The frontend is a Vite React application. Follow these steps to run it:

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables by copying `.env.sample` to `.env`:

   ```bash
   cp .env.sample .env
   ```

4. Ensure the environment variables are correctly set in the `.env` file, including the backend API URL.

5. Start the frontend development server:

   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## Environment Configuration

The project uses environment variables for configuration. Both the backend and frontend have `.env.sample` files that serve as a template for setting up your own `.env` file.

- **Backend**:

  - Copy the `.env.sample` file in the `backend` directory and rename it to `.env`.
  - Update any environment-specific values, such as the database connection string, JWT secret, etc.

- **Frontend**:
  - Copy the `.env.sample` file in the `frontend` directory and rename it to `.env`.
  - Update the values, particularly the backend API URL (`VITE_API_URL`).

## Scripts

### Backend Scripts

- **Start the backend server (development mode)**:

  ```bash
  npm run start:dev
  ```

- **Build the backend app**:

  ```bash
  npm run build
  ```

### Frontend Scripts

- **Start the frontend development server**:

  ```bash
  npm run dev
  ```

- **Build the frontend app**:

  ```bash
  npm run build
  ```

## Development

To start both the backend and frontend in development mode:

1. Open two terminal windows.
2. In one terminal, navigate to the `backend` folder and run the backend server:

   ```bash
   cd backend
   npm run start:dev
   ```

3. In the other terminal, navigate to the `frontend` folder and run the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

Now both the backend and frontend will be running, and you can access the frontend at `http://localhost:5173`.

