import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const MainFooter = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Bắt đầu tạo form khảo sát 
        </h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            onClick={() => navigate('/create-form')}
          >
            Tạo Form Ngay
          </button>
          <button 
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition flex items-center justify-center"
                onClick={() => navigate('/view-results')}
              >
                Xem Kết Quả
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
        </div>
      </div>
    </section>
  );
};

export default MainFooter;