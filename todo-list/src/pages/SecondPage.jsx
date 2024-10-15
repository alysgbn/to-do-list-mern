import React from 'react'

 const SecondPage = () => {
    const task = localStorage.getItem("toDoList");

    return <div> <h5 style={{ color: "#e5d8ce", marginTop: "2rem" }}>Your to-do lists</h5>
        <h1>{task}</h1>
    </div>;
  };

  export default SecondPage;