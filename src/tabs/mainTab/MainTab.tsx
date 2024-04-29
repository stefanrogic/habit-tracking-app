import HabitTracker from "../habitTracker/HabitTracker";
import TodoList from "../todoList/TodoList";

import { useEffect } from "react";

type Props = {
  username: string;
  getUrl: (value: string) => string;
};

const MainTab = ({ username, getUrl }: Props) => {
  useEffect(() => {
    console.log("username changed");
  }, [username]);

  return (
    <div className="flex flex-col gap-20 max-w-[1000px] mx-auto pt-20">
      <h1 className="text-7xl font-bold w-[800px]">Hello {username}, these are your daily habits</h1>

      <HabitTracker getUrl={getUrl} />
      <TodoList />
    </div>
  );
};

export default MainTab;
