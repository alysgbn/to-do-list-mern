const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  index: { type: Number },
  task: { type: String },
}, { collection: 'ToDoTask' });



module.exports = mongoose.model("ToDoTask", todoSchema);