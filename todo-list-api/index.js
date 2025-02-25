require("dotenv").config();
// import {Schema} from 'mongoose';
const mongoURI = process.env.DB_CONNECT;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



// import model
const ToDoTask = require("./models/ToDoTask");

//Execute express
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

// port
const port = 5000;

// let todoList = ["help", "ayaw"];

// const mongoURI = "mongodb://localhost:27018/to-do-list-db";


const connectToMongo = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
    setTimeout(connectToMongo, 5000); // Retry after 5 seconds
  } catch (error) {
    console.log(error);
  }
};

connectToMongo();

app.get("/todos", async (req, res) => {
  try {
    // const db = mongoose.connection.db;
    // const collection = db.collection('ToDoTask');
    const todoTasks = await ToDoTask.find();
    // console.log(collection)
    // const taskIndex = await ToDoTask.findById(req.params.id);
    console.log("Found documents:", todoTasks);
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
    const task = req.body.task;
    const newTask = await ToDoTask.create({ task });
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo task" });
  }
});


// Edit a task by index
app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = await ToDoTask.findByIdAndUpdate(
      id,
      { task: req.body.task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
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
// app.delete("/todos/:index", (req, res) => {
//   const index = req.params.index;

//   if (index >= 0 && index < todoList.length) {
//     todoList.splice(index, 1);
//     res.json(todoList);
//   } else {
//     res.status(404).json({ error: "Task not found" });
//   }
// });

app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTask = await ToDoTask.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

console.log("App listen at port 5000");
app.listen(port, () => console.log("Server is running on port", port));
