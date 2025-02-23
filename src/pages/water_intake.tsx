import React, { useState } from 'react';
import { Plus, Minus, Droplets } from 'lucide-react';
import Head from 'next/head';
const WaterTrackingPage = () => {
    const [waterIntake, setWaterIntake] = useState(0);
    const [goal] = useState(2000); // Default goal of 2000ml

    const addWater = (amount : number) => {
        setWaterIntake(prev => Math.max(0, prev + amount));
    };

    const progressPercentage = (waterIntake / goal) * 100;

    return (
        <>
            <Head>
                <title>Track Water Intake</title>
            </Head>

            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <h1 className="text-xl font-semibold">Track Water Intake</h1>
                            <button
                                onClick={() => window.history.back()}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="p-6 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Track Water Intake</h1>

                    {/* Progress Card */}
                    <div className="bg-white rounded-lg shadow-md mb-6 p-6">
                        <div className="mb-4">
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <Droplets className="text-blue-500" />
                                Daily Progress
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="text-center mb-4">
                                <span className="text-4xl font-bold">{waterIntake}</span>
                                <span className="text-gray-500 ml-2">/ {goal}ml</span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                                <div
                                    className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(100, progressPercentage)}%` }}
                                />
                            </div>

                            <div className="flex gap-4 justify-center mb-6">
                                <button
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    onClick={() => addWater(-250)}
                                >
                                    <Minus size={16} />
                                    250ml
                                </button>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                    onClick={() => addWater(250)}
                                >
                                    <Plus size={16} />
                                    250ml
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {[100, 200, 500].map(amount => (
                                    <button
                                        key={amount}
                                        className="w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                        onClick={() => addWater(amount)}
                                    >
                                        +{amount}ml
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* History Card */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">History</h2>
                        </div>
                        <div className="px-4">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span>Today</span>
                                    <span className="font-medium">{waterIntake}ml</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b text-gray-500">
                                    <span>Yesterday</span>
                                    <span className="font-medium">1850ml</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WaterTrackingPage;