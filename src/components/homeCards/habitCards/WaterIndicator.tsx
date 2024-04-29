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
  select: boolean;
  habit: Habits;
  habits: Habits[];
  setHabits: React.Dispatch<React.SetStateAction<Habits>>;
};

const WaterIndicator = ({ select, habit, habits, setHabits }: Props) => {
  const [fill, setFill] = useState<boolean>(select ? true : false);

  return (
    <div
      className="h-4 w-4 rounded-full border-2 border-white cursor-pointer"
      style={{ backgroundColor: fill ? "#fff" : "transparent" }}
      onClick={() => {
        setFill(!fill);

        if (!fill) {
          const newState = habits.map((h) => {
            if (h.id === habit.id) {
              h.id === habit.id && console.log(h.progress + 1);
              return { ...h, progress: h.progress + 1 };
            }
          });

          setHabits(newState);
        } else {
          const newState = habits.map((h) => {
            if (h.id === habit.id) {
              h.id === habit.id && console.log(h.progress - 1);
              return { ...h, progress: h.progress - 1 };
            }
          });

          setHabits(newState);
        }
      }}
    ></div>
  );
};

export default WaterIndicator;
