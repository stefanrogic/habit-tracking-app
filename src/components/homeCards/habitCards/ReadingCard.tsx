import NewPagesModal from "../../modals/NewPagesModal";

import { useState } from "react";

type Habits = {
  id: number;
  type: string;
  name: string;
  start?: number;
  count?: number[];
  goal: number;
  progress: number[];
};

type Props = {
  habits: Habits[];
  setHabits: React.Dispatch<React.SetStateAction<Habits[]>>;
  editMode: boolean;
  habit: Habits;
  getUrl: (value: string) => string;
};

const ReadingCard = ({ habits, setHabits, editMode, habit, getUrl }: Props) => {
  const [progress, setProgress] = useState<number[]>(habit.progress);

  const renderProgress = () => progress.reduce((partialSum, a) => partialSum + a, 0) + " / " + habit.goal + " Pages";

  return (
    <div className="relative bg-yellow-500 aspect-[1/1] flex flex-col justify-start items-end">
      <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{Math.round((progress.reduce((partialSum, a) => partialSum + a, 0) / habit.goal) * 100)}%</span>
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">{renderProgress()}</span>
      <span className="absolute z-20 left-5 bottom-14 text-3xl text-white font-bold">{habit.name}</span>

      <div className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-yellow-800" style={{ height: (progress.reduce((partialSum, a) => partialSum + a, 0) / habit.goal) * 100 + "%" }}></div>

      {/* <button className="absolute z-10 bottom-5 right-5 text-white hover:bg-yellow-600 font-medium text-sm p-3 py-3 bg-yellow-700" type="button">
        <img className="h-6 w-6" src={getUrl("icons/plus.svg")} alt="add-icon" />
      </button> */}
      {!editMode ? (
        <NewPagesModal progress={progress} setProgress={setProgress} getUrl={getUrl} />
      ) : (
        <>
          <button
            id={String(habit.id)}
            className="absolute z-10 top-5 left-5 text-white hover:bg-yellow-600 font-medium text-sm p-3 py-3 bg-yellow-700"
            type="button"
            onClick={(e) => {
              const newState = habits.filter((h: Habits) => Number(h.id) !== Number((e.target as HTMLButtonElement).id));
              localStorage.setItem("habitData", JSON.stringify(newState));
              setHabits(newState);
            }}
          >
            <img
              id={String(habit.id)}
              className="h-6 w-6"
              src={getUrl("icons/trash3-fill.svg")}
              alt="remove-icon"
              onClick={(e) => {
                const newState = habits.filter((h: Habits) => Number(h.id) !== Number((e.target as HTMLButtonElement).id));
                localStorage.setItem("habitData", JSON.stringify(newState));
                setHabits(newState);
              }}
            />
          </button>
          <button className="absolute z-10 top-5 left-20 text-white hover:bg-yellow-600 font-medium text-sm p-3 py-3 bg-yellow-700" type="button">
            <img className="h-6 w-6" src={getUrl("icons/pen-fill.svg")} alt="remove-icon" />
          </button>
        </>
      )}
    </div>
  );
};

export default ReadingCard;
