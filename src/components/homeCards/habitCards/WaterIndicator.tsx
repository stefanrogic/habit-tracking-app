import { useState } from "react";

type Props = {
  select: boolean;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const WaterIndicator = ({ select, progress, setProgress }: Props) => {
  const [fill, setFill] = useState<boolean>(select ? true : false);

  return (
    <div
      className="h-4 w-4 rounded-full border-2 border-white cursor-pointer"
      style={{ backgroundColor: fill ? "#fff" : "transparent" }}
      onClick={() => {
        setFill(!fill);

        if (!fill) {
          setProgress(progress + 1);
        } else {
          setProgress(progress - 1);
        }
      }}
    ></div>
  );
};

export default WaterIndicator;
