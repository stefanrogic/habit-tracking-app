import WelcomeModal from "./components/modals/WelcomeModal";
import HomePage from "./pages/homePage/HomePage";

import { useState } from "react";

function App() {
  const [username, setUsername] = useState<string>(localStorage.getItem("name") || "Guest");
  const [terms, setTerms] = useState<boolean>(false);

  const getUrl = (fileName: string): string => new URL(`/public/${fileName}`, import.meta.url).href;

  return (
    <>
      <div className="flex flex-col mx-auto pb-20">
        <nav className="sticky top-0 z-40 w-full h-[80px] px-7 flex flex-row gap-10 items-center border bg-white">
          <h2 className="text-4xl font-bold">haBit</h2>

          <div className="flex flex-row items-center gap-3 ms-auto cursor-pointer">
            <span className="text-xl font-bold">{username}</span>
            <div className="h-8 w-8 bg-slate-400 rounded-full"></div>
            <img className="mt-1" src={getUrl("icons/caret-down-fill.svg")} alt="arrow-down" />
          </div>
        </nav>

        <WelcomeModal setUsername={setUsername} setTerms={setTerms} />
        <HomePage username={username} getUrl={getUrl} terms={terms} />
      </div>
    </>
  );
}

export default App;
