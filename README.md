# Gym Tracker Backend 🏋️‍♀️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The Gym Tracker Backend is a robust and scalable server-side application built with NestJS, designed to provide a comprehensive API for managing users, roles, exercises, workouts, and sets. It leverages modern technologies like TypeScript, Prisma, and Docker to ensure efficient development, deployment, and maintenance. The backend incorporates authentication and authorization mechanisms to secure API endpoints and manage user access.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [How to Use](#how-to-use)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## Features ✨

- **User Authentication**: Secure registration and login functionality using JWT.
- **Role-Based Authorization**: Control access to specific API endpoints based on user roles (e.g., admin, user).
- **CRUD Operations**: Comprehensive API endpoints for managing users, roles, exercises, workouts, and sets.
- **API Documentation**: Swagger integration for interactive API documentation and testing.
- **Database Management**: Utilizes Prisma for efficient database access and management.
- **Docker Support**: Containerization support for easy deployment and scalability.
- **Configuration Management**: Uses NestJS ConfigModule for managing environment-specific configurations.
- **Input Validation**: Employs `class-validator` and `class-transformer` for robust input validation.

## Tech Stack 💻

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Passport](http://www.passportjs.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)

## Installation 🛠️

1.  Clone the repository:
    ```bash
    git clone https://github.com/Bemasi/gym-tracker-backend.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd gym-tracker-backend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Set up the database: Ensure a Prisma-compatible database is configured and accessible.
5.  Configure environment variables: Create a `.env` file based on `.env-example` and set the necessary variables (e.g., `JWT_SECRET`, `PORT`).
6.  Run database migrations:
    ```bash
    npx prisma migrate dev
    ```
7.  Build the project:
    ```bash
    npm run build
    ```

## Usage 🚀

### Starting the Application

-   Start the application in development mode:
    ```bash
    npm run start:dev
    ```
-   Build the application for production:
    ```bash
    npm run build
    ```

### Running Database Migrations

```bash
npx prisma migrate dev
```

### API Documentation

Access the Swagger API documentation at the `/api` endpoint after starting the application.

### Example API Requests

- Register a new user:
    ```bash
    POST /auth/register
    ```

    ```json
    {
      "email": "testuser@example.com",
      "password": "securePassword123",
      "name": "Test User"
    }
    ```

- Login an existing user:
    ```bash
    POST /auth/login
    ```

    ```json
    {
      "email": "testuser@example.com",
      "password": "securePassword123"
    }
    ```

- Get current user info (requires JWT token):
    ```bash
    GET /auth/me
    ```

- Create a new exercise (requires JWT token):
    ```bash
    POST /exercises
    ```

    ```json
    {
      "name": "Bench Press",
      "muscleGroup": "Chest",
      "description": "A classic exercise for building chest strength."
    }
    ```

- List all exercises (requires JWT token):
    ```bash
    GET /exercises
    ```

- Create a new workout (requires JWT token):
    ```bash
    POST /workouts
    ```

    ```json
    {
      "date": "2024-01-01",
      "name": "Morning Workout",
      "notes": "Focus on compound exercises."
    }
    ```

- List all workouts for a user (requires JWT token):
    ```bash
    GET /workouts
    ```

## How to Use 🤔

The Gym Tracker Backend is designed to manage and track gym workouts and exercises. Here's how you can use it:

1.  **User Authentication**: New users can register via the `/auth/register` endpoint, providing their email, password, and name. Existing users can log in using the `/auth/login` endpoint to receive a JWT token for accessing protected routes.

2.  **User Roles and Authorization**: The backend uses role-based access control to manage user permissions. The `admin` role has access to manage users and roles, while regular users can manage their workouts and exercises.

3.  **Exercises Management**: Authenticated users can create, retrieve, update, and delete exercises using the `/exercises` endpoint. Each exercise can have a name, muscle group, and description.

4.  **Workouts Management**: Authenticated users can create, retrieve, update, and delete workouts using the `/workouts` endpoint. Workouts can have a date, name, and notes.

5.  **Sets Management**: Sets, representing individual exercise sets within a workout, can be managed using the `/sets` endpoint. This includes creating, updating, and deleting sets, as well as retrieving sets for a specific workout.

## Project Structure 📂

```
├── Dockerfile
├── README.md
├── eslint.config.mjs
├── Makefile
├── nest-cli.json
├── package.json
├── prisma
│   ├── migrations
│   │   └── 20250819191857_init
│   │       └── migration.sql
│   ├── migration_lock.toml
│   └── schema.prisma
├── seed.ts
├── src
│   ├── app.module.ts
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── jwt.strategy.ts
│   │   ├── roles.decorator.ts
│   │   └── roles.guard.ts
│   ├── exercises
│   │   ├── exercises.controller.ts
│   │   ├── exercises.module.ts
│   │   └── exercises.service.ts
│   ├── main.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── roles
│   │   ├── roles.controller.ts
│   │   ├── roles.module.ts
│   │   └── roles.service.ts
│   ├── sets
│   │   ├── sets.controller.ts
│   │   ├── sets.module.ts
│   │   └── sets.service.ts
│   ├── users
│   │   ├── dto
│   │   │   └── update-user.dto.ts
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.spec.ts
│   │   └── users.service.ts
│   └── workouts
│   │   ├── workouts.controller.ts
│   │   ├── workouts.module.ts
│   │   └── workouts.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
└── tsconfig.json
```

## API Reference 📚

### Authentication Endpoints

-   `POST /auth/register`: Registers a new user.
-   `POST /auth/login`: Logs in an existing user and returns a JWT token.
-   `GET /auth/me`: Returns the current user's information (requires a valid JWT token).

### Users Endpoints (Admin Only)

-   `GET /users`: Retrieves a list of all users.
-   `GET /users/:id`: Retrieves a specific user by ID.
-   `PATCH /users/:id`: Updates a specific user by ID.
-   `DELETE /users/:id`: Deletes a specific user by ID.

### Roles Endpoints (Admin Only)

-   `GET /roles`: Retrieves a list of all roles.
-   `POST /roles`: Creates a new role.
-   `DELETE /roles/:id`: Deletes a specific role by ID.

### Exercises Endpoints

-   `POST /exercises`: Creates a new exercise.
-   `GET /exercises`: Retrieves a list of all exercises.
-   `PATCH /exercises/:id`: Updates a specific exercise by ID.
-   `DELETE /exercises/:id`: Deletes a specific exercise by ID.

### Workouts Endpoints

-   `POST /workouts`: Creates a new workout.
-   `GET /workouts`: Retrieves a list of all workouts for the current user.
-   `GET /workouts/:id`: Retrieves a specific workout by ID for the current user.
-   `PATCH /workouts/:id`: Updates a specific workout by ID for the current user.
-   `DELETE /workouts/:id`: Deletes a specific workout by ID for the current user.

### Sets Endpoints

-   `GET /sets/:workout_id`: Retrieves all sets for a specific workout ID.
-   `POST /sets`: Creates a new set.
-   `PATCH /sets/:id`: Updates a specific set by ID.
-   `DELETE /sets/:id`: Deletes a specific set by ID.

## Contributing 🤝

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Bemasi/gym-tracker-backend/blob/main/LICENSE) file for details.

## Important Links 🔗

-   **Repository**: [Gym Tracker Backend](https://github.com/Bemasi/gym-tracker-backend)
-   **Author:** Benjamin Mato

## Footer 🏁

Gym Tracker Backend - [https://github.com/Bemasi/gym-tracker-backend](https://github.com/Bemasi/gym-tracker-backend) by Bemasi.

⭐️ Feel free to fork, like, star and create issues to contribute to the project. Let's build awesome software together! 🚀