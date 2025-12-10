import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import uuid from "react-native-uuid";
import { useWorkoutContext } from "./context/WorkoutContext";
import type { Exercise } from "./types";

export default function CreateWorkoutScreen() {
  const router = useRouter();
  const { addWorkout } = useWorkoutContext();

  const [name, setName] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        id: uuid.v4().toString(),
        name: "",
        sets: undefined,
        reps: undefined,
        weight: undefined,
        time: undefined,
        unilateral: false,
      },
    ]);
  };

  const updateExercise = (id: string, field: keyof Exercise, value: any) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const saveWorkout = () => {
    addWorkout({
      id: uuid.v4().toString(),
      name,
      exercises,
    });

    router.replace("/workouts");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a Workout</Text>

      <TextInput
        placeholder="Workout name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      {exercises.map((ex, i) => (
        <View key={ex.id} style={styles.exerciseBox}>
          <Text style={styles.exerciseTitle}>Exercise {i + 1}</Text>

          <TextInput
            placeholder="Name"
            style={styles.input}
            value={ex.name}
            onChangeText={(t) => updateExercise(ex.id, "name", t)}
          />

          <TextInput
            keyboardType="numeric"
            placeholder="Sets"
            style={styles.input}
            onChangeText={(t) => updateExercise(ex.id, "sets", Number(t))}
          />

          <TextInput
            keyboardType="numeric"
            placeholder="Reps"
            style={styles.input}
            onChangeText={(t) => updateExercise(ex.id, "reps", Number(t))}
          />

          <TextInput
            keyboardType="numeric"
            placeholder="Weight"
            style={styles.input}
            onChangeText={(t) => updateExercise(ex.id, "weight", Number(t))}
          />

          <TextInput
            keyboardType="numeric"
            placeholder="Time"
            style={styles.input}
            onChangeText={(t) => updateExercise(ex.id, "time", Number(t))}
          />
        </View>
      ))}

      <Button title="Add Exercise" onPress={addExercise} />
      <View style={{ height: 10 }} />
      <Button title="Save Workout" onPress={saveWorkout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  exerciseBox: {
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  exerciseTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});
