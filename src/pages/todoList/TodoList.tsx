import { MouseEvent, KeyboardEvent, useState } from "react";

type TodoItems = {
  text: string;
  done: boolean;
};

const TodoList = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todo, setTodo] = useState<TodoItems[]>([]);

  const handleAddTodo = (e: KeyboardEvent | MouseEvent, key: boolean = false): void => {
    newTodo.length > 0 && setTodo([...todo, { text: newTodo, done: false }]);
    if (key) {
      (e.target as HTMLButtonElement).value = "";
      setNewTodo("");
    } else {
      ((e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement).value = "";
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (i: number): void => {
    setTodo(todo.filter((_, todoI) => todoI !== i));
  };

  const handleMarkTodo = (i: number): void => {
    const newState = todo.map((t, todoI) => {
      if (todoI === i) {
        return { ...t, done: !t.done };
      } else return t;
    });

    setTodo(newState);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">TODO List</h1>
        <div className="flex flex-row gap-5">
          <input
            className="border text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-96 px-2.5 bg-slate-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
          <button className="text-white hover:bg-blue-800 font-medium text-sm px-5 py-3 h-full bg-blue-600" onClick={(e) => handleAddTodo(e)}>
            New Task
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {todo.length === 0 && <p>List is empty</p>}
        {todo.map((t, i: number) => (
          <div className={`flex flex-row justify-between items-center px-5 h-20 border border-gray-200 shadow dark:bg-slate-800 dark:border-gray-700 ${t?.done ? "bg-slate-600" : "bg-slate-800"}`} key={i}>
            <div className="w-full h-full flex items-center cursor-pointer" onClick={() => handleMarkTodo(i)}>
              <p className={`text-xl font-bold ${t?.done && "line-through"}`}>{t.text}</p>
            </div>
            <div className="flex flex-row items-center gap-5">
              <button className="px-3 py-1 bg-gray-500 font-bold" onClick={() => handleRemoveTodo(i)}>
                REMOVE
              </button>
              {/* <button className="px-3 py-1 bg-gray-500 font-bold" onClick={() => handleMarkTodo(i)}>
            {t?.done ? "MARK AS UNDONE" : "MARK AS DONE"}
          </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
