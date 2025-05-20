import { ChevronRight } from 'lucide-react';

const TemplatesSection = () => {
    const templates = [
      {
        title: "Khảo sát khách hàng",
        description: "Thu thập đánh giá và phản hồi",
        color: "bg-blue-100 border-blue-400"
      },
      {
        title: "Đăng ký sự kiện",
        description: "Form đăng ký tham gia sự kiện, hội thảo",
        color: "bg-green-100 border-green-400"
      },
      {
        title: "Đánh giá",
        description: "Đánh giá sản phẩm",
        color: "bg-yellow-100 border-yellow-400"
      },
      {
        title: "Đăng ký nhận quà",
        description: "tham gia chương trình khuyến mãi",
        color: "bg-purple-100 border-purple-400"
      }
    ];
  
    return (
      <section id="templates" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Templates sẵn có</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <div 
                key={index} 
                className={`rounded-xl shadow-md p-6 border-l-4 ${template.color} transition hover:shadow-lg cursor-pointer`}
                onClick={() => alert(`Tạo form với template ${template.title}`)}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{template.title}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <button className="text-blue-600 font-medium flex items-center">
                  Sử dụng template
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default TemplatesSection;