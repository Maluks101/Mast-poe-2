import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useMeals } from "@/components/MealsContext"

const CoursesScreen = () => {
  const { meals } = useMeals();
  const [filter, setFilter] = useState("All");

  const filteredMeals =
    filter === "All" ? meals : meals.filter((m) => m.category === filter);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>

      <Picker selectedValue={filter} onValueChange={setFilter} style={styles.input}>
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.category}>{item.category}</Text>
            <Text>{item.mealName}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  category: { fontWeight: "600" },
  price: { textAlign: "right", fontWeight: "600" },
});

export default CoursesScreen;
