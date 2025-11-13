import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from "react-native";
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


  const PickerComponent = Picker as unknown as React.ComponentType<any>;
  const PickerItem: any = (Picker as any).Item;

  const handleSave = () => {
    if (!mealName || !description || !price) {
      Alert.alert("Missing Info", "Please fill in all fields before saving.");
      return;
    }

    addMeal({
      category, mealName, description, price: `R${price}`,
      id: ""
    });
    setMealName("");
    setDescription("");
    setPrice("");
    setCategory("Starter");
    Alert.alert("Success", "Meal added successfully!");
    navigation.navigate("Home");
  };

  return (
    //Image Background
    <ImageBackground
          source={require("@/images/back.jpg")}
          style={{ flex: 1, justifyContent: "center" }}
          resizeMode="cover"
        >
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <View style={styles.pickerWrapper}>
        <Text style={styles.label}>Course Type</Text>
        {/*course types*/}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.picker}
            dropdownIconColor="#1E73BE" 
          >
            <Picker.Item label="Starter" value="Starter" />
            <Picker.Item label="Main" value="Main" />
            <Picker.Item label="Dessert" value="Dessert" />
          </Picker>
        </View>
      </View>

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 15,
    color: "#fff", 
  },
  input: {
    borderWidth: 1,
    borderColor: "#1E73BE",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: "#000",
    backgroundColor: "#f8f8f8",
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
   pickerWrapper: { 
    marginBottom: 15 
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#1E73BE",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f8f8f8", 
  },
  picker: {
    color: "#000", 
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: "900",
  },
});

export default AddMenuScreen;
