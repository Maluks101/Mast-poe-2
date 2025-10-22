import React from "react";
import { View, Text, FlatList, StyleSheet,ImageBackground} from "react-native";
import { useMeals } from "@/components/MealsContext" ;
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  "Add Menu": undefined;
  Courses: undefined;
};

const index = () => {
  const { meals } = useMeals();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require("@/images/back.jpg")}
      style={{ flex: 1, justifyContent: "center" }}
      resizeMode="cover"
    >
    <View style={styles.container}>
      <Text style={styles.title}>Original Beef</Text>
      <Text style={styles.subtitle}>Menu Items</Text>
      <Text style={styles.totalText}>Total Dishes: {meals.length}</Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.category}>
              {item.category} - {item.description}
            </Text>
            <Text style={styles.meal}>{item.mealName}</Text>
            <Text style={styles.price}>Price: {item.price}</Text>
          </View>
        )}
      />
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
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginVertical: 10,
    color: "#fff",
  },
  subtitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 10,
    color: "#fff",
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
  meal: { 
    marginTop: 5 
  },
  price: { 
    textAlign: "right", 
    fontWeight: "600", 
    marginTop: 5 
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 60,
  },
   totalText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },
});

export default index;
