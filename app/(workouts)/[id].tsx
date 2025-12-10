import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { Workout } from "../types";

export default function EditWorkout() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const loadWorkout = async () => {
      const saved: Workout[] = JSON.parse(localStorage.getItem("workouts") || "[]");

      const found = saved.find((w) => w.id === id) || null;

      setWorkout(found);
    };

    loadWorkout();
  }, [id]);

  const saveWorkout = () => {
    const saved: Workout[] = JSON.parse(localStorage.getItem("workouts") || "[]");

    const updated = saved.map((w) => (w.id === id ? workout! : w));

    localStorage.setItem("workouts", JSON.stringify(updated));

    router.back();
  };

  if (!workout) return <Text>Loading…</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Editing: {workout.name}</Text>

      <TextInput
        value={workout.name}
        onChangeText={(text) => setWorkout({ ...workout, name: text })}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          marginVertical: 12,
          borderRadius: 6,
        }}
      />

      <Button title="Save Workout" onPress={saveWorkout} />
    </View>
  );
}

