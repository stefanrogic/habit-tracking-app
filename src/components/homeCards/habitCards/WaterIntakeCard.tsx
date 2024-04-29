type Props = {
  percent: number;
};

const WaterIntakeCard = ({ percent }: Props) => {
  return (
    <div className="relative bg-blue-200 aspect-[1/1] flex flex-col justify-start items-end  cursor-pointer">
      <span className="absolute z-20 top-5 right-5 text-2xl text-white font-bold">{percent}%</span>
      <span className="absolute z-20 left-5 bottom-5 text-3xl text-white font-bold">Water Intake</span>
      <div className="absolute z-20 right-5 bottom-7 flex flex-col gap-2">
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-200"></div>
        <div className="h-4 w-4 rounded-full bg-slate-100"></div>
        <div className="h-4 w-4 rounded-full bg-slate-100"></div>
      </div>
      <div className={`absolute z-10 bottom-0 w-full h-[${percent}%] flex flex-col justify-start items-end bg-blue-500 cursor-pointer`}></div>
    </div>
  );
};

export default WaterIntakeCard;
