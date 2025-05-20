import React from 'react';
import { FileText } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">Nhóm 6</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-800 hover:text-blue-600 font-medium">Trang chủ</a>
          <a href="/templates" className="text-gray-800 hover:text-blue-600 font-medium">Templates</a>
          <a href="/features" className="text-gray-800 hover:text-blue-600 font-medium">Tính năng</a>
          <a href="/testimonials" className="text-gray-800 hover:text-blue-600 font-medium">Đánh giá</a>
        </nav>
        
        <div className="flex space-x-4">
        </div>
      </div>
    </header>
  );
};

export default Header;