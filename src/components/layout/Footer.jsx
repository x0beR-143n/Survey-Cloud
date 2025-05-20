import React from 'react';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">Nhóm 6</span>
            </div>
            <p className="text-gray-400">
              hê hê
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/create" className="hover:text-white transition">Tạo Form</a></li>
              <li><a href="/manage" className="hover:text-white transition">Quản lý Form</a></li>
              <li><a href="/templates" className="hover:text-white transition">Templates</a></li>
              <li><a href="/reports" className="hover:text-white transition">Báo cáo</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/help" className="hover:text-white transition">Trung tâm trợ giúp</a></li>
              <li><a href="/guide" className="hover:text-white transition">Hướng dẫn sử dụng</a></li>
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/contact" className="hover:text-white transition">Liên hệ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: hjhj@gmail.com</li>
              <li>Điện thoại: 1234567890</li>
              <li>Địa chỉ: 144 Xuân Thủy</li>
            </ul>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;