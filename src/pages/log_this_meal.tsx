import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Loader } from 'lucide-react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const MealLogger = () => {
  const router = useRouter();
  const [cameraActive, setCameraActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      const image = canvas.toDataURL('image/jpeg');
      setPreview(image);
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!preview) return;
    
    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push("/analysis")
      // Here you would typically:
      // 1. Upload the image to your server
      // 2. Get the AI analysis results
      // 3. Navigate to the results page
      
      console.log('Image processed successfully');
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCapture = () => {
    setPreview(null);
    setCameraActive(false);
  };

  return (
    
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4">
      <div className="w-full aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
        {cameraActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        
        {preview && (
          <Image
            src={preview}
            alt="Meal preview"
            className="w-full h-full object-cover"
            width={500} 
            height={300}
          />
        )}

        {!cameraActive && !preview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Camera size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500">No image captured</p>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full gap-4">
        {!preview && !cameraActive && (
          <>
            <button
              onClick={startCamera}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Camera size={24} />
              <span>Take Photo</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={24} />
              <span>Upload Photo</span>
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </>
        )}

        {cameraActive && (
          <div className="flex gap-4">
            <button
              onClick={capturePhoto}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Camera size={24} />
              <span>Capture</span>
            </button>
            
            <button
              onClick={stopCamera}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <X size={24} />
              <span>Cancel</span>
            </button>
          </div>
        )}

        {preview && (
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400"
            >
              {isLoading ? (
                <Loader size={24} className="animate-spin" />
              ) : (
                <>
                  <Upload size={24} />
                  <span>Analyze Meal</span>
                </>
              )}
            </button>
            
            <button
              onClick={resetCapture}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400"
            >
              <X size={24} />
              <span>Retake</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealLogger;