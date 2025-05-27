import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Card, Input, Button, Alert, Select, Space, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const questionTypesWithOptions = ["radio", "checkbox", "select"];

export default function CreateForm() {
  const location = useLocation();
  const templateData = location.state?.templateData;
  
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [formId, setFormId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (templateData) {
      setFormTitle(templateData.title || "");
      setFormDescription(templateData.description || "");
      setQuestions(templateData.questions || []);
      setFormId(null);
    }
  }, [templateData]);

  const addQuestion = () => {
    const newQuestion = {
      question_text: "",
      question_type: newQuestionType,
      options: questionTypesWithOptions.includes(newQuestionType) ? [""] : [],
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuestion = (index, key, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [key]: value } : q))
    );
  };

  const updateOption = (qIndex, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIndex) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const addOption = (qIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (qIndex, optionIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i === qIndex) {
          const newOptions = q.options.filter((_, idx) => idx !== optionIndex);
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const removeQuestion = (qIndex) => {
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };

  const resetForm = () => {
    setFormTitle("");
    setFormDescription("");
    setQuestions([]);
    setFormId(null);
  };

const handleSubmit = async () => {
  if (!formTitle.trim()) {
    alert("Vui lòng nhập tên form");
    return;
  }
  if (questions.length === 0) {
    alert("Vui lòng thêm ít nhất 1 câu hỏi");
    return;
  }

  for (const q of questions) {
    if (!q.question_text.trim()) {
      alert("Vui lòng điền nội dung tất cả câu hỏi");
      return;
    }
    if (
      questionTypesWithOptions.includes(q.question_type) &&
      (!q.options.length || q.options.some((opt) => !opt.trim()))
    ) {
      alert("Vui lòng điền đầy đủ lựa chọn cho các câu hỏi có lựa chọn");
      return;
    }
  }

  const payload = {
    form: {
      title: formTitle,
      description: formDescription,
    },
    questions: questions.map((q) => ({
      question_text: q.question_text,
      question_type: q.question_type,
      options: questionTypesWithOptions.includes(q.question_type)
        ? q.options.map((opt) => opt.trim())
        : [],
    })),
  };

  try {
    setLoading(true);
    console.log("Đang gửi payload:", JSON.stringify(payload, null, 2));

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/forms/create-form`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("Backend lỗi:", result);
      throw new Error(result.error || result.message || "Tạo form thất bại");
    }

    setFormId(result.formId);
  } catch (error) {
    console.error("Lỗi khi tạo form:", error);
    alert("Lỗi: " + error.message);
  } finally {
    setLoading(false);
  }
};

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Đã copy link vào clipboard!");
    }).catch(() => {
      alert("Không thể copy. Vui lòng copy thủ công.");
    });
  };

  const getShareLink = () => {
    return `${process.env.REACT_APP_FRONTED_SERVER_URL}/${formId}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="border-0 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <FormOutlined className="text-2xl text-blue-500" />
          <Title level={2} className="!mb-0 !text-gray-800">
            {templateData ? "Chỉnh sửa Template" : "Tạo Form Mới"}
          </Title>
          {templateData && (
            <Button 
              type="primary"
              onClick={resetForm}
              className="ml-auto bg-blue-500 hover:bg-blue-600 border-none"
              icon={<FormOutlined />}
            >
              Tạo form mới
            </Button>
          )}
        </div>

        <Card className="mb-6 border border-gray-100">
          <div className="mb-4">
            <Text strong className="block mb-2 text-gray-700">
              Tên Form <span className="text-red-500">*</span>
            </Text>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Nhập tên form"
              size="large"
            />
          </div>

          <div>
            <Text strong className="block mb-2 text-gray-700">
              Mô tả
            </Text>
            <TextArea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Nhập mô tả form"
              rows={3}
            />
          </div>
        </Card>

        <Title level={3} className="!mb-4 !text-gray-800">Câu hỏi</Title>

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <Card 
              key={idx} 
              className="border border-gray-100"
              title={
                <div className="flex justify-between items-center">
                  <Text strong>Câu hỏi {idx + 1} <span className="text-red-500">*</span></Text>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeQuestion(idx)}
                  />
                </div>
              }
            >
              <Input
                placeholder="Nhập nội dung câu hỏi"
                value={q.question_text}
                onChange={(e) => updateQuestion(idx, "question_text", e.target.value)}
                className="mb-4"
                size="large"
              />

              <div className="flex items-center gap-4 mb-4">
                <Text strong className="text-gray-700">Loại câu hỏi:</Text>
                <Select
                  value={q.question_type}
                  onChange={(type) => {
                    updateQuestion(idx, "question_type", type);
                    if (questionTypesWithOptions.includes(type)) {
                      if (!q.options.length) updateQuestion(idx, "options", [""]);
                    } else {
                      updateQuestion(idx, "options", []);
                    }
                  }}
                  style={{ width: 200 }}
                >
                  <Option value="text">Text</Option>
                  <Option value="radio">Radio</Option>
                  <Option value="checkbox">Checkbox</Option>
                  <Option value="select">Select</Option>
                  <Option value="date">Date</Option>
                </Select>
              </div>

              {questionTypesWithOptions.includes(q.question_type) && (
                <div className="mt-4">
                  <Text strong className="block mb-3 text-gray-700">Lựa chọn</Text>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {q.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input
                          placeholder={`Lựa chọn ${i + 1}`}
                          value={opt}
                          onChange={(e) => updateOption(idx, i, e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => removeOption(idx, i)}
                          disabled={q.options.length === 1}
                        />
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() => addOption(idx)}
                      icon={<PlusOutlined />}
                      className="w-full"
                    >
                      Thêm lựa chọn
                    </Button>
                  </Space>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-6 mb-6">
          <Text strong className="text-gray-700">Loại câu hỏi mới:</Text>
          <Select
            value={newQuestionType}
            onChange={setNewQuestionType}
            style={{ width: 200 }}
          >
            <Option value="text">Text</Option>
            <Option value="radio">Radio</Option>
            <Option value="checkbox">Checkbox</Option>
            <Option value="select">Select</Option>
            <Option value="date">Date</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addQuestion}
          >
            Thêm câu hỏi
          </Button>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          loading={loading}
          className="w-full"
        >
          {loading ? "Đang tạo..." : "Tạo Form"}
        </Button>

        {formId && (
          <div className="mt-6 space-y-4">
            <Alert
              message="✅ Tạo form thành công!"
              description={`ID Form: ${formId}`}
              type="success"
              showIcon
            />
            
            <Card className="bg-blue-50">
              <Text strong className="block mb-3 text-blue-700">🔗 Link chia sẻ form:</Text>
              <div className="flex items-center gap-3">
                <Input
                  value={getShareLink()}
                  readOnly
                  className="flex-grow"
                />
                <Button
                  type="primary"
                  onClick={() => copyToClipboard(getShareLink())}
                >
                  Copy
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}