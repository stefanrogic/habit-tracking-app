import WaterIndicator from "./WaterIndicator";

type Props = {
  goal: number;
  progress: number;
};

const WaterIntakeCard = ({ goal, progress }: Props) => {
  return (
    <div className="relative bg-blue-200 aspect-[1/1] flex flex-col justify-start items-end">
      <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{Math.round((progress / goal) * 100)}%</span>
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">Water Intake</span>
      <div className="absolute z-20 right-5 bottom-6 flex flex-col flex-wrap-reverse gap-2 h-[73%]">
        {Array(goal)
          .fill(0)
          .map((_, i: number) => (
            <WaterIndicator key={i} select={i + 1 <= goal ? true : false} />
          ))}
      </div>
      <div className="absolute z-10 bottom-0 w-full flex flex-col justify-start items-end bg-blue-500" style={{ height: (progress / goal) * 100 + "%" }}></div>
    </div>
  );
};

export default WaterIntakeCard;
