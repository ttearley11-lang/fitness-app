import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Workout } from "../types";

export default function SelectWorkout() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const load = async () => {
      const saved: Workout[] =
        JSON.parse(localStorage.getItem("workouts") || "[]");
      setWorkouts(saved);
    };

    load();
  }, []);

  const goToEdit = (id: string) => {
    router.push(`/workouts/${id}`);
  };

  const goToCreate = () => {
    router.push("/create-workout");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Select a Workout</Text>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => goToEdit(item.id)}
            style={{
              padding: 16,
              backgroundColor: "#eee",
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </Pressable>
        )}
      />

      <Pressable
        onPress={goToCreate}
        style={{
          padding: 16,
          backgroundColor: "#007AFF",
          borderRadius: 8,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Create New Workout
        </Text>
      </Pressable>
    </View>
  );
}
