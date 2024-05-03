import { useState } from "react";

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
  const [progress] = useState<number>(() => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const gap = Date.now() - habit.start;
    const daysGap = Math.floor(gap / day);

    return daysGap;
  });

  //   const renderProgress = (type: string, start?: Date): number | string | undefined => {
  //     const second = 1000;
  //     const minute = second * 60;
  //     const hour = minute * 60;
  //     const day = hour * 24;

  //     const gap = Date.now() - start;
  //     const daysGap = Math.floor(gap / day);
  //     const hoursGap = Math.floor((gap % day) / hour);
  //     const minutesGap = Math.floor((gap % hour) / minute);
  //     const secondsGap = Math.floor((gap % minute) / second);

  // return `${daysGap}D ${hoursGap}H ${minutesGap}M ${secondsGap}S`;
  //   };

  console.log(progress);

  console.log((progress / habit.goal) * 100);

  return (
    <div className="relative bg-yellow-900 aspect-[1/1] flex flex-col justify-start items-end">
      <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{Math.round((progress / Date.now()) * 100)}%</span>
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">{habit.name}</span>
      <div className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-blue-500" style={{ height: (progress / habit.goal) * 100 + "%" }}></div>
    </div>
  );
};

export default CountUpCard;
