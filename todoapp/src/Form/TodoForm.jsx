import React from "react";
import classes from "./TodoForm.module.css";
import Input from "../UI/Input";
import { useState } from "react";

const TodoForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const completedChangeHandler = (event) => {
    setCompleted(event.target.value);
  };
  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    const todo = {
      title,
      description,
      completed: completed === "True" ? true : false,
    };

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(todo),
    });

    await response.json();

    props.onAdd();

    setTitle("");
    setDescription("");
    setCompleted("");
  };

  return (
    <div className={classes.form}>
      <form onSubmit={formSubmissionHandler}>
        <Input
          id="title"
          label="Todo Title"
          type="text"
          value={title}
          onChange={titleChangeHandler}
        />
        <Input
          id="description"
          label="Todo Description"
          type="text"
          value={description}
          onChange={descriptionChangeHandler}
        />
        <Input
          id="completed"
          label="Todo Completed"
          type="text"
          value={completed}
          onChange={completedChangeHandler}
        />
        <div>
          <button className={classes.button}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
