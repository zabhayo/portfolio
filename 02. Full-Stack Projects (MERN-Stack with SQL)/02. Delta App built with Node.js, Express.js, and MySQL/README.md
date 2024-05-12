# Delta App

Delta App is a simple web application built with Node.js, Express.js, and MySQL. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a user database.

## Features

- **User Management**: Add, view, edit, and delete users.
- **Password Matching**: Ensure that passwords match before adding a new user.
- **Random User Generation**: Generate random user data using the Faker library.
- **Middleware**: Utilize middleware for parsing request bodies and overriding HTTP methods.
- **Error Handling**: Implement basic error handling for database operations.
- **View Engine**: Render dynamic HTML views using the EJS template engine.

## Requirements

- Node.js installed on your machine
- MySQL database server running locally
- npm or yarn package manager

## Installation

1. Clone the repository:
   -git clone https://github.com/yourusername/delta-app.git

2. Navigate to the project directory:
    -cd delta-app

3. Install dependencies:
   -npm install

4. Set up the MySQL database:
   - Create a database named `delta_app`.
   - Import the `schema.sql` file located in the `database` directory to create the necessary table structure.

5. Start the server:
   -npm start

6. Open your web browser and navigate to `http://localhost:8080` to access the Delta App.

## Usage

- Access the homepage to view the total number of users.
- Navigate to `/users` to view a list of all users.
- Use the "Add User" form to add a new user. Ensure that the passwords match before submission.
- Click on the "Generate Random User" button to add a randomly generated user.
- Click on a user's "Edit" button to update their information.
- Use the "Delete" button to remove a user from the database.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.