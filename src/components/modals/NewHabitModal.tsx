import React, { useState } from "react";

type Habits = {
  type: string;
  name: string;
  start?: Date;
  count?: number[];
};

type Props = {
  habits: Habits[];
  setHabits: React.Dispatch<React.SetStateAction<Habits[]>>;
};

const NewHabitModal = ({ habits, setHabits }: Props) => {
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const [newHabit, setNewHabit] = useState<Habits | undefined>();

  return (
    <>
      <button className="text-white hover:bg-blue-800 font-medium text-sm px-5 py-3 h-full bg-blue-600" type="button" onClick={() => setModalToggle(!modalToggle)}>
        New Habit
      </button>

      {modalToggle && (
        <div aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-start w-full h-full  bg-slate-900 bg-opacity-50">
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
                  <span className="py-2 px-4 border-2 border-blue-500 text-black">Project</span>
                  <span className="py-2 px-4 border-2 border-blue-500 text-black">Water Intake</span>
                  <span className="py-2 px-4 border-2 border-blue-500 text-black">Alcohol Free</span>
                </div>
                <div>
                  <span>Goal</span>
                  <input className="w-full p-3 bg-white border" type="text" placeholder="Enter amount..." />
                </div>
              </div>

              <div className="flex items-center gap-4 p-5">
                <button
                  className="text-white hover:bg-blue-800 font-medium text-sm px-5 py-3 h-full bg-blue-600"
                  onClick={() => {
                    setHabits([...habits, { type: "count-times", name: "Water Intake", count: [1, 3, 5] }]);
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
