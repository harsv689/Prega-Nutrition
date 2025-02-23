// pages/share-with-doctor.js
import React, { useState } from 'react';
import { Download, Mail, Phone, Copy, FileText, Check } from 'lucide-react';
import Head from 'next/head';

export default function ShareWithDoctorPage() {
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [shareMethod, setShareMethod] = useState(null);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Nutritionist', lastShared: '2024-02-15' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'General Physician', lastShared: '2024-02-20' },
    { id: 3, name: 'Dr. Emily Williams', specialty: 'Dietitian', lastShared: null }
  ];

  const reportSections = [
    { id: 'nutrition', label: 'Nutrition Summary', selected: true },
    { id: 'water', label: 'Water Intake', selected: true },
    { id: 'meals', label: 'Meal Timeline', selected: true },
    { id: 'exercise', label: 'Exercise Log', selected: false },
    { id: 'medications', label: 'Medications', selected: false }
  ];

  const handleShare = (method) => {
    setIsSharing(true);
    setShareMethod(method);
    
    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Share with Doctor</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-semibold">Share with Doctor</h1>
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
            {/* Preview Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-blue-500" />
                <h2 className="text-xl font-semibold">Report Preview</h2>
              </div>
              <div className="space-y-4">
                {reportSections.map((section) => (
                  <div key={section.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={section.selected}
                      className="h-4 w-4 text-blue-500 rounded"
                    />
                    <span>{section.label}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">
                Preview Report
              </button>
            </div>

            {/* Doctor Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Select Doctor</h2>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedDoctor?.id === doctor.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                      </div>
                      {doctor.lastShared && (
                        <span className="text-sm text-gray-500">
                          Last shared: {new Date(doctor.lastShared).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sharing Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Share Report</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleShare('email')}
                  className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50"
                  disabled={isSharing}
                >
                  <Mail className="text-blue-500" size={24} />
                  <div className="text-left">
                    <p className="font-medium">Share via Email</p>
                    <p className="text-sm text-gray-600">Send report as PDF attachment</p>
                  </div>
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50"
                  disabled={isSharing}
                >
                  <Phone className="text-green-500" size={24} />
                  <div className="text-left">
                    <p className="font-medium">Share via WhatsApp</p>
                    <p className="text-sm text-gray-600">Send report directly</p>
                  </div>
                </button>
                <button
                  onClick={() => handleShare('download')}
                  className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50"
                  disabled={isSharing}
                >
                  <Download className="text-purple-500" size={24} />
                  <div className="text-left">
                    <p className="font-medium">Download Report</p>
                    <p className="text-sm text-gray-600">Save as PDF file</p>
                  </div>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-4 border rounded-lg flex items-center gap-3 hover:bg-gray-50"
                  disabled={isSharing}
                >
                  <Copy className="text-gray-500" size={24} />
                  <div className="text-left">
                    <p className="font-medium">Copy Link</p>
                    <p className="text-sm text-gray-600">Share secure report link</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {isSharing && (
            <div className="fixed bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg">
              Sharing report...
            </div>
          )}
          {shareSuccess && (
            <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
              <Check size={20} />
              Report shared successfully!
            </div>
          )}
        </main>
      </div>
    </>
  );
}