import { MouseEvent, KeyboardEvent, useState, useEffect } from "react";

type TodoItems = {
  text: string;
  done: boolean;
};

type Habits = {
  type: string;
  name: string;
  start?: Date;
  count?: number[];
};

//! IMPLEMENT EDIT
function App() {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todo, setTodo] = useState<TodoItems[]>([]);
  const [habits, setHabits] = useState<Habits[]>([
    { type: "count-hours", name: "Fasting", start: new Date("17-Apr-24") },
    { type: "count-days", name: "Alcohol Free", start: new Date("10-Apr-24") },
    { type: "count-times", name: "Water Intake", count: [1, 3, 5] },
  ]);

  const renderProgress = (type: string, start?: Date, count?: number[]): number | string | undefined => {
    if (type === "count-days" || type === "count-hours") {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const gap = Date.now() - start;
      const daysGap = Math.floor(gap / day);
      const hoursGap = Math.floor((gap % day) / hour);
      const minutesGap = Math.floor((gap % hour) / minute);
      const secondsGap = Math.floor((gap % minute) / second);

      return `${daysGap === 1 ? daysGap + " Day" : daysGap + " Days"} ${hoursGap === 1 ? hoursGap + " Hour" : hoursGap + " Hours"} ${minutesGap === 1 ? minutesGap + " Minute" : minutesGap + " Minutes"} ${
        secondsGap === 1 ? secondsGap + " Second" : secondsGap + " Seconds"
      }`;
    }

    if (type === "count-times") {
      return count?.reduce((acc, s) => (acc += s), 0) + " Glasses";
    }
  };

  const handleAddTodo = (e: KeyboardEvent | MouseEvent, key: boolean = false): void => {
    setTodo([...todo, { text: newTodo, done: false }]);
    if (key) {
      (e.target as HTMLButtonElement).value = "";
    } else {
      ((e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement).value = "";
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("test");
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="max-w-[1000px] flex flex-col gap-20 mx-auto my-20">
      <div className="flex flex-col gap-10 bg-gray-700  p-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">Habit Tracker</h1>
          <div className="flex flex-row gap-2">
            <button className="px-3 py-1 bg-gray-500 font-bold" onClick={() => setHabits([...habits, { type: "count-days", name: "Alcohol Free", start: new Date() }])}>
              ADD
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {habits.length === 0 && <p>List is empty</p>}

          {habits.map((h: Habits, i: number) => {
            if (h.type === "count-days" || h.type === "count-hours") {
              return (
                <div className={`flex flex-row justify-between items-center p-5  bg-slate-800`} key={i}>
                  <div className="flex flex-row items-center gap-5">
                    <p className={`text-xl font-bold`}>{h.name}</p>
                    <span>{renderProgress(h.type, h.start)}</span>
                  </div>
                  <div className="flex flex-row items-center gap-5">
                    <button className="px-3 py-1 bg-gray-500 font-bold">REMOVE</button>
                  </div>
                </div>
              );
            }

            if (h.type === "count-times") {
              return (
                <div className={`flex flex-row justify-between items-center p-5  bg-slate-800`} key={i}>
                  <div className="flex flex-row items-center gap-5">
                    <p className={`text-xl font-bold`}>{h.name}</p>
                    <span>{renderProgress(h.type, undefined, h.count)}</span>
                  </div>
                  <div className="flex flex-row items-center gap-5">
                    <button className="px-3 py-1 bg-gray-500 font-bold">REMOVE</button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-gray-700 p-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">TODO List</h1>
          <div className="flex flex-row gap-2">
            <input
              className="bg-slate-200 text-black w-96 px-2"
              type="text"
              placeholder="Enter your task"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo(e, true);
                }
              }}
            />
            <button className="px-3 py-1 bg-gray-500 font-bold" onClick={(e) => handleAddTodo(e)}>
              ADD
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {todo.length === 0 && <p>List is empty</p>}
          {todo.map((t, i: number) => (
            <div className={`flex flex-row justify-between items-center p-5  ${t?.done ? "bg-slate-600" : "bg-slate-800"}`} key={i}>
              <p className={`text-xl font-bold ${t?.done && "line-through"}`}>{t.text}</p>
              <div className="flex flex-row items-center gap-5">
                <button className="px-3 py-1 bg-gray-500 font-bold" onClick={() => handleRemoveTodo(i)}>
                  REMOVE
                </button>
                <button className="px-3 py-1 bg-gray-500 font-bold" onClick={() => handleMarkTodo(i)}>
                  {t?.done ? "MARK AS UNDONE" : "MARK AS DONE"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
