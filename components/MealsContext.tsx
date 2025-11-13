import React, { createContext, useContext, useState } from "react";

type Meal = {
  id: string;
  category: string;
  mealName: string;
  description: string;
  price: string;
};

type MealsContextType = {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  deleteMeal: (id: string) => void;
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export const MealsProvider = ({ children }: { children: React.ReactNode }) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (meal: Meal) => {
    setMeals((prev) => [...prev, { ...meal, id: Date.now().toString() }]);
  };

  const deleteMeal = (id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  return (
    <MealsContext.Provider value={{ meals, addMeal, deleteMeal }}>
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => {
  const context = useContext(MealsContext);
  if (!context) throw new Error("useMeals must be used within MealsProvider");
  return context;
};