
# First API

## Random Conspiracy Theories API
Use the following endpoints to explore the theories:

- `/conspiracy-theories` - Get all conspiracy theories
- `/conspiracy-theories/names` - Get the titles of all conspiracy theories
- `/conspiracy-theories/theorie/:id` - Get a specific conspiracy theory by ID, nr. 1-10

## Brief Description of the Assignment
This project is a simple API that serves random conspiracy theories. The API provides endpoints to retrieve all theories, get the titles of all theories, and fetch a specific theory by its ID.

## Approach and Tools Used
- **Express.js**: Used to create the server and handle routing.
- **Mongoose**: Used to interact with MongoDB for storing and retrieving conspiracy theories.
- **MongoDB**: Used as the database to store the conspiracy theories.
- **CORS**: Used to handle Cross-Origin Resource Sharing.
- **Nodemon**: Used for automatic server restarts during development.
- **Babel**: Used to transpile modern JavaScript for compatibility.


## How to Run the Project Locally
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies and start the development server:
    ```bash
    npm i && npm run dev
    ```

3. Ensure MongoDB is running locally or update the `MONGO_URL` in the `.env` file to point to your MongoDB instance.

RESET_DATABASE=true npm run dev 