
# movie-ticket-server

The Movie Ticket Server is a Node.js application built with Express and Sequelize. It serves as a backend server for managing movie tickets and related information. The application utilizes a PostgreSQL database for storing data.


## Features

- User Module: Allows authentication of users.
- Movie Module: Manages movie details.
- Show Module: Handles show timings and related information.
- Ticket Module: Facilitates the booking and management of movie tickets.

Additionally, the server offers endpoints to analyze the performance of movies within a specified time period. This feature enables users to evaluate the success of a movie based on its performance during a specific duration.

## Prerequisites

Make sure you have the following software installed on your system:

- Node.js (version 16 or above)
- npm (Node Package Manager)
- PostgreSQL database (version 14)

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/movie-ticket-server; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Available Routes

- `POST /v1/login`: Authenticate and generate a JWT token. (No authentication required)
- `GET /v1/movie/list`: Get a list of all movies. (Authentication required) (Accessible by Admin and user both)
- `POST /v1/movie/create`: Create a new movie. (Authentication required) (Accessible by Admin only)
- `GET /v1/show/list/:movieId`: Get a list of all the show for the particular movie. (Authentication required.) (Accessible by Admin and user both)
- `POST /v1/ticket/create`: Create a ticket for the movie for a particular show. (Authentication required) (Accessible by user only)
- `GET /v1/ticket/analytics`: Get analytics for a movie. Accepts query params for type of statistics. (Authentication required) (Accessible only for Admin)
- `GET /v1/ticket/view/:id`: Get a specific ticket for the movie belonging to that user only. (Authentication required) (Accessible only for user.)
- `DELETE /v1/ticket/delete/:id`: Delete a ticket before the show starts. (Authentication required) (Accessible only for user)

## Configuration

The server can be configured by modifying the following files:

- `.env`: Add all the environment variables here.
- `config/index.js`: The file through which the entire server can access the env variables.

## Project Structure

The project follows a standard structure for organizing the codebase:

- `src/index.js`: Entry point of the application.
- `config/`: Configuration files.
- `modules/`: Consists of all the modules available in the system.
- `modules/index.js`: Route definitions.
- `modules/controller`: Request handlers for each route.
- `modules/service`: Service functions available for that particular module.
- `models/`: Sequelize models for interacting with the database.
- `migrations/`: Database migration files.
- `utils/`: Utility functions.

## License

This project is licensed under the [MIT License](LICENSE).