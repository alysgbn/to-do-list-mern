import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface Task {
  _id: string;
  task?: string;
}

type Props = {
  data: Task[];
  deleteTask: (index: string) => void;
}


const ToDoLists = ({ data, deleteTask } : Props ) => {
  const [editIndex, setEditIndex] = useState(null);
  const [saved, setSaved] = useState(false);
  return (
    <div>
      <h1>To Do List</h1>
      {/* <p>{data.task}</p> */}
      {data?.map((item, index) => (
        <div className="todo-lists" key={index}>
          <div>
            <h5>Task {item._id}</h5>
            {editIndex === index && !saved ? (
              <input
                type="text"
                value={item.task}
                // onChange={(e) => editTask(index, e.target.value)}
              />
            ) : (
              <p>{item.task}</p>
            )}
          </div>
          <div className="edit-delete">
            <Button
              key={index}
              variant="outline-light"
              onClick={() => {
                // setEditIndex(index);
                // editTask(index, todo);
                setSaved(!saved);
              }}
            >
              {editIndex === index && !saved ? "Save" : "Edit"}
            </Button>{" "}
            <Button
              variant="outline-light"
              onClick={() => {
                deleteTask(item._id);
                console.log("butto delete pressed!", item._id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoLists;
