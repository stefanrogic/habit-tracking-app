import CountUpCard from "../homeCards/habitCards/CountUpCard";
import MealCard from "../homeCards/habitCards/MealCard";
import ReadingCard from "../homeCards/habitCards/ReadingCard";
import WaterIntakeCard from "../homeCards/habitCards/WaterIntakeCard";
import NewHabitModal from "../modals/NewHabitModal";

import { useState } from "react";

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
};

const HabitsShort = ({ getUrl }: Props) => {
  const [habits, setHabits] = useState<Habits[]>([
    { id: 0, type: "water-intake", name: "Water Intake", startDate: new Date("17-Apr-24"), goal: 10, progress: 3 },
    { id: 1, type: "reading", name: "Read a Book", start: 0, progress: 147, goal: 365 },
    { id: 2, type: "count-up", name: "Alcohol Free", startDate: new Date("01-May-24"), goal: new Date("10-May-24") },
    { id: 3, type: "meal", name: "Calories", start: 0, progress: [1200, 820, 600], goal: 2800 },
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-end gap-5">
          <NewHabitModal habits={habits} setHabits={setHabits} getUrl={getUrl} />

          <button className=" text-white hover:bg-blue-800 font-medium text-sm p-3 py-3 h-full bg-blue-600" type="button">
            <img className="h-5 w-5" src={getUrl("icons/gear-fill.svg")} alt="add-icon" />
          </button>
        </div>

        <div className="grid grid-cols-3 grid-flow-row gap-5">
          {habits.map((habit, i) => {
            if (habit.type === "water-intake") {
              return <WaterIntakeCard key={i} habit={habit} />;
            }

            if (habit.type === "count-up") {
              return <CountUpCard key={i} habit={habit} />;
            }

            if (habit.type === "reading") {
              return <ReadingCard key={i} habit={habit} getUrl={getUrl} />;
            }

            if (habit.type === "meal") {
              return <MealCard className="col-auto" key={i} habit={habit} getUrl={getUrl} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default HabitsShort;
