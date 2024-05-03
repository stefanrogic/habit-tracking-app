import { useEffect, useState } from "react";

type Habits = {
  id: number;
  type: string;
  name: string;
  start?: Date;
  count?: number[];
  goal: Date;
  progress: number;
};

type Props = {
  habit: Habits;
  getUrl: (value: string) => string;
};

const CountUpCard = ({ habit, getUrl }: Props) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const [progress, setProgress] = useState<number>(() => {
    const gap = Date.now() - habit.start;
    const daysGap = Math.floor(gap / day);

    return daysGap;
  });

  const [goal] = useState<number | boolean>(() => {
    if (habit.goal) {
      const gap = habit.goal - Date.now();
      const daysGap = Math.floor(gap / day);

      return daysGap;
    } else return false;
  });

  const renderProgress = (): string => {
    const gap = Date.now() - habit.start;
    const daysGap = Math.floor(gap / day);
    const hoursGap = Math.floor((gap % day) / hour);
    const minutesGap = Math.floor((gap % hour) / minute);
    const secondsGap = Math.floor((gap % minute) / second);

    return `${daysGap}d ${hoursGap}h ${minutesGap}m ${secondsGap}s`;
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
      {goal && <div className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-red-500" style={{ height: Math.abs((progress / goal) * 100) + "%" }}></div>}
    </div>
  );
};

export default CountUpCard;
