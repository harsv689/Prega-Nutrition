// pages/reminder-settings.js
import React, { useState } from 'react';
import { Bell, Clock } from 'lucide-react';
import Head from 'next/head';

export default function ReminderSettingsPage() {
  const [waterReminders, setWaterReminders] = useState(['09:00', '13:00', '17:00']);
  const [mealReminders, setMealReminders] = useState(['08:00', '13:00', '19:00']);

  const addReminder = (type) => {
    if (type === 'water') {
      setWaterReminders([...waterReminders, '12:00']);
    } else {
      setMealReminders([...mealReminders, '12:00']);
    }
  };

  const removeReminder = (type, index) => {
    if (type === 'water') {
      setWaterReminders(waterReminders.filter((_, i) => i !== index));
    } else {
      setMealReminders(mealReminders.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <Head>
        <title>Reminder Settings</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-semibold">Reminders</h1>
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="text-blue-500" />
                <h2 className="text-xl font-semibold">Water Intake Reminders</h2>
              </div>
              <div className="space-y-4">
                {waterReminders.map((time, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => {
                        const newReminders = [...waterReminders];
                        newReminders[index] = e.target.value;
                        setWaterReminders(newReminders);
                      }}
                      className="px-4 py-2 border rounded-md"
                    />
                    <button 
                      onClick={() => removeReminder('water', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addReminder('water')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Water Reminder
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="text-green-500" />
                <h2 className="text-xl font-semibold">Meal Reminders</h2>
              </div>
              <div className="space-y-4">
                {mealReminders.map((time, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => {
                        const newReminders = [...mealReminders];
                        newReminders[index] = e.target.value;
                        setMealReminders(newReminders);
                      }}
                      className="px-4 py-2 border rounded-md"
                    />
                    <button 
                      onClick={() => removeReminder('meal', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addReminder('meal')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add Meal Reminder
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}