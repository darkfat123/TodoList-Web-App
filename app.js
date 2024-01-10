const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Parse incoming requests with JSON and urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like stylesheets) from the 'public' directory
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static('public'));
app.use(express.static('public'));

// Dummy data for the to-do list
const tasks = [];

// Render the index page with the to-do list
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Handle the form submission to add a new task
app.post('/addTask', (req, res) => {
    const newTask = req.body.task;
    tasks.push(newTask);
    res.redirect('/');
});

app.post('/removeTask', (req, res) => {
    const taskIndex = req.body.index;
    
    // Ensure the index is within bounds
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1); // Remove the task at the specified index
    }

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
