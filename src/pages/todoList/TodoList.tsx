import { MouseEvent, KeyboardEvent, useState } from "react";
import TodoItem from "../../components/todoItem/TodoItem";

type TodoItems = {
  text: string;
  done: boolean;
};
// ! FIX TODO LIST NOT UPDATING ON ITS OWN
const TodoList = ({ getUrl }) => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todo, setTodo] = useState<TodoItems[]>(JSON.parse(localStorage.getItem("todoList")) || []);

  const handleAddTodo = (e: KeyboardEvent | MouseEvent, key: boolean = false): void => {
    newTodo.length > 0 && localStorage.setItem("todoList", JSON.stringify([...todo, { text: newTodo, done: false }])) && setTodo([...todo, { text: newTodo, done: false }]);
    if (key) {
      (e.target as HTMLButtonElement).value = "";
      setNewTodo("");
    } else {
      ((e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement).value = "";
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (i: number): void => {
    localStorage.setItem("todoList", JSON.stringify(todo.filter((_, todoI) => todoI !== i)));
    setTodo(todo.filter((_, todoI) => todoI !== i));
  };

  const handleMarkTodo = (i: number): void => {
    const newState = todo.map((t, todoI) => {
      if (todoI === i) {
        return { ...t, done: !t.done };
      } else return t;
    });

    localStorage.setItem("todoList", JSON.stringify(newState));
    setTodo(newState);
  };

  return (
    <div className="flex flex-col gap-10 scroll-m-24 max-w-1/3 pt-[63px]" id="todo-list">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-5">
          <input
            className="w-96 p-3 bg-white border"
            type="text"
            placeholder="Enter your task"
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo(e, true);
              }
            }}
            required
          />
          <button className="text-white hover:bg-slate-700 font-medium text-sm p-3 py-3 h-full bg-slate-900" onClick={(e) => handleAddTodo(e)}>
            New Task
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {todo.length === 0 && <p>Your TODO list is empty</p>}
        {todo.map((t, i: number) => (
          <TodoItem key={i} data={t} handleMarkTodo={handleMarkTodo} handleRemoveTodo={handleRemoveTodo} i={i} getUrl={getUrl} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
