import { useState } from "react";
import NewHabitModal from "../../components/modals/NewHabitModal";

type Habits = {
  type: string;
  name: string;
  start?: Date;
  count?: number[];
};

type Props = {
  getUrl: (value: string) => string;
};

const HabitTracker = ({ getUrl }: Props) => {
  const [habits, setHabits] = useState<Habits[]>([
    { type: "count-hours", name: "Working on a super secret project", start: new Date("17-Apr-24") },
    { type: "count-days", name: "Alcohol Free", start: new Date("10-Apr-24") },
    { type: "count-times", name: "Water Intake", count: [1, 3, 5] },
  ]);

  const renderProgress = (type: string, start?: Date, count?: number[]): number | string | undefined => {
    if (type === "count-days" || type === "count-hours") {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const gap = Date.now() - start;
      const daysGap = Math.floor(gap / day);
      const hoursGap = Math.floor((gap % day) / hour);
      const minutesGap = Math.floor((gap % hour) / minute);
      const secondsGap = Math.floor((gap % minute) / second);

      return `${daysGap === 1 ? daysGap + " Day" : daysGap + " Days"} ${hoursGap === 1 ? hoursGap + " Hour" : hoursGap + " Hours"} ${minutesGap === 1 ? minutesGap + " Minute" : minutesGap + " Minutes"} ${
        secondsGap === 1 ? secondsGap + " Second" : secondsGap + " Seconds"
      }`;
    }

    if (type === "count-times") {
      return count?.reduce((acc, s) => (acc += s), 0) + " Glasses";
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <div className="flex flex-row gap-2">
          <NewHabitModal habits={habits} setHabits={setHabits} getUrl={getUrl} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {habits.length === 0 && <p>List is empty</p>}

        <div className="grid grid-cols-3 grid-flow-row gap-5">
          {habits.map((h: Habits, i: number) => {
            if (h.type === "count-days" || h.type === "count-hours") {
              return (
                <div key={i} className=" border border-gray-200 shadow bg-slate-800 dark:border-gray-700">
                  <div className="flex justify-center items-center h-[200px] p-10 bg-white relative">
                    <div className="opacity-0 hover:opacity-100 flex justify-center items-center h-[200px] w-full bg-black bg-opacity-70 top-0 absolute z-30 cursor-pointer">
                      <p className="text-3xl">RESET</p>
                    </div>
                    <span className="text-slate-900 text-center text-xl font-semibold">{renderProgress(h.type, h.start)}</span>
                  </div>

                  <div className="flex flex-col items-center gap-10 p-5">
                    <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{h.name}</h5>

                    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                      REMOVE
                    </button>
                  </div>
                </div>
              );
            }

            if (h.type === "count-times") {
              return (
                <div key={i} className="bg-white border border-gray-200 shadow dark:bg-slate-800 dark:border-gray-700">
                  <div className="flex justify-center items-center h-[200px] bg-white relative">
                    <div className="opacity-0 hover:opacity-100 flex flex-col gap-5 justify-center items-center h-[200px] w-full bg-black bg-opacity-70 top-0 absolute z-30 cursor-pointer">
                      <p className="text-3xl">RESET</p>
                      <p className="text-3xl">INCREASE</p>
                    </div>
                    <span className="text-slate-900 text-center text-2xl font-semibold flex flex-col justify-center items-center gap-5">
                      <img className="w-10 h-10" src={getUrl("cup-straw.svg")} alt="icon" /> {renderProgress(h.type, undefined, h.count)}
                    </span>
                  </div>

                  <div className="flex flex-col items-center p-5 gap-10">
                    <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{h.name}</h5>

                    <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                      REMOVE
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
