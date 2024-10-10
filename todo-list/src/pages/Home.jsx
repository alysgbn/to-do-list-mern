import React, { useEffect, useState } from "react";
import "../resources/home.scss";
import { Container } from "react-bootstrap";
import ToDoForm from "./ToDoForm";
import ToDoLists from "./ToDoLists";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);
  localStorage.setItem("toDoList", todoList);

  function deleteTask(index) {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function editTask(index, newValue) {
    const newTodoList = [...todoList];
    newTodoList[index] = newValue;
    setTodoList(newTodoList);
  }

  return (
    <Container>
      <ToDoLists
        todoList={todoList}
        deleteTask={deleteTask}
        editTask={editTask}
      />
      <ToDoForm todoList={todoList} setTodoList={setTodoList} />
      <div style={{ marginTop: "2rem", color: "#e5d8ce", cursor: "pointer" }} onClick={() => navigate("/second")}>
        Proceed
      </div>
    </Container>
  );
};
