import WaterIntakeCard from "../homeCards/habitCards/WaterIntakeCard";

import { useState } from "react";

type Habits = {
  id: number;
  type: string;
  name: string;
  start?: Date;
  count?: number[];
  goal: number;
  progress: number;
};

type Props = {
  getUrl: (value: string) => string;
};

const HabitsShort = ({ getUrl }: Props) => {
  const [habits, setHabits] = useState<Habits[]>([
    { id: 0, type: "water-intake", name: "Water Intake", start: new Date("17-Apr-24"), goal: 10, progress: 3 },
    { id: 1, type: "water-intake", name: "Water Intake", start: new Date("17-Apr-24"), goal: 12, progress: 5 },
    { id: 2, type: "water-intake", name: "Water Intake", start: new Date("17-Apr-24"), goal: 9, progress: 7 },
  ]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-end gap-5">
          <button className=" text-white hover:bg-blue-800 font-medium text-sm p-3 py-3 h-full bg-blue-600" type="button">
            <img className="h-5 w-5" src={getUrl("icons/gear-fill.svg")} alt="add-icon" />
          </button>
        </div>

        <div className="grid grid-cols-3 grid-flow-row gap-5">
          {habits.map((habit, i) => (
            <WaterIntakeCard key={i} habit={habit} habits={habits} setHabits={setHabits} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitsShort;
