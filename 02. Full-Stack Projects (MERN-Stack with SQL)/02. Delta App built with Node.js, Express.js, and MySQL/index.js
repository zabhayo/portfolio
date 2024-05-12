// Required packages
const mysql = require('mysql2'); // MySQL client
const express = require("express"); // Express framework
const app = express(); // Create an Express application
const port = 8080; // Port to listen on
const path = require("path"); // Path module for file paths
const methodOverride = require('method-override'); // Middleware for HTTP method overriding
const { v4: uuidv4 } = require('uuid'); // UUID generation
const { log } = require('console'); // Console logging
const { faker } = require('@faker-js/faker'); // Faker library for generating fake data

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(methodOverride('_method')); // Enable HTTP method overrides

// View engine setup
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views")); // Specify the directory for views

// Create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "*********"
});

// Home route to display user count
app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;

  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", {count});
    });
  } catch (err) {
    console.log(err);
    res.send("DATABASE ERROR");
  }
});

// Route to display all users
app.get("/users", (req, res) => {
  let q = `SELECT * FROM user;`;

  try {
    connection.query(q, (err, users) => {
      if(err) throw err;
      res.render("users.ejs", {users});
    });
  } catch (err) {
    console.log(err);
    res.send("DATABASE ERROR");
  }
});

// Route to render add user form
app.get("/users/add", (req,res) => {
  res.render("add_user.ejs")
});

// Route to handle adding a new user
app.post("/users", (req, res) => {
  let id = uuidv4();
  let {username, email, password, re_enter_password} = req.body;

  try {
    if (password !== re_enter_password) {
      res.send("Password not Matched.");
      return; // Return to exit the function
    }

    let query = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
    connection.query(query, [id, username, email, password], (err, result) => {
      if(err) throw err;
      console.log(result);
      res.redirect("/");
    });
  } catch (err) {
    res.send("DATABASE ERROR");
  }  
});

// Route to add a random user
app.post("/users/add-random", (req, res) => {
  let getRandomUser = ()=> {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
  };

  let data = [];
  data.push(getRandomUser());

  try {
    let q = "INSERT INTO user (id, username, email, password) VALUES ?";

    connection.query(q, [data], (err, result) => {
      if(err) throw err;
      res.redirect("/users");
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to render edit user form
app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id= ?`;

  try {
    connection.query(q, [id], (err, result) => {
      if(err) throw err;
      let user = result[0];
      res.render("edit.ejs", {user});
      console.log("password: " + user.password) // Logging the password
    });
  } catch (err) {
    res.send("DATABASE ERROR");
  }
});

// Route to update user information
app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let { username: newUsername, password: user_Password } = req.body;
  
  try {
    let q = `SELECT * FROM user WHERE id=?`;

    connection.query(q, [id], (err, user) => {
      if(user[0].password !== user_Password) {
        return res.send("Invalid password");
      }

      let update_query = `UPDATE user SET username = ? WHERE id= ?`;
      connection.query(update_query, [newUsername, id], (err) => {
        if(err) throw err;
        res.redirect("/users");
      });
    });
  } catch (err) {
    console.log(err);
    res.send("DATABASE ERROR");
  }
});

// Route to delete a user
app.delete("/users/:id", (req, res) => {
  let {id} = req.params;
  let query = `DELETE FROM user WHERE id=?`;

  try {
    connection.query(query, [id], (err) => {
      if(err) throw err;
      res.redirect("/users")
    });
  } catch (err) {
    res.send("DATABASE ERROR");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`App is Listening to ${port}`);
});
