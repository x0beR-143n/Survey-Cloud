import React from 'react';
import { LayoutDashboard, PenTool, Zap, Users } from 'lucide-react';

const Features = () => {
    const features = [
      {
        icon: <LayoutDashboard className="h-12 w-12 text-blue-600" />,
        title: "Nhiều loại câu hỏi",
        description: "Hỗ trợ trắc nghiệm, checkbox, câu trả lời ngắn, đánh giá sao và nhiều loại khác."
      },
      {
        icon: <PenTool className="h-12 w-12 text-blue-600" />,
        title: "Tùy chỉnh dễ dàng",
        description: "Thay đổi giao diện, thêm logo và tùy chỉnh form theo phong cách riêng của bạn."
      },
      {
        icon: <Zap className="h-12 w-12 text-blue-600" />,
        title: "Phân tích nhanh chóng",
        description: "Xem kết quả trực quan với biểu đồ và thống kê chi tiết ngay khi có người trả lời."
      },
      {
        icon: <Users className="h-12 w-12 text-blue-600" />,
        title: "Chia sẻ dễ dàng",
        description: "Chia sẻ form qua link, email hoặc nhúng vào website của bạn."
      }
    ];
  
    return (
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tính năng nổi bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
               công cụ để tạo và quản lý form khảo sát 
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 transition hover:shadow-lg">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Features;