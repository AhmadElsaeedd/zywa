# Card Status API

## Introduction

This section of the README provides instructions on how to run the Card Status API using Docker. Docker encapsulates the environment and dependencies, ensuring that the application runs consistently across different machines.

## Prerequisites

Before proceeding, ensure that Docker is installed on your system. If you do not have Docker installed, please follow the instructions on the [official Docker website](https://docs.docker.com/get-docker/).

## Running the Application with Docker

### Building the Docker Image

To build the Docker image for the Card Status API, open a terminal, navigate to the root directory of the project (where the `Dockerfile` is located), and run the following command:

`docker build -t card-status-api .`

This command creates a Docker image named `card-status-api` based on the Dockerfile in the current directory.

### Running the Docker Container

After the image has been built, you can run the application in a Docker container. To ensure that the SQLite database persists across container restarts, mount a volume that points to the `data` directory on your host machine.

Execute the following command to start the container with the mounted volume:

`docker run -p 3000:3000 -v "$(pwd)/data:/usr/src/app/data" --name card-status-api card-status-api`


Here's what each part of the command does:

- `-p 3000:3000` maps port 3000 of the container to port 3000 on your host machine, allowing you to access the application via `localhost:3000`.
- `-v "$(pwd)/data:/usr/src/app/data"` mounts a volume from the `data` directory in your current working directory to `/usr/src/app/data` inside the container, ensuring that your database file is persistent.
- `--name card-status-api` gives your container a recognizable name.
- `card-status-api` at the end specifies which image to use to create the container.

### Accessing the Application

With the container running, the API is accessible at `http://localhost:3000`. You can now use the `/get_card_status` endpoint to query the status of a card by providing a `userMobile` or `cardId` as a query parameter.

### Stopping the Container

If you need to stop the running container, you can do so with the following command:

`docker stop card-status-api`

This command stops the container named `card-status-api`.


### Starting the Container Again

To start the container again after stopping it, use:

`docker start card-status-api`


This will resume the application without losing any data thanks to the mounted volume.

By following these instructions, you can deploy and run the Card Status API in a Docker container, ensuring a consistent and isolated environment for the application.

# Card Status API

## Introduction

This document provides an overview of the Card Status API, which is designed to assist support agents and internal tracking by providing the status of a user's card based on their phone number or card ID. The API is built using Node.js and Express for the server, with an SQLite database to store and retrieve card status information.

## Approach

The primary goal was to create a simple and efficient API that could reliably serve the latest status information for a given card. The approach was to build a RESTful API that could handle requests with two possible query parameters: `userMobile` and `cardId`.

### Why Node.js and Express?

Node.js was chosen for its non-blocking I/O model, which is well-suited for handling I/O-bound tasks such as serving web requests. Express, a minimal and flexible Node.js web application framework, was used to simplify the creation of the API endpoints. It provides a robust set of features to develop web and mobile applications efficiently.

### Why SQLite?

SQLite was selected for its simplicity and ease of setup. As a lightweight, file-based database, it eliminates the need for a separate database server, making it ideal for development and testing. It also provides sufficient performance for small to medium-sized applications.

### Database Schema

The database schema consists of two main tables: `Cards` and `Status`. The `Cards` table stores unique card information and user contact details, while the `Status` table records each status update for the cards, including timestamps and comments.

### Data Importing

A script was created to import data from CSV files into the SQLite database. This script uses the `csv-parser` package to parse CSV data and the `moment` library to standardize timestamps into a consistent ISO 8601 format.

### Endpoint Design

The `/get_card_status` endpoint was designed to query the database and return the latest status for a card. It supports searching by either a user's mobile number or a card ID. The endpoint cleans the input to ensure data consistency and prevent SQL injection attacks.

## Possible Improvements

- **Data Validation**: Implementing additional input validation on the server side would enhance security and data integrity.
- **Authentication**: Adding an authentication layer would ensure that only authorized users can access the API.
- **Caching**: Implementing caching for frequently requested data could improve response times and reduce database load.
- **Logging**: Integrating a logging framework would help track and monitor API usage and errors.
- **Testing**: Expanding the test suite to cover more edge cases and performance testing would ensure the API's reliability.

## Architectural Decisions

- **Modular Design**: The project is structured with modularity in mind, separating the database setup, data importing, and web server code into different modules for better maintainability.
- **Error Handling**: The API is designed to provide clear error messages for various failure scenarios, aiding in debugging and user feedback.
- **Timestamp Standardization**: All timestamps are converted to a standard format before being stored in the database, ensuring consistency and simplifying queries.

## Conclusion

The Card Status API is a straightforward solution designed to meet the requirements of providing card status information efficiently. The chosen technologies and architectural decisions reflect a balance between simplicity, performance, and maintainability.