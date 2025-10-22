import React, { createContext, useContext, useState, ReactNode } from "react";

export type Meal = {
  id: string;
  category: string;
  mealName: string;
  description: string;
  price: string;
};

type MealsContextType = {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, "id">) => void;
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export const MealsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const addMeal = (meal: Omit<Meal, "id">) => {
    setMeals((prev) => [...prev, { id: Date.now().toString(), ...meal }]);
  };

  return (
    <MealsContext.Provider value={{ meals, addMeal }}>
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = (): MealsContextType => {
  const context = useContext(MealsContext);
  if (!context) throw new Error("useMeals must be used within a MealsProvider");
  return context;
};
