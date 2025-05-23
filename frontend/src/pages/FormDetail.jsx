'use client';
import React, { useState } from 'react';
import { Button, Card, Input, Radio, Checkbox, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const FormDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formTitle, formDescription, questions: questionsStr } = location.state || {};
  const questions = questionsStr ? JSON.parse(questionsStr) : [];
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate required questions
    const unansweredRequired = questions.filter(
      (q) => q.required && !answers[q.id]
    );

    if (unansweredRequired.length > 0) {
      message.error('Vui lòng trả lời tất cả các câu hỏi bắt buộc');
      return;
    }

    try {
      // Chuyển hướng trực tiếp đến trang SubmitForm
      message.success('Nộp form thành công!');
      navigate('/submit-form');
    } catch (error) {
      message.error('Lỗi khi nộp form');
      console.error('Submit error:', error);
    }
  };

  const renderQuestion = (question) => {
    switch (question.questionType) {
      case 'text':
        return (
          <Input
            placeholder="Nhập câu trả lời của bạn"
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            value={answers[question.id] || ''}
          />
        );

      case 'radio':
        return (
          <Radio.Group
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            value={answers[question.id]}
          >
            {question.options?.map((option, index) => (
              <Radio key={index} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'checkbox':
        return (
          <Checkbox.Group
            options={question.options}
            onChange={(values) => handleAnswerChange(question.id, values)}
            value={answers[question.id]}
          />
        );

      case 'select':
        return (
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            value={answers[question.id] || ''}
          >
            <option value="">Chọn một lựa chọn</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return <div>Loại câu hỏi không được hỗ trợ</div>;
    }
  };

  if (!formTitle || !questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <h1 className="text-xl text-red-600">Form không tồn tại hoặc đã bị xóa</h1>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-4 shadow-lg rounded-b-none border-b-0">
          <h1 className="text-2xl font-bold mb-2">{formTitle}</h1>
          <p className="text-gray-600 mb-4">{formDescription}</p>
        </Card>

        {questions.map((question, index) => (
          <Card 
            key={question.id} 
            className={`shadow-sm ${
              index === questions.length - 1 
                ? 'rounded-t-none mb-4' 
                : 'rounded-none mb-0 border-b-0'
            }`}
          >
            <div className="mb-4">
              <label className="block text-lg mb-2">
                {question.questionText}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderQuestion(question)}
            </div>
          </Card>
        ))}

        <div className="flex justify-end mt-6">
          <Button type="primary" size="large" onClick={handleSubmit}>
            Nộp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormDetail; 