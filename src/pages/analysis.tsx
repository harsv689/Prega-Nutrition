import React, { useState } from 'react';
import { Mic, Type, Camera, Plus, Check, X, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Head from 'next/head';
import { useRouter } from 'next/router';
// Types for our component
interface NutrientInfo {
    amount: number;
    unit: string;
    recommended: number;
    percentage: number;
}

interface FoodNutrients {
    calories: NutrientInfo;
    protein: NutrientInfo;
    carbs: NutrientInfo;
    fats: NutrientInfo;
    fiber: NutrientInfo;
    iron: NutrientInfo;
    calcium: NutrientInfo;
    vitaminC: NutrientInfo;
}

interface RecognizedFood {
    name: string;
    confidence: number;
    portionSize: string;
    estimatedWeight: number;
    nutrients: FoodNutrients;
}

// Sample data for demonstration
const sampleRecognizedFood: RecognizedFood = {
    name: "Grilled Chicken Salad",
    confidence: 92,
    portionSize: "Medium Bowl",
    estimatedWeight: 250,
    nutrients: {
        calories: { amount: 350, unit: 'kcal', recommended: 600, percentage: 58 },
        protein: { amount: 28, unit: 'g', recommended: 50, percentage: 56 },
        carbs: { amount: 15, unit: 'g', recommended: 75, percentage: 20 },
        fats: { amount: 12, unit: 'g', recommended: 20, percentage: 60 },
        fiber: { amount: 4, unit: 'g', recommended: 25, percentage: 16 },
        iron: { amount: 2.5, unit: 'mg', recommended: 27, percentage: 9 },
        calcium: { amount: 120, unit: 'mg', recommended: 1000, percentage: 12 },
        vitaminC: { amount: 45, unit: 'mg', recommended: 85, percentage: 53 }
    }
};

const suggestions = [
    {
        deficiency: "Iron",
        suggestions: ["Add spinach leaves", "Include some chickpeas", "Top with pumpkin seeds"],
        reason: "Your iron intake has been below recommended levels this week"
    },
    {
        deficiency: "Calcium",
        suggestions: ["Add feta cheese", "Include Greek yogurt dressing"],
        reason: "You're currently at 65% of your daily calcium goal"
    }
];

const FoodRecognitionPage = () => {
    const router = useRouter();
    const [isRecording, setIsRecording] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const getNutrientColor = (percentage: number) => {
        if (percentage < 30) return 'text-red-500';
        if (percentage < 70) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <>
            <Head>
                <title>Food Recognition</title>
            </Head>

            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <h1 className="text-xl font-semibold">Food Recognition</h1>
                            <button
                                className="text-gray-600 hover:text-gray-900" onClick={() => router.push("/")}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="max-w-4xl mx-auto p-6 bg-slate-50 min-h-screen">
                    {/* ML Recognition Results */}
                    <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl font-bold text-slate-800">Food Recognition Results</h1>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                {sampleRecognizedFood.confidence}% Confidence
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <img
                                    src="/api/placeholder/400/300"
                                    alt="Food"
                                    className="rounded-xl w-full object-cover mb-4"
                                />
                                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                                    <div>
                                        <h2 className="font-semibold text-slate-800">{sampleRecognizedFood.name}</h2>
                                        <p className="text-slate-600">Estimated: {sampleRecognizedFood.portionSize} ({sampleRecognizedFood.estimatedWeight}g)</p>
                                    </div>
                                    {!confirmed && (
                                        <div className="flex space-x-2">
                                            <button onClick={() => setConfirmed(true)} className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600">
                                                <Check size={20} />
                                            </button>
                                            <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
                                                <X size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-slate-800 mb-2">Nutritional Content</h3>
                                {Object.entries(sampleRecognizedFood.nutrients).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-2 border-b">
                                        <span className="capitalize text-slate-600">{key}</span>
                                        <div className="flex items-center space-x-4">
                                            <span className="font-medium">
                                                {value.amount}{value.unit}
                                            </span>
                                            <span className={`${getNutrientColor(value.percentage)}`}>
                                                {value.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Manual Addition Section */}
                    {!confirmed && (
                        <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-800 mb-4">
                                Add or Modify Items
                            </h2>
                            <div className="flex space-x-4 mb-4">
                                <button
                                    onClick={() => setIsRecording(!isRecording)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${isRecording ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-700'
                                        }`}
                                >
                                    <Mic size={20} />
                                    <span>{isRecording ? 'Recording...' : 'Voice Input'}</span>
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Type to add or modify items..."
                                        className="w-full px-4 py-2 rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-500">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Suggestions Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">
                            Nutrition Insights & Suggestions
                        </h2>
                        <div className="space-y-6">
                            {suggestions.map((item, index) => (
                                <div key={index} className="bg-slate-50 rounded-xl p-4">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="text-amber-500 mt-1" size={20} />
                                        <div>
                                            <h3 className="font-medium text-slate-800">{item.deficiency} Deficiency Alert</h3>
                                            <p className="text-slate-600 text-sm mb-3">{item.reason}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {item.suggestions.map((suggestion, i) => (
                                                    <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-slate-700">
                                                        {suggestion}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FoodRecognitionPage;