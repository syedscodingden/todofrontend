import React, { useState } from "react";
import classes from "./Todo.module.css";
import Input from "./Input";

const Todo = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [completed, setCompleted] = useState(
    props.completed ? "True" : "False"
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const { id: todoId } = props;

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const completedChangeHandler = (event) => {
    setCompleted(event.target.value);
  };

  const cancelUpdateHandler = () => {
    setIsUpdating(false);
  };

  const submitUpdateHandler = async () => {
    const updatedObj = {
      title,
      description,
      completed: completed === "True" ? true : false,
    };
    console.log(updatedObj);
    setIsUpdating(false);

    const response = await fetch("http://localhost:3000/todos/" + todoId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify(updatedObj),
    });

    await response.json();
    props.onUpdate();
  };

  const deleteHandler = async () => {
    const response = await fetch("http://localhost:3000/todos/" + todoId, {
      method: "DELETE",
    });

    await response.json();
    props.onDelete(todoId);
  };

  const updateHandler = () => {
    setIsUpdating(true);
  };

  return (
    <div className={classes.todo}>
      {isUpdating ? (
        <Input
          id="title"
          label="Title"
          type="text"
          value={title}
          onChange={titleChangeHandler}
        />
      ) : (
        <h2 className={classes.todotitle}>
          {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
        </h2>
      )}

      {isUpdating ? (
        <Input
          id="description"
          label="Description"
          type="text"
          value={description}
          onChange={descriptionChangeHandler}
        />
      ) : (
        <div className={classes.description}>
          Description: {props.description}
        </div>
      )}

      {isUpdating ? (
        <Input
          id="completed"
          label="Completed"
          type="text"
          value={completed}
          onChange={completedChangeHandler}
        />
      ) : (
        <div className={classes.todocompleted}>
          Completed:
          <span
            className={
              props.completed ? classes.completedtrue : classes.completedfalse
            }
          >
            {props.completed ? "True" : "False"}
          </span>
        </div>
      )}

      {isUpdating && (
        <button className={classes.button} onClick={submitUpdateHandler}>
          Submit
        </button>
      )}
      {isUpdating && (
        <button className={classes.button} onClick={cancelUpdateHandler}>
          Cancel
        </button>
      )}
      {!isUpdating && (
        <button className={classes.button} onClick={deleteHandler}>
          Delete
        </button>
      )}

      {!isUpdating && (
        <button className={classes.button} onClick={updateHandler}>
          Update
        </button>
      )}
    </div>
  );
};

export default Todo;
