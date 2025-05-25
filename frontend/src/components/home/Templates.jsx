import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TemplatesSection = () => {
    const navigate = useNavigate();
    
    const templates = [
      {
        title: "Khảo sát khách hàng",
        description: "Thu thập đánh giá và phản hồi",
        color: "bg-blue-100 border-blue-400",
        formData: {
          title: "Khảo sát mức độ hài lòng khách hàng",
          description: "Chúng tôi rất trân trọng ý kiến của bạn để cải thiện chất lượng dịch vụ",
          questions: [
            {
              question_text: "Họ và tên của bạn",
              question_type: "text",
              options: []
            },
            {
              question_text: "Địa chỉ email",
              question_type: "text", 
              options: []
            },
            {
              question_text: "Bạn đánh giá như thế nào về chất lượng sản phẩm/dịch vụ của chúng tôi?",
              question_type: "radio",
              options: ["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng", "Rất không hài lòng"]
            },
            {
              question_text: "Bạn có khả năng giới thiệu sản phẩm/dịch vụ của chúng tôi cho người khác không?",
              question_type: "radio",
              options: ["Có", "Không"]
            },
            {
              question_text: "Những khía cạnh nào bạn hài lòng nhất? (có thể chọn nhiều)",
              question_type: "checkbox",
              options: ["Chất lượng sản phẩm", "Giá cả hợp lý", "Dịch vụ khách hàng", "Giao hàng nhanh", "Dễ sử dụng"]
            },
            {
              question_text: "Góp ý và đề xuất của bạn",
              question_type: "text",
              options: []
            }
          ]
        }
      },
      {
        title: "Đăng ký sự kiện",
        description: "Form đăng ký tham gia sự kiện, hội thảo",
        color: "bg-green-100 border-green-400",
        formData: {
          title: "Đăng ký tham gia hội thảo",
          description: "Vui lòng điền thông tin để đăng ký tham gia hội thảo của chúng tôi",
          questions: [
            {
              question_text: "Họ và tên đầy đủ",
              question_type: "text",
              options: []
            },
            {
              question_text: "Số điện thoại",
              question_type: "text",
              options: []
            },
            {
              question_text: "Địa chỉ email",
              question_type: "text",
              options: []
            },
            {
              question_text: "Công ty/Tổ chức",
              question_type: "text",
              options: []
            },
            {
              question_text: "Chức vụ",
              question_type: "select",
              options: ["Giám đốc", "Phó giám đốc", "Trưởng phòng", "Nhân viên", "Sinh viên", "Khác"]
            },
            {
              question_text: "Bạn đã từng tham gia sự kiện của chúng tôi chưa?",
              question_type: "radio",
              options: ["Đã tham gia", "Chưa tham gia"]
            },
            {
              question_text: "Chủ đề nào bạn quan tâm nhất? (có thể chọn nhiều)",
              question_type: "checkbox",
              options: ["Công nghệ mới", "Quản lý dự án", "Marketing", "Tài chính", "Nhân sự"]
            },
            {
              question_text: "Ngày sinh",
              question_type: "date",
              options: []
            }
          ]
        }
      },
      {
        title: "Đánh giá",
        description: "Đánh giá sản phẩm",
        color: "bg-yellow-100 border-yellow-400",
        formData: {
          title: "Đánh giá sản phẩm",
          description: "Chia sẻ trải nghiệm và đánh giá về sản phẩm bạn đã sử dụng",
          questions: [
            {
              question_text: "Tên sản phẩm bạn muốn đánh giá",
              question_type: "text",
              options: []
            },
            {
              question_text: "Đánh giá tổng thể",
              question_type: "radio",
              options: ["5 sao - Xuất sắc", "4 sao - Tốt", "3 sao - Trung bình", "2 sao - Kém", "1 sao - Rất kém"]
            },
            {
              question_text: "Chất lượng sản phẩm",
              question_type: "radio",
              options: ["Rất tốt", "Tốt", "Trung bình", "Kém", "Rất kém"]
            },
            {
              question_text: "Giá cả",
              question_type: "radio",
              options: ["Rất hợp lý", "Hợp lý", "Chấp nhận được", "Hơi đắt", "Quá đắt"]
            },
            {
              question_text: "Điểm mạnh của sản phẩm (có thể chọn nhiều)",
              question_type: "checkbox",
              options: ["Chất lượng cao", "Giá cả hợp lý", "Thiết kế đẹp", "Dễ sử dụng", "Bền bỉ", "Hỗ trợ tốt"]
            },
            {
              question_text: "Điểm cần cải thiện",
              question_type: "text",
              options: []
            },
            {
              question_text: "Bạn có muốn mua lại sản phẩm này không?",
              question_type: "radio",
              options: ["Có", "Không"]
            }
          ]
        }
      },
      {
        title: "Đăng ký nhận quà",
        description: "tham gia chương trình khuyến mãi",
        color: "bg-purple-100 border-purple-400",
        formData: {
          title: "Đăng ký nhận quà khuyến mãi",
          description: "Điền thông tin để tham gia chương trình khuyến mãi và nhận quà hấp dẫn",
          questions: [
            {
              question_text: "Họ và tên",
              question_type: "text",
              options: []
            },
            {
              question_text: "Số điện thoại",
              question_type: "text",
              options: []
            },
            {
              question_text: "Địa chỉ email",
              question_type: "text",
              options: []
            },
            {
              question_text: "Ngày sinh",
              question_type: "date",
              options: []
            },
            {
              question_text: "Giới tính",
              question_type: "radio",
              options: ["Nam", "Nữ", "Khác"]
            },
            {
              question_text: "Địa chỉ nhận quà",
              question_type: "text",
              options: []
            },
            {
              question_text: "Bạn biết đến chương trình này qua kênh nào?",
              question_type: "select",
              options: ["Facebook", "Instagram", "Website", "Bạn bè giới thiệu", "Quảng cáo TV", "Báo chí", "Khác"]
            },
            {
              question_text: "Sản phẩm nào bạn quan tâm? (có thể chọn nhiều)",
              question_type: "checkbox",
              options: ["Thời trang", "Công nghệ", "Gia dụng", "Thực phẩm", "Mỹ phẩm", "Sách"]
            },
            {
              question_text: "Bạn có đồng ý nhận thông tin khuyến mãi qua email không?",
              question_type: "radio",
              options: ["Đồng ý", "Không đồng ý"]
            }
          ]
        }
      }
    ];

    const handleUseTemplate = (template) => {
      navigate('/create-form', { state: { templateData: template.formData } });
    };
  
    return (
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Templates sẵn có</h1>
          <p className="text-gray-600 text-lg">Chọn một template để bắt đầu tạo form của bạn</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <div 
              key={index} 
              className={`rounded-xl shadow-md p-6 border-l-4 ${template.color} transition hover:shadow-lg cursor-pointer hover:scale-105`}
              onClick={() => handleUseTemplate(template)}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{template.title}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button className="text-blue-600 font-medium flex items-center group">
                Sử dụng template
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default TemplatesSection;