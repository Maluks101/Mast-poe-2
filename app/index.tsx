import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useMeals } from "@/components/MealsContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  "Add Menu": undefined;
  Courses: undefined;
};

const Index = () => {
  const { meals, deleteMeal } = useMeals();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const averages = useMemo(() => {
    const categories = ["Starter", "Main", "Dessert"];
    const result: Record<string, number> = {};

    categories.forEach((cat) => {
      const filtered = meals.filter((m) => m.category === cat);
      if (filtered.length > 0) {
        const total = filtered.reduce(
          (sum, m) => sum + parseFloat(m.price.replace("R", "")),
          0
        );
        result[cat] = total / filtered.length;
      } else {
        result[cat] = 0;
      }
    });

    return result;
  }, [meals]);

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


        <View style={styles.avgContainer}>
          <Text style={styles.avgText}>Average Prices:</Text>
          <Text style={styles.avgLine}>Starters: R{averages.Starter.toFixed(2)}</Text>
          <Text style={styles.avgLine}>Mains: R{averages.Main.toFixed(2)}</Text>
          <Text style={styles.avgLine}>Desserts: R{averages.Dessert.toFixed(2)}</Text>
        </View>

        {/* Menu */}
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.category}>
                {item.category} - {item.description}
              </Text>
              <Text style={styles.meal}>{item.mealName}</Text>
              <Text style={styles.price}>Price: {item.price}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteMeal(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
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
    fontSize: 18,
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
    fontWeight: "600",
  },
  meal: {
    marginTop: 5,
  },
  price: {
    textAlign: "right",
    fontWeight: "600",
    marginTop: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#d9534f",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
  },
  avgContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  avgText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  avgLine: {
    color: "#fff",
  },
});

export default Index;
