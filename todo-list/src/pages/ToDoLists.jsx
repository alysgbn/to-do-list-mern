import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
const ToDoLists = ({ todoList, deleteTask, editTask }) => {
  const [edit, setEdit] = useState(false);
  console.log(edit);
  return (
    <div>
      <h1>To Do List</h1>
      {todoList?.map((todo, index) => (
        <div className="todo-lists" key={index}>
          <div>
            <h5>Task {index + 1}</h5>
            {edit ? (
              <input
                type="text"
                value={todo}
                onChange={(e) => editTask(index, e.target.value)}
              />
            ) : (
              <p>{todo}</p>
            )}
          </div>
          <div className="edit-delete">
            <Button
              key={index}
              variant="outline-light"
              onClick={() => {
                editTask(index, todo);
                setEdit(!edit);
              }}
            >
              {edit ? "Save" : "Edit"}
            </Button>{" "}
            <Button variant="outline-light" onClick={() => deleteTask(index)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoLists;
