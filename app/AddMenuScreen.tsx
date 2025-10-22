import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useMeals } from "@/components/MealsContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
};

const AddMenuScreen = () => {
  const [category, setCategory] = useState("Starter");
  const [mealName, setMealName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { addMeal } = useMeals();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Cast Picker to a React component type so TypeScript accepts it in JSX
  const PickerComponent = Picker as unknown as React.ComponentType<any>;
  const PickerItem: any = (Picker as any).Item;

  const handleSave = () => {
    if (!mealName || !description || !price) {
      Alert.alert("Missing Info", "Please fill in all fields before saving.");
      return;
    }

    addMeal({ category, mealName, description, price: `R${price}` });
    setMealName("");
    setDescription("");
    setPrice("");
    setCategory("Starter");
    Alert.alert("Success", "Meal added successfully!");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <PickerComponent
        selectedValue={category}
        onValueChange={(value: string) => setCategory(value)}
        style={styles.input}
      >
        <PickerItem label="Starter" value="Starter" />
        <PickerItem label="Main" value="Main" />
        <PickerItem label="Dessert" value="Dessert" />
      </PickerComponent>

      <TextInput
        placeholder="Meal Name"
        style={styles.input}
        value={mealName}
        onChangeText={setMealName}
      />
      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 80 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#8c90f9ff" 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 15 
  },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1E73BE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },
});

export default AddMenuScreen;
