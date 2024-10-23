const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  id: { type: Number, default: 0 },
  Todo: String
});

module.exports = mongoose.model("ToDoTask", todoTaskSchema);
