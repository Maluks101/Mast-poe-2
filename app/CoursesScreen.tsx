import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useMeals } from "@/components/MealsContext";

const CoursesScreen: React.FC = () => {
  const { meals } = useMeals();
  const [filter, setFilter] = useState<string>("All");

  const filteredMeals = filter === "All" ? meals : meals.filter((m) => m.category === filter);

  // Cast Picker to a React component type so TypeScript accepts it in JSX
  const PickerComponent = Picker as unknown as React.ComponentType<any>;
  const PickerItem: any = (Picker as any).Item;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>

      <PickerComponent selectedValue={filter} onValueChange={(value: string) => setFilter(value)} style={styles.input}>
        <PickerItem label="All" value="All" />
        <PickerItem label="Starter" value="Starter" />
        <PickerItem label="Main" value="Main" />
        <PickerItem label="Dessert" value="Dessert" />
      </PickerComponent>

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
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#8c90f9ff" 
  },
  title: { fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "center",
    marginBottom: 10 
  },
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
  category: { 
    fontWeight: "600" 
  },
  price: { 
    textAlign: "right", 
    fontWeight: "600" 
  },
});

export default CoursesScreen;
