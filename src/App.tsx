import WelcomeModal from "./components/modals/WelcomeModal";
import MainTab from "./tabs/mainTab/MainTab";

import { useState } from "react";

//! IMPLEMENT EDIT
function App() {
  const [username, setUsername] = useState<string>(localStorage.getItem("name") || "Guest");

  const getUrl = (fileName: string): string => new URL(`/public/${fileName}`, import.meta.url).href;

  return (
    <>
      <div className="flex flex-col mx-auto">
        <nav className="sticky top-0 z-40 w-full h-[80px] px-7 flex flex-row gap-10 items-center border bg-white">
          <h2 className="text-4xl font-bold">haBit</h2>

          <div className="flex flex-row gap-5 font-semibold text-xl">
            {["Habit Tracker", "Todo List"].map((l, i) => (
              <span key={i} className="hover:underline cursor-pointer">
                {l}
              </span>
            ))}
          </div>
        </nav>

        <WelcomeModal username={username} setUsername={setUsername} />
        <MainTab username={username} getUrl={getUrl} />
      </div>
    </>
  );
}

export default App;
