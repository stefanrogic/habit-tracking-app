import HabitsShort from "../../components/habitsShort/HabitsShort";

type Props = {
  username: string;
  getUrl: (value: string) => string;
};

const HomePage = ({ username, getUrl }: Props) => {
  return (
    <div className="flex flex-col gap-10 max-w-[1000px] w-full mx-auto pt-20">
      <h1 className="text-5xl font-bold">Hello {username}, these are your habits and tasks for today</h1>

      <HabitsShort getUrl={getUrl} />
      {/* <TodoList /> */}
    </div>
  );
};

export default HomePage;
