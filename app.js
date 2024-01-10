const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Parse incoming requests with JSON and urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session
app.use(session({
    secret: '51234', // Change this to a random and secure value
    resave: false,
    saveUninitialized: true,
}));

// Serve static files (like stylesheets) from the 'public' directory
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static('public'));

// Dummy data for the to-do list
const getTasksForUser = (req) => {
    if (!req.session.tasks) {
        req.session.tasks = [];
    }
    return req.session.tasks;
};

// Render the index page with the user's to-do list
app.get('/', (req, res) => {
    const tasks = getTasksForUser(req);
    const crypto = require('crypto');
    const secretKey = crypto.randomBytes(32).toString('hex');
    console.log(secretKey);

    res.render('index', { tasks });
});

// Handle the form submission to add a new task
app.post('/addTask', (req, res) => {
    const newTask = req.body.task;
    const tasks = getTasksForUser(req);
    tasks.push(newTask);
    res.redirect('/');
});

// Handle the form submission to remove a task
app.post('/removeTask', (req, res) => {
    const taskIndex = req.body.index;
    const tasks = getTasksForUser(req);

    // Ensure the index is within bounds
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1); // Remove the task at the specified index
    }

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});