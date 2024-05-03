import NewMealModal from "../../modals/NewMealModal";

import { useState } from "react";

type Habits = {
  id: number;
  type: string;
  name: string;
  start?: Date;
  count?: number[];
  progress: number[];
  goal: number;
};

type Props = {
  habits: Habits[];
  setHabits: React.Dispatch<React.SetStateAction<Habits[]>>;
  editMode: boolean;
  habit: Habits;
  getUrl: (value: string) => string;
};

const MealCard = ({ habits, setHabits, editMode, habit, getUrl }: Props) => {
  const [meals, setMeals] = useState<number[]>(habit.progress);

  const renderProgress = () => meals.reduce((partialSum, a) => partialSum + a, 0) + " / " + habit.goal + "kcal";

  return (
    <div className="relative bg-green-400 aspect-[1/1] flex flex-col justify-start items-end">
      {habit.goal && <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{Math.round(Math.abs((meals.reduce((partialSum, a) => partialSum + a, 0) / habit.goal) * 100))}%</span>}
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">{renderProgress()}</span>
      <span className="absolute z-20 left-5 bottom-14 text-3xl text-white font-bold">{habit.name}</span>
      {habit.goal && (
        <div
          className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-green-500 transition ease-in-out duration-200"
          style={{ height: (meals.reduce((partialSum, a) => partialSum + a, 0) / habit.goal) * 100 > 100 ? "100" : Math.abs((meals.reduce((partialSum, a) => partialSum + a, 0) / habit.goal) * 100) + "%" }}
        ></div>
      )}
      {/* <button className=" absolute z-10 bottom-5 right-5 text-white hover:bg-green-600 font-medium text-sm p-3 py-3 bg-green-700" type="button">
        <img className="h-6 w-6" src={getUrl("icons/plus.svg")} alt="add-icon" />
      </button> */}
      {!editMode ? (
        <NewMealModal meals={meals} setMeals={setMeals} getUrl={getUrl} />
      ) : (
        <>
          <button
            id={String(habit.id)}
            className="absolute z-10 top-5 left-5 text-white hover:bg-green-600 font-medium text-sm p-3 py-3 bg-green-700"
            type="button"
            onClick={(e) => {
              console.log(habit.id, Number((e.target as HTMLButtonElement).id));
              const newState = habits.filter((h: Habits) => Number(h.id) !== Number((e.target as HTMLButtonElement).id));
              setHabits(newState);
            }}
          >
            <img
              id={String(habit.id)}
              className="h-6 w-6"
              src={getUrl("icons/trash3-fill.svg")}
              alt="remove-icon"
              onClick={(e) => {
                console.log(habit.id, Number((e.target as HTMLButtonElement).id));
                const newState = habits.filter((h: Habits) => Number(h.id) !== Number((e.target as HTMLButtonElement).id));
                setHabits(newState);
              }}
            />
          </button>
          <button className="absolute z-10 top-5 left-20 text-white hover:bg-green-600 font-medium text-sm p-3 py-3 bg-green-700" type="button">
            <img className="h-6 w-6" src={getUrl("icons/pen-fill.svg")} alt="remove-icon" />
          </button>
        </>
      )}
    </div>
  );
};

export default MealCard;
