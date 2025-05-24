const UserReview = () => {
    const testimonials = [
      {
        name: "Mai Tiến Huy",
        text: "22028082",
      },
      {
        name: "Trương Sỹ Đạt",
        text: "22028317",
      },
      {
        name: "Dương Gia Huấn",
        text: "22028335",
      },
      {
        name: "Đinh Chí Kiên",
        text: "22028066",
      }, 
      {
        name: "Bùi Minh Nhật",
        text: "22028262",
      }
    ];
  
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Đánh giá của người dùng</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 relative">
                <div className="absolute -top-5 left-6">
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{testimonial.name}</span>
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default UserReview;