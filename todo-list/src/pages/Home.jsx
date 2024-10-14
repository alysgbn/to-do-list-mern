import React, { useEffect, useState } from "react";
import "../resources/home.scss";
import { Container } from "react-bootstrap";
import ToDoForm from "./ToDoForm";
import ToDoLists from "./ToDoLists";
import { useNavigate } from "react-router";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
 const API = "http://localhost:4001/todos"
  // localStorage.setItem("toDoList", todoList);

  // function deleteTask(index) {
  //   const newTodoList = [...todoList];
  //   newTodoList.splice(index, 1);
  //   setTodoList(newTodoList);
  // }

  // function editTask(index, newValue) {
  //   const newTodoList = [...todoList];
  //   newTodoList[index] = newValue;
  //   setTodoList(newTodoList);
  // }

  // Fetch todo list from the server using axios
  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTodoList(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setTodoList([]); // Handle errors by setting an empty array
      });
  }, []);

  // Delete task from the server using axios
  function deleteTask(index) {
    axios
      .delete(`${API}/${index}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTodoList(data);
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  }

  // Edit task on the server using axios
  function editTask(index, newValue) {
    axios
      .put(`${API}/${index}`, { task: newValue })
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTodoList(data);
        }
      })
      .catch((error) => console.error("Error editing task:", error));
  }

  return (
    <Container>
      <ToDoLists
        todoList={todoList}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <ToDoForm todoList={todoList} setTodoList={setTodoList} />
      <div
        style={{ marginTop: "2rem", color: "#e5d8ce", cursor: "pointer" }}
        onClick={() => navigate("/second")}
      >
        Proceed
      </div>
    </Container>
  );
};
