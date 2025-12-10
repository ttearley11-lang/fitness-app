import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkoutContext } from "./context/WorkoutContext";

export default function SelectWorkout() {
  const { day } = useLocalSearchParams();
  const { workouts, setWorkoutForDay } = useWorkoutContext();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Workout for {day}</Text>

      <FlatList
        data={workouts}
        keyExtractor={(w) => w.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.workoutBox}
            onPress={() => {
              setWorkoutForDay(day as string, item);
              router.back();
            }}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.exercises.length} exercises</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  workoutBox: {
    padding: 15,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 10,
  },
  name: { fontWeight: "bold", fontSize: 18 },
  meta: { color: "#555" },
});
