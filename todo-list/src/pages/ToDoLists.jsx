import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
const ToDoLists = ({ todoList }) => {
    console.log("list", todoList)
  return (
    <div>
      <h1>To Do List</h1>
      {todoList?.map((todo, index) => (
        <div className="todo-lists" key={index}>
          <Button variant="outline-light">Edit</Button>{" "}
          <div>
            <h5>Task {index + 1}</h5>
            <p>{todo}</p>
          </div>
          <Button variant="outline-light">Delete</Button>{" "}
        </div>
      ))}
    </div>
  );
};

export default ToDoLists;
