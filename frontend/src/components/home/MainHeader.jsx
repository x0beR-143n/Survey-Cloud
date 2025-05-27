import { ChevronRight, LayoutDashboard, FileText, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
    const navigate = useNavigate();

    return (
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Tạo form 
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Tạo, xem, quản lý form, báo cáo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition flex items-center justify-center"
                onClick={() => navigate('/create-form')}
              >
                Tạo Form Ngay
                <ChevronRight className="ml-2 h-5 w-5" />
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
          <div className="md:w-1/2">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                  <LayoutDashboard className="h-8 w-8 text-white mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Giao diện trực quan</h3>
                  <p className="text-white/80">Kéo thả để tạo form nhanh chóng</p>
                </div>
                <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                  <FileText className="h-8 w-8 text-white mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nhiều mẫu form</h3>
                  <p className="text-white/80">Hàng trăm mẫu có sẵn</p>
                </div>
                <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                  <Users className="h-8 w-8 text-white mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Phân tích dữ liệu</h3>
                  <p className="text-white/80">Báo cáo chi tiết, trực quan</p>
                </div>
                <div className="bg-white/20 p-6 rounded-xl backdrop-blur-sm">
                  <Zap className="h-8 w-8 text-white mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tự động hóa</h3>
                  <p className="text-white/80">Tự động gửi email, cập nhật dữ liệu và thông báo theo thời gian thực</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default MainHeader;