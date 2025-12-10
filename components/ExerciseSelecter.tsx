import React, { useState } from "react";

type ExercisesByBodyPart = {
  [bodyPart: string]: string[];
};

type ExerciseSelectorProps = {
  onSelect?: (exerciseName: string, bodyPart: string) => void;
  onAdd?: (exerciseName: string, bodyPart: string) => void;
};

export default function ExerciseSelector({ onSelect, onAdd }: ExerciseSelectorProps) {
  const [search, setSearch] = useState("");

  const defaultExercises: ExercisesByBodyPart = {
    Chest: ["Bench Press", "Incline DB Press", "Chest Fly"],
    Back: ["Deadlift", "Lat Pulldown", "Barbell Row"],
    Legs: ["Squat", "Leg Press", "Hamstring Curl"],
    Shoulders: ["OHP", "Lateral Raise", "Rear Delt Fly"],
    Arms: ["Bicep Curl", "Tricep Pushdown", "Hammer Curl"],
    Core: ["Plank", "Cable Crunch", "Hanging Leg Raise"],
  };

  const [exercises, setExercises] = useState<ExercisesByBodyPart>(defaultExercises);

  const filteredExercises = Object.fromEntries(
    Object.entries(exercises).map(([bodyPart, list]) => [
      bodyPart,
      list.filter((ex) => ex.toLowerCase().includes(search.toLowerCase())),
    ])
  );

  const handleAdd = () => {
    const name = prompt("Enter new exercise name:");
    const part = prompt("Enter body part:");
    if (!name || !part) return;

    setExercises((prev) => ({
      ...prev,
      [part]: prev[part] ? [...prev[part], name] : [name],
    }));

    if (onAdd) onAdd(name, part);
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 rounded-xl border"
      />

      <button onClick={handleAdd} className="p-2 rounded-xl border w-full">
        Add New Exercise
      </button>

      {Object.entries(filteredExercises).map(([bodyPart, list]) => (
        <div key={bodyPart} className="mt-4">
          <h2 className="text-xl font-bold mb-2">{bodyPart}</h2>
          <div className="space-y-2">
            {list.length > 0 ? (
              list.map((ex) => (
                <button
                  key={ex}
                  onClick={() => onSelect && onSelect(ex, bodyPart)}
                  className="block w-full p-3 rounded-xl bg-gray-100"
                >
                  {ex}
                </button>
              ))
            ) : (
              <p className="text-gray-400">No matches</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
