import WaterIntakeCard from "../homeCards/habitCards/WaterIntakeCard";

type Props = {
  getUrl: (value: string) => string;
};

const HabitsShort = ({ getUrl }: Props) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-end gap-5">
          <button className=" text-white hover:bg-blue-800 font-medium text-sm p-3 py-3 h-full bg-blue-600" type="button">
            <img className="h-5 w-5" src={getUrl("icons/gear-fill.svg")} alt="add-icon" />
          </button>
        </div>

        <div className="grid grid-cols-3 grid-flow-row gap-5">
          <WaterIntakeCard percent={30} />
          <WaterIntakeCard percent={53} />
          <WaterIntakeCard percent={75} />
        </div>
      </div>
    </div>
  );
};

export default HabitsShort;
