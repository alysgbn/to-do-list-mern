const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  // taskId: { type: String | Number, required: true },
  task: { type: String },
});

module.exports = mongoose.model("ToDoTask", todoSchema);