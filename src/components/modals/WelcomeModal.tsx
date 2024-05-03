import { useState } from "react";

type Props = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const WelcomeModal = ({ setUsername }: Props) => {
  const [input, setInput] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [modalToggle, setModalToggle] = useState<boolean>(localStorage.getItem("name") ? false : true);

  return (
    <>
      {modalToggle && (
        <div aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-start w-full h-full bg-slate-900 bg-opacity-50">
          <div className="mt-10 w-full max-w-2xl max-h-full border">
            <div className="bg-white shadow">
              <div className="flex items-center justify-between p-5 ">
                <h3 className="text-xl font-semibold text-black">Welcome to haBit</h3>
              </div>

              <div className="px-5 space-y-4">
                <input className="w-full p-3 bg-white border" type="text" placeholder="Please enter your name to continue..." onChange={(e) => setInput(e.target.value)} />
                <div className="flex gap-2">
                  <input type="checkbox" className="p-3 bg-white border" onClick={() => setCheck(!check)} />
                  <span>haBit can use localstorage on my browser</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 pt-14">
                <button
                  className="text-white hover:bg-slate-700 font-medium text-sm px-5 py-3 h-full bg-slate-900"
                  onClick={() => {
                    if (input.length > 0 && check) {
                      setUsername(input);
                      localStorage.setItem("name", input);
                      setModalToggle(false);
                    }
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeModal;
