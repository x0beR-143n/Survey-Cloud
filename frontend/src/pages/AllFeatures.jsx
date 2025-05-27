import React from 'react';
import { FilePlus, FolderKanban, UserCog, Share2, Eye, Database, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <FilePlus className="h-10 w-10 text-blue-600 mb-4" />,
    title: 'Tạo form',
    desc: 'Cho phép người dùng tạo các biểu mẫu với nhiều loại câu hỏi',
  },
  {
    icon: <FolderKanban className="h-10 w-10 text-blue-600 mb-4" />,
    title: 'Quản lý form',
    desc: 'Cho phép người dùng xem danh sách các form đã tạo và có thể thực hiện các thao tác như xem, sửa (tùy chọn), xóa.',
  },
  {
    icon: <Share2 className="h-10 w-10 text-blue-600 mb-4" />,
    title: 'Chia sẻ form',
    desc: 'Tạo ra các URL duy nhất để người khác có thể truy cập và điền vào form.',
  },
  {
    icon: <UserCog className="h-10 w-10 text-blue-600 mb-4" />,
    title: 'Chia sẻ quyền chỉnh sửa',
    desc: 'Cho phép nhiều người dùng cùng nhau chỉnh sửa một form. Đây là một tính năng phức tạp hơn, có thể để dành nếu bạn có thêm thời gian.',
  },
  {
    icon: <Eye className="h-10 w-10 text-blue-600 mb-4" />,
    title: 'Hiển thị form',
    desc: 'Hiển thị form cho người điền dựa trên URL.',
  },
  {
    icon: <Database className="h-10 w-10 text-blue-600 mb-4" />,
    title: 'Thu thập và lưu trữ dữ liệu',
    desc: 'Lưu trữ các câu trả lời mà người dùng gửi.',
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-blue-600 mb-4" />,
    title: 'Xem kết quả',
    desc: 'Cho phép người tạo form xem các phản hồi đã thu thập.',
  }
];

const AllFeatures = () => {
  return (
    <section id="all-features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Các chức năng chính của Web</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition">
              {feature.icon}
              <div>
                <div className="font-bold text-lg mb-2 text-gray-900">{feature.title}</div>
                <div className="text-gray-700 text-base">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllFeatures; 