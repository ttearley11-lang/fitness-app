import { createContext, ReactNode, useContext, useState } from "react";
import type { Workout } from "../types";

// Weekly plan type — each day can have a Workout or null
type WeeklyPlan = {
  [day: string]: Workout | null;
};

// Context shape
type WorkoutContextType = {
  workouts: Workout[];
  addWorkout: (w: Workout) => void;
  updateWorkout: (id: string, updated: Workout) => void;
  weeklyPlan: WeeklyPlan;
  setWorkoutForDay: (day: string, workout: Workout) => void;
};

// Create context with a safe default
const WorkoutContext = createContext<WorkoutContextType>(null as any);

// Provider component with properly typed children
export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
    Sunday: null,
  });

  // Add a workout
  const addWorkout = (workout: Workout) => {
    setWorkouts((prev) => [...prev, workout]);
  };

  // Update an existing workout
  const updateWorkout = (id: string, updated: Workout) => {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === id ? updated : w))
    );
  };

  // Assign a workout to a specific day
  const setWorkoutForDay = (day: string, workout: Workout) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [day]: workout,
    }));
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        addWorkout,
        updateWorkout,
        weeklyPlan,
        setWorkoutForDay,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

// Hook for using the context
export const useWorkoutContext = () => useContext(WorkoutContext);
