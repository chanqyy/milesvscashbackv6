// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");


// Load environment variables from .env file
require("dotenv").config();

// Connect to MongoDB database using the URI from the .env file via mongoose. It provides a structured way to interact with MongoDB and simplifies tasks like connection management, schema definition, and event handling.
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

// Create an Express app. Express provides a simple and effective routing mechanism. You can define routes based on HTTP methods (GET, POST, etc.) and URL patterns.
const app = express();

// Configure middleware for handling JSON and form data
app.use(bodyParser.json()); //Parse JSON requests
app.use(express.static('public')); //This serves static files like HTML, CSS, JS from a directory named "public" to the client-side of a web app, so static files can be accessed by users' web browsers 
app.use(bodyParser.urlencoded({
    extended: true
})); // Parse URL-encoded form data

// Set up EJS for views in the 'views' folder
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Handle GET requests to the root path
app.get('/', function (req, res) {
    // Count documents in the 'details' collection in MongoDB
    db.collection('details').countDocuments({}, function (err, count) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Log the count and render the 'register' view with the count
        console.log(`Count: ${count}`);
        res.render('register', { count });
    });
});

// Handle POST requests to the '/sign_up' path
app.post('/sign_up', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;

    // Create a data object with name and email
    var data = {
        "name": name,
        "email": email,
    }

    // Insert data into the 'details' collection in MongoDB
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");
    });

    // Redirect to 'signup_success.html'
    return res.redirect('signup_success.html');
});

// Handle GET requests to the root path 
app.get('/', function (req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(process.env.PORT ||8080);

console.log("server listening at port 8080");

// Handle GET requests to the root path 
app.get('/', function (req, res) {
    // Count documents in the 'details' collection in MongoDB
    db.collection('details').countDocuments({}, function (err, count) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Log the count and render the 'register' view with the count
        console.log(`Count: ${count}`);
        res.render('register', { count });
    });
});

// Handle GET requests to the '/register' path
app.get('/register', function (req, res) {
    // Count documents in the 'details' collection in MongoDB
    db.collection('details').countDocuments({}, function (err, count) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render the 'register' view with the count
        res.render('register', { count });
    });
});
