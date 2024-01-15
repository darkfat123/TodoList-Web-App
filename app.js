process.env.TZ = 'Asia/Bangkok';

const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path')
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const port = 3001;

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Parse incoming requests with JSON and urlencoded payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Generate a secure secret key for sessions
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);

// Configure session
app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    },
}));

// Serve static files (like stylesheets) from the 'views' and 'bootstrap' directory
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/views'));



// Dummy data for the to-do list
const getTasksForUser = (req) => {
    if (!req.session.tasks) {
        req.session.tasks = [];
    }
    return req.session.tasks;
};

// Render the index page with the user's to-do list
app.get('/', (req, res) => {

    // The code following comments is for a sample test.
    /*const tasks1 = [
        { timestamp: '2024-01-10T12:00:00', time: '10:00 AM', task: 'Do homework', completed: false },
        { timestamp: '2024-01-10T15:30:00', time: '01:30 PM', task: 'Go to shopping', completed: false },
        { timestamp: '2024-01-11T08:45:00', time: '08:45 AM', task: 'Play some game', completed: false },
        { timestamp: '2024-01-12T10:35:00', time: '10:35 AM', task: 'Play with dogs', completed: false },
        { timestamp: '2024-01-12T13:50:00', time: '', task: 'Learning Code', completed: false },
        { timestamp: '2024-01-13T09:12:00', time: '', task: 'Go to school', completed: false },
    ];
    // Update tasks to replace empty or undefined time with "Time not specified"
    const tasks = tasks1.map(task => ({
        ...task,
        time: task.time.trim() !== '' ? task.time : 'Time not specified'
    }));*/

    const tasks = getTasksForUser(req);
    res.render('index', { tasks });
});

// Handle the form submission to add a new task
app.post('/addTask', (req, res) => {
    console.log("Add Task");
    const newTask = req.body.task;
    let newTaskTime = req.body.taskTime;
    console.log(newTaskTime);
    if (!newTaskTime.trim()) {
        newTaskTime = "Time not specified";
    }
    console.log("Add", req.body.task, "At", newTaskTime);
    const tasks = getTasksForUser(req);
    tasks.push({ task: newTask, time: newTaskTime, timestamp: new Date().toISOString() });

    res.redirect('/');
});



// Handle the form submission to remove a task
app.post('/removeTask', (req, res) => {
    console.log("Remove Task")
    const taskIndex = req.body.index;
    const tasks = getTasksForUser(req);

    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
    }

    res.redirect('/');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
});
