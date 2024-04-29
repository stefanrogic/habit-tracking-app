import { useState } from "react";

type Props = {
  select: boolean;
};

const WaterIndicator = ({ select }: Props) => {
  const [fill, setFill] = useState<boolean>(select ? true : false);

  return (
    <div
      className="h-4 w-4 rounded-full border-2 border-white cursor-pointer"
      style={{ backgroundColor: fill ? "#fff" : "transparent" }}
      onClick={() => {
        setFill(!fill);
      }}
    ></div>
  );
};

export default WaterIndicator;
