import React from "react";
import { useRouter } from "next/router";
import {
  Camera,
  Plus,
  BookOpen,
  Share,
  Bell,
  ShoppingCart,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react";
import Head from "next/head";

const CTAButtons = () => {
  const router = useRouter();
  return (
    <>
    <Head>
      <title>PregaNutrition</title>
    </Head>

    <div className="flex flex-col gap-8 p-6 bg-white rounded-lg shadow-lg">
      {/* Primary Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Primary Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors w-full" onClick={() => router.push("/log_this_meal")}>
            <Camera size={24} />
            <span className="font-semibold">Log Your Meal Now</span>
          </button>

          <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors w-full" onClick={() => router.push("/water_intake")}>
            <Plus size={24} />
            <span className="font-semibold">Track Water Intake</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4" onClick={() => router.push("/today_plan")}>
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <BookOpen size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-600">View Today's Plan</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors" onClick={() => router.push("/share_with_doctor")}>
            <Share size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-600" >Share with Doctor</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors" onClick={() => router.push("/set_reminder")}>
            <Bell size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-600" >Set Reminders</span>
          </button>

          {/* <button className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Calendar size={24} className="text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-600">Schedule Check-up</span>
          </button> */}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Feature Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push("/grocery_recommendation")}>
            <ShoppingCart size={24} className="text-purple-600 mr-3" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Shopping List</h3>
              <p className="text-sm text-gray-600">Get personalized grocery recommendations</p>
            </div>
            <ArrowRight size={20} className="text-purple-600" />
          </div>

          <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push("/meal_timeline")}>
            <Clock size={24} className="text-green-600 mr-3" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Meal Timeline</h3>
              <p className="text-sm text-gray-600">Track your eating schedule</p>
            </div>
            <ArrowRight size={20} className="text-green-600" />
          </div>

          <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:shadow-md transition-shadow cursor-pointer"onClick={() => router.push("/weekly_nutrition_tracker")}>
            <FileText size={24} className="text-red-600 mr-3" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">Weekly Report</h3>
              <p className="text-sm text-gray-600">View your nutrition insights</p>
            </div>
            <ArrowRight size={20} className="text-red-600" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CTAButtons;
