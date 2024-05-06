import { useEffect, useState } from "react";

type Habits = {
  id: number;
  type: string;
  name: string;
  startDate?: Date;
  count?: number[];
  goal: Date;
  progress: number;
};

type Props = {
  habit: Habits;
  getUrl: (value: string) => string;
};

const CountUpCard = ({ habits, setHabits, editMode, habit, getUrl }: Props) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const [progress, setProgress] = useState<number>(() => {
    const gap = Date.now() - new Date(habit.startDate);
    const daysGap = Math.floor(gap / day);

    return daysGap;
  });

  const [goal] = useState<number | boolean>(() => {
    if (habit.goal) {
      const gap = new Date(habit.goal) - Date.now();
      const daysGap = Math.floor(gap / day);

      return daysGap;
    } else return false;
  });

  const renderProgress = (): string => {
    const gap = Date.now() - new Date(habit.startDate);
    const daysGap = Math.floor(gap / day);
    const hoursGap = Math.floor((gap % day) / hour);
    const minutesGap = Math.floor((gap % hour) / minute);
    const secondsGap = Math.floor((gap % minute) / second);

    return `${daysGap < 10 ? "0" + daysGap : daysGap}d ${hoursGap < 10 ? "0" + hoursGap : hoursGap}h ${minutesGap < 10 ? "0" + minutesGap : minutesGap}m ${secondsGap < 10 ? "0" + secondsGap : secondsGap}s`;
  };

  const [renderedProgress, setRenderedProgress] = useState<string>(renderProgress());

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderedProgress(renderProgress());
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="relative bg-red-400 aspect-[1/1] flex flex-col justify-start items-end">
      {goal && <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{Math.round(Math.abs((progress / goal) * 100))}%</span>}
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">{renderedProgress}</span>
      <span className="absolute z-20 left-5 bottom-14 text-3xl text-white font-bold">{habit.name}</span>
      {goal && <div className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-red-500" style={{ height: Math.abs((progress / goal) * 100) > 100 ? "100" : Math.abs((progress / goal) * 100) + "%" }}></div>}

      {editMode && (
        <>
          <button
            id={String(habit.id)}
            className="absolute z-10 top-5 left-5 text-white hover:bg-red-600 font-medium text-sm p-3 py-3 bg-red-700"
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
          <button className="absolute z-10 top-5 left-20 text-white hover:bg-red-600 font-medium text-sm p-3 py-3 bg-red-700" type="button">
            <img className="h-6 w-6" src={getUrl("icons/pen-fill.svg")} alt="remove-icon" />
          </button>
        </>
      )}
    </div>
  );
};

export default CountUpCard;
