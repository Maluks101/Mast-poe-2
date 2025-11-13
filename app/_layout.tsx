import { MealsProvider } from "@/components/MealsContext"
import index from "@/app/index"
import AddMenuScreen from "@/app/AddMenuScreen";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoursesScreen from "@/app/CoursesScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <MealsProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            borderTopWidth: 0,
          },
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
