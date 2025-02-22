// pages/grocery-recommendations.js
import React, { useState } from 'react';
import { ShoppingCart, TrendingDown, Apple, Fish, Wheat, Carrot } from 'lucide-react';
import Head from 'next/head';

export default function GroceryRecommendationsPage() {
  // Sample nutrition data that would come from your backend
  const nutritionDeficits = {
    protein: { amount: -15, unit: 'g' },
    fiber: { amount: -8, unit: 'g' },
    iron: { amount: -2.5, unit: 'mg' },
    calcium: { amount: -200, unit: 'mg' }
  };

  const recommendations = [
    {
      category: 'Protein-Rich Foods',
      icon: Fish,
      items: [
        { name: 'Chicken Breast', amount: '500g', reason: 'Protein deficit' },
        { name: 'Greek Yogurt', amount: '500g', reason: 'Protein & calcium needs' },
        { name: 'Lentils', amount: '250g', reason: 'Protein & iron source' }
      ]
    },
    {
      category: 'Fruits & Vegetables',
      icon: Apple,
      items: [
        { name: 'Spinach', amount: '300g', reason: 'Iron deficit' },
        { name: 'Oranges', amount: '6 pcs', reason: 'Vitamin C for iron absorption' },
        { name: 'Bananas', amount: '6 pcs', reason: 'Potassium needs' }
      ]
    },
    {
      category: 'Grains & Fiber',
      icon: Wheat,  // Changed from Bread to Wheat
      items: [
        { name: 'Quinoa', amount: '500g', reason: 'Fiber & protein source' },
        { name: 'Oats', amount: '500g', reason: 'Fiber needs' },
        { name: 'Brown Rice', amount: '1kg', reason: 'Complex carbs' }
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Grocery Recommendations</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-semibold">Grocery Recommendations</h1>
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="text-red-500" />
              <h2 className="text-xl font-semibold">Nutrition Deficits This Week</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(nutritionDeficits).map(([nutrient, { amount, unit }]) => (
                <div key={nutrient} className="p-4 bg-red-50 rounded-lg">
                  <p className="text-gray-600 capitalize">{nutrient}</p>
                  <p className="text-xl font-bold text-red-600">{amount}{unit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {recommendations.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <category.icon className="text-green-500" />
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.amount}</p>
                        <button className="text-sm text-blue-500 hover:text-blue-700">
                          Add to list
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-6 right-6">
            <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600">
              <ShoppingCart size={24} />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}