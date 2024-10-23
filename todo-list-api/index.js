const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const connectDB = require('./db'); 

require("dotenv").config();
const TodoTask = require("./models/ToDoTask");
//Execute express
const app = express();

//Middlewares
app.use(express.json({extended: true}));
app.use(cors());

// port
const port = 5000;

// Temporary in-memory data store (since there's no database for now)
let todoList = ["help", "ayaw"];

//connection to db
// mongoose.set("useFindAndModify", false);
// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     process.exit(1); // Exit the process with a non-zero status code
//   } else {
//     console.log('Connected to db');
//     app.listen(port, () => console.log('Server running'));
//   }
// });
const mongoURI = "mongodb://localhost:27018/to-do-list-db";
const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};

connectToMongo();

// mongoose.connect('mongodb://localhost:27018/', {
//   dbName: 'to-do-list-db',
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }, err => err ? console.log(err) : 
//   console.log('Connected to yourDB-name database'));




// Routes

// Get all todo tasks
// app.get("/todos", (req, res) => {
//   res.json(todoList);
// });
app.get("/todos", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection('ToDoTask');
    const todoTasks = await collection.find().toArray();
    console.log('Found documents:', todoTasks);
    res.json(todoTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch todo tasks" });
  }
});


// Add a new task
// app.post('/todos', (req, res) => {
//   const newTask = req.body.task;
//   todoList.push(newTask);
//   res.status(201).json(todoList);
// });
// Add a new task
app.post("/todos", async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection('ToDoTask');
    console.log(req);
    const newTask = {
      Todo: req.body.Todo,
    };
    console.log('req body', req.body.Todo)
    const result = await collection.insertOne(newTask);
    res.status(201).json({ _id: result.insertedId, Todo: newTask.Todo });
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo task" });
  }
});

// Edit a task by index
app.put("/todos/:index", (req, res) => {
  const index = req.params.index;
  const updatedTask = req.body.task;

  if (index >= 0 && index < todoList.length) {
    todoList[index] = updatedTask;
    res.json(todoList);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});
// app.put("/todos/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedTask = await TodoTask.findByIdAndUpdate(id, { content: req.body.task }, { new: true });
//     res.json(updatedTask);
//   } catch (error) {
//     res.status(404).json({ error: "Task not found" });
//   }
// });

// Delete a task by index
app.delete("/todos/:index", (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
    res.json(todoList);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     await TodoTask.findByIdAndRemove(id);
//     res.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(404).json({ error: "Task not found" });
//   }
// });
console.log("App listen at port 5000");
app.listen(port, () => console.log("Server is running on port", port));
