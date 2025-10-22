import { MealsProvider } from "@/components/MealsContext"
import index from "@/app/index"
import AddMenuScreen from "@/app/AddMenuScreen";
import CoursesScreen from "@/app/CoursesScreen";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <MealsProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#1E73BE",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { paddingBottom: 5, height: 60 },
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Add Menu") iconName = "add-circle";
            else if (route.name === "Courses") iconName = "restaurant";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={index} />
        <Tab.Screen name="Add Menu" component={AddMenuScreen} />
        <Tab.Screen name="Courses" component={CoursesScreen} />
      </Tab.Navigator>
    </MealsProvider>
  );
};

export default App;
