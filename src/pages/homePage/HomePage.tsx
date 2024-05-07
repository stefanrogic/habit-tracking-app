import HabitsShort from "../../components/habitsShort/HabitsShort";
import TodoList from "../todoList/TodoList";

type Props = {
  username: string;
  getUrl: (value: string) => string;
  terms: boolean;
};

const HomePage = ({ getUrl, terms }: Props) => {
  return (
    <div className="flex flex-col gap-10 w-full mx-auto pt-10 max-w-[1600px]">
      {/* <h1 className="text-5xl font-bold px-10">Hello {username}, these are your habits and tasks for today</h1> */}

      <div className="flex flex-row gap-20 w-[100%] px-10">
        <HabitsShort getUrl={getUrl} terms={terms} />
        <TodoList getUrl={getUrl} />
      </div>
    </div>
  );
};

export default HomePage;
