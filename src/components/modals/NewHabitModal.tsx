import React, { useState } from "react";

type Habits = {
  type: string;
  name: string;
  start?: number;
  startDate?: Date;
  count?: number[];
  progress?: Date | number | number[];
  goal?: Date | number;
};

type Props = {
  habits: Habits[];
  setHabits: React.Dispatch<React.SetStateAction<Habits[]>>;
  getUrl: (value: string) => string;
};

const NewHabitModal = ({ habits, setHabits, getUrl }: Props) => {
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [newHabit, setNewHabit] = useState<Habits | undefined>();

  const [countName, setCountName] = useState<number>(0);
  const [bookGoal, setBookGoal] = useState<number>(0);
  const [waterGoal, setWaterGoal] = useState<number>(0);
  const [calGoal, setCalGoal] = useState<number>(0);

  return (
    <>
      <button className="flex items-center gap-1 text-white hover:bg-blue-800 font-medium text-sm ps-5 pe-6 py-3 h-full bg-blue-600" type="button" onClick={() => setModalToggle(!modalToggle)}>
        <img className="h-5 w-5" src={getUrl("icons/plus.svg")} alt="add-icon" /> New Habit
      </button>

      {modalToggle && (
        <div
          id="modal-bg"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-start w-full h-full  bg-slate-900 bg-opacity-50"
          onClick={(e) => (e.target as HTMLDivElement).id === "modal-bg" && setModalToggle(false)}
        >
          <div className="mt-10 w-full max-w-2xl max-h-full border">
            <div className="bg-white shadow">
              <div className="flex items-center justify-between p-5">
                <h3 className="text-xl font-semibold text-black">Create a new habit</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setModalToggle(false)}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="px-5 space-y-4">
                <div className="flex gap-2">
                  <span
                    className={`py-2 px-4 border-2 border-blue-500 text-black cursor-pointer font-bold ${selected === 0 && "bg-blue-500 text-white"}`}
                    onClick={() => {
                      setSelected(0);
                    }}
                  >
                    Read a Book
                  </span>
                  <span
                    className={`py-2 px-4 border-2 border-blue-500 text-black cursor-pointer font-bold ${selected === 1 && "bg-blue-500 text-white"}`}
                    onClick={() => {
                      setSelected(1);
                    }}
                  >
                    Water Intake
                  </span>
                  <span
                    className={`py-2 px-4 border-2 border-blue-500 text-black cursor-pointer font-bold ${selected === 2 && "bg-blue-500 text-white"}`}
                    onClick={() => {
                      setSelected(2);
                    }}
                  >
                    Count Up
                  </span>
                  <span
                    className={`py-2 px-4 border-2 border-blue-500 text-black cursor-pointer font-bold ${selected === 3 && "bg-blue-500 text-white"}`}
                    onClick={() => {
                      setSelected(3);
                    }}
                  >
                    Calory Intake
                  </span>
                </div>
                <div>
                  {selected === 0 || selected === 1 || selected === 3 ? (
                    <>
                      <span>Goal</span>
                      <input
                        className="w-full p-3 bg-white border"
                        type="text"
                        placeholder="Enter amount..."
                        onChange={(e) => {
                          if (selected === 0) {
                            // setBookGoal(e.target.value);
                            setNewHabit({ name: "Read a Book", type: "reading", start: 0, progress: 0, goal: Number(e.target.value) });
                          }

                          if (selected === 1) {
                            // setWaterGoal(e.target.value);
                            setNewHabit({ name: "Water Intake", type: "water-intake", start: 0, goal: Number(e.target.value), progress: 0 });
                          }

                          if (selected === 3) {
                            // setCalGoal(e.target.value);
                            setNewHabit({ name: "Calory Intake", type: "meal", start: 0, progress: [1200, 820, 600], goal: Number(e.target.value) });
                          }
                        }}
                      />
                    </>
                  ) : (
                    ""
                  )}

                  {selected === 2 ? (
                    <>
                      <span>Name</span>
                      <input
                        className="w-full p-3 bg-white border"
                        type="text"
                        placeholder="Enter counter name..."
                        onChange={(e) => {
                          // setCountName(e.target.value);
                          setNewHabit({ name: e.target.value, type: "count-up", startDate: new Date(), goal: new Date() });
                        }}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 p-5">
                <button
                  className="text-white hover:bg-blue-800 font-medium text-sm px-5 py-3 h-full bg-blue-600"
                  onClick={() => {
                    setHabits([...habits, newHabit]);
                    setModalToggle(false);
                  }}
                >
                  Create
                </button>
                <button className="text-white hover:bg-red-800 font-medium text-sm px-5 py-3 h-full bg-red-600" onClick={() => setModalToggle(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewHabitModal;
