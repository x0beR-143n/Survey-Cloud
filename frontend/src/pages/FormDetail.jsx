import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FormDetail = () => {
  // Lấy formId từ URL params
  const { formId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

  const fetchFormData = useCallback(async () => {
    if (!formId) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/forms/get-form-details-by-id/${formId}`);
      
      if (!response.ok) {
        throw new Error('Form không tồn tại hoặc đã bị xóa');
      }
      
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [formId, BACKEND_URL]);

  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateAnswers = () => {
    if (!formData?.questions) return true;
    
    // Check if all questions have answers (you can add required field logic here)
    const unansweredQuestions = formData.questions.filter(
      question => !answers[question.id] || 
      (Array.isArray(answers[question.id]) && answers[question.id].length === 0)
    );
    
    return unansweredQuestions.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) {
      alert('Vui lòng trả lời tất cả các câu hỏi');
      return;
    }

    setSubmitting(true);
    
    try {
      const submitData = {
        form_id: formId,
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          question_id: parseInt(questionId),
          answer: answer
        }))
      };

      const response = await fetch(`${BACKEND_URL}/forms/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        throw new Error('Lỗi khi nộp form');
      }

      // Chuyển hướng đến trang thành công thay vì hiển thị alert
      navigate('/submit-form');
    } catch (err) {
      alert('Lỗi khi nộp form: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    switch (question.question_type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-sm"
            placeholder="Nhập câu trả lời của bạn..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option.id} className="group flex items-center space-x-4 cursor-pointer hover:bg-blue-50/50 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-sm">
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={option.option_text}
                  checked={answers[question.id] === option.option_text}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2 border-2 border-gray-300"
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">{option.option_text}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <label key={option.id} className="group flex items-center space-x-4 cursor-pointer hover:bg-green-50/50 p-4 rounded-xl transition-all duration-300 border border-transparent hover:border-green-200 hover:shadow-sm">
                <input
                  type="checkbox"
                  value={option.option_text}
                  checked={answers[question.id]?.includes(option.option_text) || false}
                  onChange={(e) => {
                    const currentAnswers = answers[question.id] || [];
                    let newAnswers;
                    
                    if (e.target.checked) {
                      newAnswers = [...currentAnswers, option.option_text];
                    } else {
                      newAnswers = currentAnswers.filter(answer => answer !== option.option_text);
                    }
                    
                    handleAnswerChange(question.id, newAnswers);
                  }}
                  className="w-5 h-5 text-green-600 focus:ring-green-500 focus:ring-2 rounded border-2 border-gray-300"
                />
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">{option.option_text}</span>
              </label>
            ))}
          </div>
        );

      default:
        return <div className="text-red-500">Loại câu hỏi không được hỗ trợ</div>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Kiểm tra nếu không có formId trong URL
  if (!formId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Thiếu ID Form</h1>
            <p className="text-gray-600 mb-6">Không tìm thấy ID form trong URL</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Không thể tải form</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Enhanced Form Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-t-2xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative p-8 md:p-12">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse delay-100"></div>
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-200"></div>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {formData.form?.title}
                </h1>
                
                {formData.form?.description && (
                  <p className="text-blue-100 text-lg mb-6 leading-relaxed max-w-2xl">
                    {formData.form.description}
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatDate(formData.form?.created_at)}
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {formData.questions?.length || 0} câu hỏi
                  </div>
                </div>
              </div>
              
              <div className="ml-6 hidden md:block">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl text-center">
                  <div className="text-2xl font-bold">{formData.questions?.length || 0}</div>
                  <div className="text-xs text-blue-100">Câu hỏi</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Questions */}
        <div className="bg-white shadow-2xl">
          {formData.questions?.map((question, index) => (
            <div
              key={question.id}
              className={`relative p-8 md:p-10 ${
                index === formData.questions.length - 1 ? 'rounded-b-2xl' : 'border-b border-gray-100'
              }`}
              style={{
                background: index % 2 === 0 
                  ? 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' 
                  : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'
              }}
            >
              {/* Dynamic Question Background Pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
                {question.question_type === 'radio' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5">
                      <animateTransform attributeName="transform" type="rotate" dur="20s" values="0 50 50;360 50 50" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3">
                      <animateTransform attributeName="transform" type="rotate" dur="15s" values="360 50 50;0 50 50" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5"/>
                  </svg>
                )}
                {question.question_type === 'checkbox' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
                    <rect x="20" y="20" width="15" height="15" fill="currentColor" opacity="0.6">
                      <animate attributeName="opacity" dur="2s" values="0.2;0.8;0.2" repeatCount="indefinite"/>
                    </rect>
                    <rect x="65" y="20" width="15" height="15" fill="currentColor" opacity="0.4">
                      <animate attributeName="opacity" dur="2.5s" values="0.2;0.8;0.2" repeatCount="indefinite"/>
                    </rect>
                    <rect x="20" y="65" width="15" height="15" fill="currentColor" opacity="0.5">
                      <animate attributeName="opacity" dur="3s" values="0.2;0.8;0.2" repeatCount="indefinite"/>
                    </rect>
                    <rect x="65" y="65" width="15" height="15" fill="currentColor" opacity="0.3">
                      <animate attributeName="opacity" dur="2.2s" values="0.2;0.8;0.2" repeatCount="indefinite"/>
                    </rect>
                    <path d="M42 35 L48 41 L58 31" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.7">
                      <animate attributeName="stroke-dasharray" dur="3s" values="0,20;20,0;0,20" repeatCount="indefinite"/>
                    </path>
                  </svg>
                )}
                {question.question_type === 'text' && (
                  <svg viewBox="0 0 100 100" className="w-full h-full text-purple-500">
                    <text x="10" y="25" fontSize="12" fill="currentColor" opacity="0.4">
                      <animate attributeName="opacity" dur="1.5s" values="0.2;0.7;0.2" repeatCount="indefinite"/>
                      Aa
                    </text>
                    <text x="70" y="25" fontSize="8" fill="currentColor" opacity="0.3">
                      <animate attributeName="opacity" dur="2s" values="0.2;0.6;0.2" repeatCount="indefinite"/>
                      Text
                    </text>
                    <line x1="15" y1="40" x2="85" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.4">
                      <animate attributeName="stroke-dasharray" dur="2s" values="0,70;70,0;0,70" repeatCount="indefinite"/>
                    </line>
                    <line x1="15" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.3">
                      <animate attributeName="stroke-dasharray" dur="2.5s" values="0,50;50,0;0,50" repeatCount="indefinite"/>
                    </line>
                    <line x1="15" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5">
                      <animate attributeName="stroke-dasharray" dur="1.8s" values="0,65;65,0;0,65" repeatCount="indefinite"/>
                    </line>
                    <circle cx="85" cy="85" r="3" fill="currentColor" opacity="0.6">
                      <animate attributeName="r" dur="1s" values="2;4;2" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                )}
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold mr-6 mt-1 flex-shrink-0 shadow-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {question.question_text}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      {question.question_type === 'radio' && (
                        <>
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          Chọn một đáp án
                        </>
                      )}
                      {question.question_type === 'checkbox' && (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          Có thể chọn nhiều đáp án
                        </>
                      )}
                      {question.question_type === 'text' && (
                        <>
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                          Nhập câu trả lời
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="ml-16">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                    {renderQuestion(question)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Submit Footer */}
        <div className="relative bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 rounded-b-2xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='m0 40l40-40h-40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-6">
                <div className="text-center md:text-left">
                  <div className="text-white text-sm mb-1">Tiến trình hoàn thành</div>
                  <div className="text-gray-300 text-xs">
                    {Object.keys(answers).length}/{formData.questions?.length || 0} câu hỏi
                  </div>
                </div>
                
                <div className="w-32 md:w-48 bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((Object.keys(answers).length) / (formData.questions?.length || 1)) * 100}%`
                    }}
                  ></div>
                </div>
                
                <div className="text-white font-bold text-lg">
                  {Math.round(((Object.keys(answers).length) / (formData.questions?.length || 1)) * 100)}%
                </div>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`group relative px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                  submitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl'
                }`}
              >
                {submitting ? (
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Đang gửi...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <span>Gửi khảo sát</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetail;