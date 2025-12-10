// types.ts

export type Exercise = {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  time?: number;
  unilateral?: boolean;
};

export type Workout = {
  id: string;
  name: string;
  exercises: Exercise[];
};
