// pages/meal-timeline.js
import React from 'react';
import { Calendar } from 'lucide-react';
import Head from 'next/head';

export default function MealTimelinePage() {
  const mealHistory = [
    {
      date: '2024-02-23',
      meals: [
        { time: '08:30', type: 'Breakfast', calories: 450, items: ['Oatmeal', 'Banana', 'Coffee'] },
        { time: '13:00', type: 'Lunch', calories: 650, items: ['Chicken Salad', 'Whole Grain Bread'] },
        { time: '19:30', type: 'Dinner', calories: 550, items: ['Grilled Fish', 'Brown Rice', 'Vegetables'] }
      ]
    },
    {
      date: '2024-02-22',
      meals: [
        { time: '08:45', type: 'Breakfast', calories: 400, items: ['Yogurt', 'Granola', 'Apple'] },
        { time: '12:30', type: 'Lunch', calories: 600, items: ['Turkey Sandwich', 'Soup'] },
        { time: '20:00', type: 'Dinner', calories: 500, items: ['Pasta', 'Tomato Sauce', 'Salad'] }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Meal Timeline</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-semibold">Meal Timeline</h1>
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
          <div className="space-y-6">
            {mealHistory.map((day, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-500" size={20} />
                    <h2 className="text-lg font-semibold">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {day.meals.map((meal, mealIndex) => (
                      <div key={mealIndex} className="flex items-start gap-4">
                        <div className="w-20 text-gray-600">{meal.time}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{meal.type}</h3>
                            <span className="text-gray-600">{meal.calories} cal</span>
                          </div>
                          <ul className="mt-2 text-gray-600">
                            {meal.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}