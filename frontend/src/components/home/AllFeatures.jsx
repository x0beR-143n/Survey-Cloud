import React from 'react';

const AllFeatures = () => {
  return (
    <section id="all-features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Các chức năng chính của Web</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
          <ol className="list-decimal pl-6 space-y-4 text-gray-800 text-lg">
            <li>
              <span className="font-bold">Tạo form (Form Builder):</span> Cho phép người dùng tạo các biểu mẫu với nhiều loại câu hỏi
            </li>
            <li>
              <span className="font-bold">Quản lý form:</span> Cho phép người dùng xem danh sách các form đã tạo và có thể thực hiện các thao tác như xem, sửa (tùy chọn), xóa.
            </li>
            <li>
              <span className="font-bold">Chia sẻ form:</span> Tạo ra các URL duy nhất để người khác có thể truy cập và điền vào form.
            </li>
            <li>
              <span className="font-bold">(Tùy chọn) Đăng nhập:</span> Cho phép người dùng tạo tài khoản và đăng nhập để quản lý các form của riêng họ. Nếu không đủ thời gian, bạn có thể bỏ qua chức năng này và tập trung vào việc tạo và chia sẻ form ẩn danh.
            </li>
            <li>
              <span className="font-bold">(Tùy chọn nâng cao) Chia sẻ quyền sửa form:</span> Cho phép nhiều người dùng cùng nhau chỉnh sửa một form. Đây là một tính năng phức tạp hơn, có thể để dành nếu bạn có thêm thời gian.
            </li>
            <li>
              <span className="font-bold">Hiển thị form (Form Renderer):</span> Hiển thị form cho người điền dựa trên URL.
            </li>
            <li>
              <span className="font-bold">Thu thập và lưu trữ dữ liệu:</span> Lưu trữ các câu trả lời mà người dùng gửi.
            </li>
            <li>
              <span className="font-bold">Xem kết quả:</span> Cho phép người tạo form xem các phản hồi đã thu thập.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AllFeatures; 