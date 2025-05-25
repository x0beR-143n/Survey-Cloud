import React from 'react';

const reviews = [
  {
    name: "Bùi Minh Nhật",
    role: "David Minh Nhat",
    text: "veri gud",
    rating: 5
  },
  {
    name: "Đinh Chí Kiên",
    role: "Anh Trí",
    text: "Tôi rất hài lòng với dịch vụ",
    rating: 5
  },
  {
    name: "Trần Đại Dương",
    role: "Nguyễn Thị Thanh Lam",
    text: "Tôi rất thích",
    rating: 4
  },
  {
    name: "Trương Sỹ Đạt",
    role: "Trương Sỹ Diện",
    text: "Tôi cảm thấy sử dụng dịch vũ rất dễ dàng và nhanh chóng",
    rating: 5
  }
];

const Review = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Đánh giá từ người dùng</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Những đánh giá và phản hồi từ người dùng Form Survey
          </p>
        </div>

        <form className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Gửi đánh giá của bạn</h2>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Tên của bạn"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="role"
              placeholder="Vai trò hoặc biệt danh"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="text"
              placeholder="Nội dung đánh giá"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-100 resize-none"
              rows={3}
            />
          </div>
          <div className="mb-4 flex items-center">
            <span className="mr-2 text-gray-700">Đánh giá:</span>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Gửi đánh giá
          </button>
        </form>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{review.name}</h3>
                  <p className="text-gray-600">{review.role}</p>
                </div>
              </div>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review; 