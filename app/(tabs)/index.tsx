import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkoutContext } from "../context/WorkoutContext";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function HomeScreen() {
  const router = useRouter();
  const { weeklyPlan } = useWorkoutContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Workout Planner</Text>

      <FlatList
        data={DAYS}
        keyExtractor={(d) => d}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dayBox}
            onPress={() => router.push(`/select-workout?day=${item}`)}
          >
            <Text style={styles.dayName}>{item}</Text>
            <Text style={styles.workoutName}>
              {weeklyPlan[item]
                ? weeklyPlan[item].name
                : "Tap to assign workout"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { 
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dayBox: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },
  dayName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  workoutName: {
    marginTop: 4,
    color: "#555",
  },
});
