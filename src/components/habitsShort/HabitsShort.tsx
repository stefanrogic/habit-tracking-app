import CountUpCard from "../homeCards/habitCards/CountUpCard";
import MealCard from "../homeCards/habitCards/MealCard";
import ReadingCard from "../homeCards/habitCards/ReadingCard";
import WaterIntakeCard from "../homeCards/habitCards/WaterIntakeCard";
import NewHabitModal from "../modals/NewHabitModal";

import { useEffect, useState } from "react";

type Habits = {
  id: number;
  type: string;
  name: string;
  startDate?: Date;
  start?: number;
  count?: number[];
  goal?: number | Date;
  progress?: number | number[];
};

type Props = {
  getUrl: (value: string) => string;
  terms: boolean;
};

const HabitsShort = ({ getUrl, terms }: Props) => {
  const [habits, setHabits] = useState<Habits[]>(
    JSON.parse(localStorage.getItem("habitData")) || [
      { id: 0, type: "water-intake", name: "Water Intake", goal: 10, progress: 3 },
      { id: 1, type: "reading", name: "Read a Book", start: 0, progress: [147], goal: 365 },
      { id: 2, type: "count-up", name: "Alcohol Free", startDate: new Date("01-May-24"), goal: new Date("14-May-24") },
      { id: 3, type: "meal", name: "Calories", start: 0, progress: [1200, 820, 600], goal: 2800 },
    ]
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (terms) return localStorage.setItem("habitData", JSON.stringify(habits));
    else return;
  }, [terms]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-end gap-5">
          <NewHabitModal habits={habits} setHabits={setHabits} getUrl={getUrl} />

          <button className=" text-white hover:bg-slate-700 font-medium text-sm p-3 py-3 h-full bg-slate-900" type="button" onClick={() => setEditMode(!editMode)}>
            <img className="h-5 w-5" src={getUrl("icons/gear-fill.svg")} alt="edit-icon" />
          </button>
        </div>

        <div className="grid grid-cols-3 grid-flow-row gap-5">
          {habits.map((habit, i) => {
            if (habit.type === "water-intake") {
              return <WaterIntakeCard habits={habits} setHabits={setHabits} editMode={editMode} key={i} habit={habit} getUrl={getUrl} />;
            }

            if (habit.type === "count-up") {
              return <CountUpCard habits={habits} setHabits={setHabits} editMode={editMode} key={i} habit={habit} getUrl={getUrl} />;
            }

            if (habit.type === "reading") {
              return <ReadingCard habits={habits} setHabits={setHabits} editMode={editMode} key={i} habit={habit} getUrl={getUrl} />;
            }

            if (habit.type === "meal") {
              return <MealCard habits={habits} setHabits={setHabits} editMode={editMode} className="col-auto" key={i} habit={habit} getUrl={getUrl} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default HabitsShort;
