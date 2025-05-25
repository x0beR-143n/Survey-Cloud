import React from 'react';
import { FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-blue-50';
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-1/4">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Form Survey</span>
          </Link>
        </div>
        
        <nav className="w-2/4 flex justify-center">
          <div className="inline-flex space-x-4">
            <Link
              to="/"
              className={`px-6 py-2 rounded-md font-bold transition-colors duration-200 ${isActive('/')}`}
            >
              Trang chủ
            </Link>
            <Link
              to="/templates"
              className={`px-6 py-2 rounded-md font-bold transition-colors duration-200 ${isActive('/templates')}`}
            >
              Templates
            </Link>
            <Link
              to="/features"
              className={`px-6 py-2 rounded-md font-bold transition-colors duration-200 ${isActive('/features')}`}
            >
              Tính năng
            </Link>
            <Link
              to="/review"
              className={`px-6 py-2 rounded-md font-bold transition-colors duration-200 ${isActive('/review')}`}
            >
              Đánh giá
            </Link>
          </div>
        </nav>
        
        <div className="w-1/4 flex justify-end">
        </div>
      </div>
    </header>
  );
};

export default Header;