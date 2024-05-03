type Habits = {
  id: number;
  type: string;
  name: string;
  start?: number;
  count?: number[];
  goal: number;
  progress: number;
};

type Props = {
  habit: Habits;
  getUrl: (value: string) => string;
};

const ReadingCard = ({ habit, getUrl }: Props) => {
  return (
    <div className="relative bg-yellow-500 aspect-[1/1] flex flex-col justify-start items-end">
      <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{Math.round((habit.progress / habit.goal) * 100)}%</span>
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">{habit.name}</span>

      <div className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-yellow-800" style={{ height: (habit.progress / habit.goal) * 100 + "%" }}></div>

      <button className=" absolute z-10 bottom-5 right-5 text-white hover:bg-yellow-600 font-medium text-sm p-3 py-3 bg-yellow-700" type="button">
        <img className="h-6 w-6" src={getUrl("icons/plus.svg")} alt="add-icon" />
      </button>
    </div>
  );
};

export default ReadingCard;
