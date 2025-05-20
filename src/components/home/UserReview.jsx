const UserReview = () => {
    const testimonials = [
      {
        name: "Mai Tiến Huy",
        text: "22028082",
      },
      {
        name: "123",
        text: "ádfklhalsdkf",
      },
      {
        name: "1234",
        text: "qưẻqưetdf",
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
                </div>
                <div className="pt-6">
                  <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{testimonial.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default UserReview;