import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Head
    from 'next/head';
// Types definition
interface Nutrient {
    name: string;
    amount: number;
    unit: string;
    percentageOfDailyValue: number;
}

interface MacroNutrients {
    calories: number;
    protein: Nutrient;
    carbohydrates: Nutrient;
    fats: Nutrient;
    fiber: Nutrient;
}

interface MicroNutrients {
    iron: Nutrient;
    calcium: Nutrient;
    folicAcid: Nutrient;
    vitaminD: Nutrient;
    vitaminB12: Nutrient;
    zinc: Nutrient;
    omega3: Nutrient;
}

interface Meal {
    id: string;
    name: string;
    timeConsumed: string;
    macroNutrients: MacroNutrients;
    microNutrients: MicroNutrients;
    imageUrl?: string;
    notes?: string;
}

interface DailyTracking {
    date: string;
    meals: Meal[];
    totalMacros: MacroNutrients;
    totalMicros: MicroNutrients;
    waterIntake: number;
    targetMet: boolean;
}

interface WeeklyTracking {
    weekStartDate: string;
    weekEndDate: string;
    dailyTrackings: DailyTracking[];
    weeklyAverageMacros: MacroNutrients;
    weeklyAverageMicros: MicroNutrients;
    trimester: 1 | 2 | 3;
}

const formatDate = (dateString: string, format: 'day' | 'time') => {
    const date = new Date(dateString);
    if (format === 'day') {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

// Types remain the same...
const createNutrient = (name: string, amount: number, unit: string): Nutrient => ({
    name,
    amount,
    unit,
    percentageOfDailyValue: (amount / 100) * 100
});
// Sample data creation helpers remain the same...
const sampleWeeklyData: WeeklyTracking = {
    weekStartDate: '2024-02-23T00:00:00Z',
    weekEndDate: '2024-02-29T23:59:59Z',
    trimester: 2,
    dailyTrackings: Array.from({ length: 7 }, (_, index) => ({
        date: new Date(2024, 1, 23 + index).toISOString(),
        meals: [
            {
                id: `breakfast-${index}`,
                name: 'Breakfast',
                timeConsumed: new Date(2024, 1, 23 + index, 8, 0).toISOString(),
                macroNutrients: {
                    calories: 450,
                    protein: createNutrient('Protein', 20, 'g'),
                    carbohydrates: createNutrient('Carbs', 55, 'g'),
                    fats: createNutrient('Fats', 15, 'g'),
                    fiber: createNutrient('Fiber', 8, 'g')
                },
                microNutrients: {
                    iron: createNutrient('Iron', 8, 'mg'),
                    calcium: createNutrient('Calcium', 300, 'mg'),
                    folicAcid: createNutrient('Folic Acid', 200, 'mcg'),
                    vitaminD: createNutrient('Vitamin D', 5, 'mcg'),
                    vitaminB12: createNutrient('Vitamin B12', 0.8, 'mcg'),
                    zinc: createNutrient('Zinc', 3, 'mg'),
                    omega3: createNutrient('Omega-3', 50, 'mg')
                }
            },
            {
                id: `lunch-${index}`,
                name: 'Lunch',
                timeConsumed: new Date(2024, 1, 23 + index, 13, 0).toISOString(),
                macroNutrients: {
                    calories: 650,
                    protein: createNutrient('Protein', 30, 'g'),
                    carbohydrates: createNutrient('Carbs', 75, 'g'),
                    fats: createNutrient('Fats', 25, 'g'),
                    fiber: createNutrient('Fiber', 10, 'g')
                },
                microNutrients: {
                    iron: createNutrient('Iron', 10, 'mg'),
                    calcium: createNutrient('Calcium', 400, 'mg'),
                    folicAcid: createNutrient('Folic Acid', 250, 'mcg'),
                    vitaminD: createNutrient('Vitamin D', 6, 'mcg'),
                    vitaminB12: createNutrient('Vitamin B12', 1.2, 'mcg'),
                    zinc: createNutrient('Zinc', 4, 'mg'),
                    omega3: createNutrient('Omega-3', 75, 'mg')
                }
            }
        ],
        totalMacros: {
            calories: 2200,
            protein: createNutrient('Protein', 85, 'g'),
            carbohydrates: createNutrient('Carbs', 280, 'g'),
            fats: createNutrient('Fats', 75, 'g'),
            fiber: createNutrient('Fiber', 28, 'g')
        },
        totalMicros: {
            iron: createNutrient('Iron', 27, 'mg'),
            calcium: createNutrient('Calcium', 1000, 'mg'),
            folicAcid: createNutrient('Folic Acid', 600, 'mcg'),
            vitaminD: createNutrient('Vitamin D', 15, 'mcg'),
            vitaminB12: createNutrient('Vitamin B12', 2.6, 'mcg'),
            zinc: createNutrient('Zinc', 11, 'mg'),
            omega3: createNutrient('Omega-3', 200, 'mg')
        },
        waterIntake: 2400,
        targetMet: true
    })),
    weeklyAverageMacros: {
        calories: 2200,
        protein: createNutrient('Protein', 85, 'g'),
        carbohydrates: createNutrient('Carbs', 280, 'g'),
        fats: createNutrient('Fats', 75, 'g'),
        fiber: createNutrient('Fiber', 28, 'g')
    },
    weeklyAverageMicros: {
        iron: createNutrient('Iron', 27, 'mg'),
        calcium: createNutrient('Calcium', 1000, 'mg'),
        folicAcid: createNutrient('Folic Acid', 600, 'mcg'),
        vitaminD: createNutrient('Vitamin D', 15, 'mcg'),
        vitaminB12: createNutrient('Vitamin B12', 2.6, 'mcg'),
        zinc: createNutrient('Zinc', 11, 'mg'),
        omega3: createNutrient('Omega-3', 200, 'mg')
    }
};

// Sample weekly data remains the same...

const WeeklyNutritionTracker = ({ weeklyData = sampleWeeklyData }: { weeklyData?: WeeklyTracking }) => {
    const [selectedDay, setSelectedDay] = useState<DailyTracking>(weeklyData.dailyTrackings[0]);
    const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'trends'>('overview');

    const getNutrientChart = (dailyTracking: DailyTracking[]) => {
        const chartData = dailyTracking.map(day => ({
            date: formatDate(day.date, 'day'),
            protein: day.totalMacros.protein.amount,
            iron: day.totalMicros.iron.amount,
            calcium: day.totalMicros.calcium.amount,
        }));

        return (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="protein" stroke="#8b5cf6" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="iron" stroke="#10b981" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="calcium" stroke="#f59e0b" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    };

    return (
        <>
            <Head>
                <title>Weekly Nutrition Tracker</title>
            </Head>

            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <h1 className="text-xl font-semibold">Pregnancy Nutrition Tracker</h1>
                            <button
                                onClick={() => window.history.back()}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
                    <div className="mb-8">
                        {/* <h1 className="text-3xl font-bold text-slate-800 mb-2">
                            Pregnancy Nutrition Tracker
                        </h1> */}
                        <p className="text-slate-600">
                            Trimester {weeklyData.trimester} • Week of {new Date(weeklyData.weekStartDate).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex space-x-2 mb-6">
                        {(['overview', 'daily', 'trends'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab
                                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                                    : 'bg-white text-slate-600 hover:bg-violet-50'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Macronutrients Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Macronutrients</h3>
                                    <div className="space-y-4">
                                        {Object.entries(weeklyData.weeklyAverageMacros).map(([key, value]) => (
                                            key !== 'calories' && (
                                                <div key={key} className="flex items-center justify-between">
                                                    <span className="text-slate-600">{value.name}</span>
                                                    <span className="font-medium text-slate-800">
                                                        {value.amount}{value.unit}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>

                                {/* Micronutrients Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Micronutrients</h3>
                                    <div className="space-y-4">
                                        {Object.entries(weeklyData.weeklyAverageMicros).slice(0, 4).map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className="text-slate-600">{value.name}</span>
                                                <span className="font-medium text-slate-800">
                                                    {value.amount}{value.unit}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Water Intake Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Daily Water Intake</h3>
                                    <div className="relative h-48 bg-blue-50 rounded-xl overflow-hidden">
                                        <div
                                            className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-500"
                                            style={{ height: `${(selectedDay.waterIntake / 3000) * 100}%` }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <span className="text-3xl font-bold text-slate-800">
                                                    {selectedDay.waterIntake}
                                                </span>
                                                <span className="text-slate-600 ml-1">ml</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Daily View Tab */}
                        {activeTab === 'daily' && (
                            <div className="space-y-6">
                                {/* Day Selection */}
                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                    {weeklyData.dailyTrackings.map((day) => (
                                        <button
                                            key={day.date}
                                            onClick={() => setSelectedDay(day)}
                                            className={`px-6 py-3 rounded-xl transition-all ${selectedDay === day
                                                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                                                : 'bg-white text-slate-600 hover:bg-violet-50'
                                                }`}
                                        >
                                            {formatDate(day.date, 'day')}
                                        </button>
                                    ))}
                                </div>

                                {/* Meals List */}
                                <div className="grid gap-6">
                                    {selectedDay.meals.map((meal) => (
                                        <div
                                            key={meal.id}
                                            className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200"
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="text-xl font-semibold text-slate-800">{meal.name}</h4>
                                                <span className="text-slate-500">{formatDate(meal.timeConsumed, 'time')}</span>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h5 className="font-medium text-slate-700 mb-3">Macronutrients</h5>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-slate-600">Calories</span>
                                                            <span className="font-medium text-slate-800">{meal.macroNutrients.calories} kcal</span>
                                                        </div>
                                                        {Object.entries(meal.macroNutrients).map(([key, value]) => (
                                                            key !== 'calories' && (
                                                                <div key={key} className="flex justify-between items-center">
                                                                    <span className="text-slate-600">{value.name}</span>
                                                                    <span className="font-medium text-slate-800">
                                                                        {value.amount}{value.unit}
                                                                    </span>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="font-medium text-slate-700 mb-3">Micronutrients</h5>
                                                    <div className="space-y-2">
                                                        {Object.entries(meal.microNutrients).slice(0, 4).map(([key, value]) => (
                                                            <div key={key} className="flex justify-between items-center">
                                                                <span className="text-slate-600">{value.name}</span>
                                                                <span className="font-medium text-slate-800">
                                                                    {value.amount}{value.unit}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trends Tab */}
                        {activeTab === 'trends' && (
                            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200">
                                <h3 className="text-lg font-semibold text-slate-800 mb-6">Weekly Nutrient Trends</h3>
                                {getNutrientChart(weeklyData.dailyTrackings)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeeklyNutritionTracker;