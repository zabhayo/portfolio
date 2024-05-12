const express = require('express');
const app = express();
const port = 8080;
const methodOverride = require('method-override');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory
app.use(express.json()); // Parse JSON bodies
app.use(methodOverride('_method')); // Enable HTTP method overrides

// View engine setup
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views")); // Specify the directory for views

// Initial data for posts
let posts = [
    {
        id: uuidv4(),
        type: "blog",
        title: "Introduction to Express.js",
        author: "John Doe",
        caption: "Express.js is a minimalist web framework for Node.js..."
    },
    {
        id: uuidv4(),
        type: "blog",
        title: "Getting Started with React",
        author: "Alice Johnson",
        caption: "React is a JavaScript library for building user interfaces..."
    },
    {
        id: uuidv4(),
        type: "blog",
        title: "Node.js Best Practices",
        author: "Charlie Brown",
        caption: "Node.js is a powerful platform for building server-side applications..."
    },
    {
        id: uuidv4(),
        type: "blog",
        title: "Travel Diaries: Exploring Europe",
        author: "John Doe",
        caption: "Join me as I recount my adventures traveling through Europe..."
    },
    {
        id: uuidv4(),
        type: "blog",
        title: "Fitness Tips for Beginners",
        author: "Emma Johnson",
        caption: "Looking to start your fitness journey? Here are some tips to get you started..."
    },
];

// Route to render all posts
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

// Route to render form for creating new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Route to handle submission of new post
app.post("/posts", (req, res) => {
    let { title, author, caption } = req.body;
    posts.push({ id: uuidv4(), title, author, caption });
    res.redirect('/posts'); // Redirect to the posts page after submission
});

// Route to render a specific post
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => id === p.id);
    res.render('show.ejs', { post });
});

// Route to render form for editing a post
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => id === p.id);
    res.render('edit.ejs', { post });
});

// Route to handle updating a post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => id === p.id);
    let newContent = req.body.caption;
    post.caption = newContent;
    res.redirect('/posts'); // Redirect to the posts page after update
});

// Route to handle deleting a post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => id !== p.id);
    res.redirect('/posts'); // Redirect to the posts page after deletion
});

// Start the server
app.listen(port, () => {
    console.log(`Server Started: ${port}`);
});
