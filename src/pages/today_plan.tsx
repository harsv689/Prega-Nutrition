// pages/todays-plan.js
import React, { useState } from 'react';
import { Clock, Droplets, UtensilsCrossed, Bell, CheckCircle, Circle } from 'lucide-react';
import Head from 'next/head';

export default function TodaysPlanPage() {
  const [completedMeals, setCompletedMeals] = useState(['breakfast']);
  const [waterIntake, setWaterIntake] = useState(750);
  
  const meals = [
    {
      id: 'breakfast',
      time: '08:00',
      name: 'Breakfast',
      items: [
        { name: 'Oatmeal with Berries', calories: 280, protein: '8g' },
        { name: 'Greek Yogurt', calories: 120, protein: '12g' },
        { name: 'Honey', calories: 60, protein: '0g' }
      ],
      totalCalories: 460,
      totalProtein: '20g'
    },
    {
      id: 'lunch',
      time: '13:00',
      name: 'Lunch',
      items: [
        { name: 'Grilled Chicken Salad', calories: 350, protein: '28g' },
        { name: 'Whole Grain Bread', calories: 120, protein: '4g' },
        { name: 'Olive Oil Dressing', calories: 120, protein: '0g' }
      ],
      totalCalories: 590,
      totalProtein: '32g'
    },
    {
      id: 'dinner',
      time: '19:00',
      name: 'Dinner',
      items: [
        { name: 'Salmon Fillet', calories: 360, protein: '34g' },
        { name: 'Brown Rice', calories: 220, protein: '5g' },
        { name: 'Steamed Vegetables', calories: 100, protein: '4g' }
      ],
      totalCalories: 680,
      totalProtein: '43g'
    }
  ];

  const waterGoal = 2000; // ml
  const waterProgress = (waterIntake / waterGoal) * 100;

  const reminders = [
    { time: '10:30', text: 'Morning Water Break' },
    { time: '15:30', text: 'Afternoon Snack' },
    { time: '17:00', text: 'Evening Water Break' }
  ];

  const toggleMealCompletion = (mealId : string) => {
    setCompletedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const addWater = (amount : number) => {
    setWaterIntake(prev => Math.min(waterGoal, Math.max(0, prev + amount)));
  };

  return (
    <>
      <Head>
        <title>Today&apos;s Plan</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-500" />
                <h1 className="text-xl font-semibold">Today&apos;s Plan</h1>
              </div>
              <button 
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Water Tracking Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="text-blue-500" />
                <h2 className="text-xl font-semibold">Water Intake</h2>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-500">{waterIntake}ml</p>
                <p className="text-sm text-gray-500">of {waterGoal}ml goal</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, waterProgress)}%` }}
              />
            </div>
            <div className="flex gap-2 justify-center">
              {[250, 500].map(amount => (
                <button
                  key={amount}
                  onClick={() => addWater(amount)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  +{amount}ml
                </button>
              ))}
            </div>
          </div>

          {/* Meals Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="text-green-500" />
              <h2 className="text-xl font-semibold">Meals</h2>
            </div>
            <div className="space-y-6">
              {meals.map((meal) => (
                <div key={meal.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleMealCompletion(meal.id)}
                        className="text-gray-400 hover:text-green-500"
                      >
                        {completedMeals.includes(meal.id) ? 
                          <CheckCircle className="text-green-500" /> : 
                          <Circle />
                        }
                      </button>
                      <div>
                        <h3 className="font-semibold">{meal.name}</h3>
                        <p className="text-sm text-gray-500">{meal.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{meal.totalCalories} cal</p>
                      <p className="text-sm text-gray-500">{meal.totalProtein} protein</p>
                    </div>
                  </div>
                  <div className="pl-10">
                    {meal.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm py-1">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="text-gray-500">{item.calories} cal</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reminders Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="text-purple-500" />
              <h2 className="text-xl font-semibold">Reminders</h2>
            </div>
            <div className="space-y-3">
              {reminders.map((reminder, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{reminder.time}</span>
                  <span className="text-gray-600">{reminder.text}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}