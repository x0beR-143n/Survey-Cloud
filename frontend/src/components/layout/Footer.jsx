import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              3SForm
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/create-form" className="hover:text-white transition">Tạo Form</Link></li>
              <li><Link to="/manage" className="hover:text-white transition">Quản lý Form</Link></li>
              <li><Link to="/templates" className="hover:text-white transition">Templates</Link></li>
              <li><Link to="/reports" className="hover:text-white transition">Báo cáo</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/help" className="hover:text-white transition">Trung tâm trợ giúp</Link></li>
              <li><Link to="/guide" className="hover:text-white transition">Hướng dẫn sử dụng</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Liên hệ</Link></li>
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