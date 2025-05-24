import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitForm = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="3" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            {/* Floating particles */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-2 -right-6 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75 animation-delay-200"></div>
            <div className="absolute -bottom-2 -left-6 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-75 animation-delay-400"></div>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              🎉 Thành công!
            </h1>
            <p className="text-lg text-green-600 font-semibold mb-2">
              Bạn đã điền thành công đơn khảo sát
            </p>
            <p className="text-gray-600 text-sm">
              Cảm ơn bạn đã dành thời gian tham gia khảo sát của chúng tôi
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-100"></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce animation-delay-200"></div>
          </div>

          {/* Auto redirect info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Tự động chuyển về trang chủ sau
            </p>
            <div className="text-2xl font-bold text-blue-600">
              {countdown}s
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
              <div 
                className="bg-blue-600 h-1 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${((10 - countdown) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Về trang chủ ngay
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-white text-gray-600 py-2 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Điền form khác
            </button>
          </div>
        </div>

        {/* Additional info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Phản hồi của bạn đã được ghi nhận và xử lý
          </p>
        </div>
      </div>

      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
};

export default SubmitForm;