import { useState } from "react";

type Props = {
  meals: number[];
  setMeals: React.Dispatch<React.SetStateAction<number[]>>;
  getUrl: (value: string) => string;
};

const NewMealModal = ({ habits, habit, meals, setMeals, getUrl }: Props) => {
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const [meal, setMeal] = useState<number>(0);

  return (
    <>
      <button className="absolute z-10 top-5 left-5 text-white hover:bg-green-600 font-medium text-sm p-3 py-3 bg-green-700" type="button" onClick={() => setModalToggle(!modalToggle)}>
        <img className="h-6 w-6" src={getUrl("icons/plus.svg")} alt="add-icon" />
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
                <h3 className="text-xl font-semibold text-black">Add a meal</h3>
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

              <div className="flex flex-col gap-5 px-5">
                <div className="flex flex-col gap-2">
                  <span>Meal</span>
                  <input
                    className="w-full p-3 bg-white border"
                    type="number"
                    placeholder={`Enter number of calories you consumed...`}
                    onChange={(e) => {
                      setMeal(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 pt-14">
                <button
                  className="text-white hover:bg-slate-700 font-medium text-sm px-5 py-3 h-full bg-slate-900"
                  onClick={() => {
                    const newState = habits.map((h) => {
                      if (h.id === habit.id) {
                        return { ...h, progress: [...meals, Number(meal)] };
                      } else return h;
                    });
                    localStorage.setItem("habitData", JSON.stringify(newState));

                    setMeals([...meals, Number(meal)]);
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

export default NewMealModal;
