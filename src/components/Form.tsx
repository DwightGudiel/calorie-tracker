import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types/index";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value,
    });
  };

  const isValidAcivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-col-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:{" "}
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-col-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>

        <input
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          type="text"
          value={activity.name}
          onChange={handleChange}
          placeholder="Ej. Comida. Jugo de Naranja, Ejercicio, Pesas, Bícicleta"
        />
      </div>

      <div className="grid grid-col-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>

        <input
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          type="number"
          value={activity.calories}
          onChange={handleChange}
          placeholder="Calorias ej. 300 o 500"
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 text-white w-full p-2 font-bold uppercase cursor-pointer disabled:opacity-10"
        value={`${
          activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"
        }`}
        disabled={!isValidAcivity()}
      />
    </form>
  );
}

export default Form;
