import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkoutContext } from "../context/WorkoutContext";

export default function WorkoutsScreen() {
  const router = useRouter();
  const { workouts } = useWorkoutContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workouts</Text>

      <Button
        title="➕ Create Workout"
        onPress={() => router.push("/create-workout")}
      />

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workoutItem}
            onPress={() => router.push(`/workouts/${item.id}`)}   // ✅ HERE
          >
            <Text style={styles.workoutName}>{item.name}</Text>
            <Text style={styles.exerciseCount}>
              {item.exercises.length} exercises
            </Text>
          </TouchableOpacity>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  workoutItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  workoutName: { fontSize: 18, fontWeight: "bold" },
  exerciseCount: { color: "#555" },
});

