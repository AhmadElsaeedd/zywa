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