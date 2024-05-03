import { useState } from "react";
import WaterIndicator from "./WaterIndicator";

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
  habit: Habits;
};

const WaterIntakeCard = ({ habit }: Props) => {
  const [progress, setProgress] = useState<number>(habit.progress);

  return (
    <div className="relative bg-blue-200 aspect-[1/1] flex flex-col justify-start items-end">
      <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{Math.round((progress / habit.goal) * 100)}%</span>
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">Water Intake</span>
      <div className="absolute z-20 right-5 bottom-6 flex flex-col-reverse flex-wrap-reverse gap-2 h-[73%]">
        {Array(habit.goal)
          .fill(0)
          .map((_, i: number) => (
            <WaterIndicator key={i} select={i + 1 <= progress ? true : false} progress={progress} setProgress={setProgress} />
          ))}
      </div>
      <div className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-blue-500" style={{ height: (progress / habit.goal) * 100 + "%" }}></div>
    </div>
  );
};

export default WaterIntakeCard;
