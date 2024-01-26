import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./todo-list.module.css";

const Todo = ({ name, isCompleted, completeTodo, deleteTodo }) => {
  return (
    <div className={styles.todo}>
      <input
        type="radio"
        value={isCompleted}
        checked={isCompleted}
        style={{ transform: "scale(1.5)", margin: 16 }}
        onClick={() => completeTodo(name)}
        readOnly
      />
      {isCompleted ? (
        <s style={{color: "#ccc"}}>
          <h2>{name}</h2>
        </s>
      ) : (
        <h2>{name}</h2>
      )}
      <span onClick={() => deleteTodo(name)}>
        <i className="fa-solid fa-trash"></i>
      </span>
    </div>
  );
};

Todo.propTypes = {
  name: PropTypes.string,
  deleteTodo: PropTypes.func,
  completeTodo: PropTypes.func,
  isCompleted: PropTypes.bool,
};

// component for todo list
const ToDoList = ({ initialTodos = [] }) => {
  //state variable used to handle the input field
  const [inpText, setInpText] = useState("");

  //state variable used to store the todos
  const [todos, setTodos] = useState(initialTodos);

  const handleInpChange = (e) => {
    console.log(e.target.value);
    setInpText(e.target.value);
  };

  const addTodo = () => {
    setTodos([...todos, { name: inpText, isCompleted: false }]);
    setInpText("");
  };

  const deleteTodo = (currentName) => {
    setTodos(todos.filter((todo) => todo.name !== currentName))
  };

  const completeTodo = (currentName) => {
    const oldTodos = [...todos];
    const curTodoIndex = oldTodos.findIndex((todo) => todo.name === currentName);

    const currentTodo = oldTodos[curTodoIndex];
    
    if (currentTodo.isCompleted) {
        currentTodo.isCompleted = false;
    } else {
        currentTodo.isCompleted = true;
    }

    const newTodos = [...todos];
    newTodos[curTodoIndex] = currentTodo;
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>My Todo</h1>
      <div className={styles.root}>
        {console.log(todos)}
        <input
          onChange={handleInpChange}
          value={inpText}
          placeholder="Todo Name"
        />
        <button type="button" onClick={addTodo}>
          Add Todo
        </button>
        {todos.map((todo) => (
          <Todo
            {...todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            key={todo.name}
          />
        ))}
      </div>
    </div>
  );
};
ToDoList.propTypes = {
  initialTodos: PropTypes.arrayOf({}),
};

export default ToDoList;
