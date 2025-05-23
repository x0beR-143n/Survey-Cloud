import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const questionTypesWithOptions = ["radio", "checkbox", "select"];

export default function CreateForm() {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [questions, setQuestions] = useState([]);
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [formId, setFormId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCreatedAt(new Date());
  }, []);

  const addQuestion = () => {
    const newQuestion = {
      question_text: "",
      question_type: newQuestionType,
      required: false,
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
        alert("Vui lòng điền đầy đủ nội dung câu hỏi");
        return;
      }
      if (
        questionTypesWithOptions.includes(q.question_type) &&
        (!q.options.length || q.options.some((opt) => !opt.trim()))
      ) {
        alert("Vui lòng điền đầy đủ các lựa chọn cho câu hỏi có lựa chọn");
        return;
      }
    }

    try {
      setLoading(true);
      
      // Chuyển hướng trực tiếp đến FormDetail với dữ liệu form
      navigate('/form-detail', {
        state: {
          formTitle,
          formDescription,
          questions: JSON.stringify(questions.map((q, index) => ({
            id: index + 1,
            questionText: q.question_text,
            questionType: q.question_type,
            required: q.required,
            options: q.options,
          }))),
        },
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Tạo Form Mới</h1>

        <div className="mb-5">
          <label className="block mb-1 font-semibold">Tên Form</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Nhập tên form"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-semibold">Mô tả</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Nhập mô tả form"
            rows={3}
          />
        </div>

        <div className="mb-5">
          <label className="block font-semibold mb-1">Thời gian tạo:</label>
          <span className="text-gray-600">{createdAt.toLocaleString()}</span>
        </div>

        <hr className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">Câu hỏi</h2>

        {questions.length === 0 && (
          <p className="text-gray-500 mb-4">
            Chưa có câu hỏi nào. Vui lòng thêm câu hỏi mới.
          </p>
        )}

        {questions.map((q, idx) => (
          <div
            key={idx}
            className="mb-6 border border-gray-300 rounded p-4 bg-gray-50 relative"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Câu hỏi {idx + 1}</h3>
              <button
                className="text-red-500 hover:text-red-700 font-bold text-xl leading-none"
                onClick={() => removeQuestion(idx)}
                title="Xóa câu hỏi"
                type="button"
              >
                &times;
              </button>
            </div>

            <input
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Nhập nội dung câu hỏi"
              value={q.question_text}
              onChange={(e) => updateQuestion(idx, "question_text", e.target.value)}
            />

            <div className="flex items-center space-x-3 mb-3">
              <label className="font-medium">Loại câu hỏi:</label>
              <select
                className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={q.question_type}
                onChange={(e) => {
                  const newType = e.target.value;
                  updateQuestion(idx, "question_type", newType);
                  if (questionTypesWithOptions.includes(newType)) {
                    if (!q.options.length) {
                      updateQuestion(idx, "options", [""]);
                    }
                  } else {
                    updateQuestion(idx, "options", []);
                  }
                }}
              >
                <option value="text">Text</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="select">Select</option>
                <option value="date">Date</option>
              </select>
            </div>

            <div className="flex items-center mb-3 space-x-2">
              <input
                type="checkbox"
                id={`required-${idx}`}
                checked={q.required}
                onChange={(e) => updateQuestion(idx, "required", e.target.checked)}
              />
              <label htmlFor={`required-${idx}`} className="font-medium">
                Bắt buộc trả lời
              </label>
            </div>

            {questionTypesWithOptions.includes(q.question_type) && (
              <div className="mb-3">
                <label className="block font-medium mb-2">Các lựa chọn:</label>
                {q.options.map((opt, i) => (
                  <div key={i} className="flex items-center mb-2 space-x-2">
                    <input
                      className="flex-grow border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder={`Lựa chọn ${i + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(idx, i, e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 font-bold text-lg leading-none px-2"
                      onClick={() => removeOption(idx, i)}
                      disabled={q.options.length === 1}
                      title="Xóa lựa chọn"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                  onClick={() => addOption(idx)}
                >
                  + Thêm lựa chọn
                </button>
              </div>
            )}
          </div>
        ))}

        <hr className="my-6" />

        <div className="flex items-center space-x-3 mb-6">
          <label className="font-semibold">Chọn loại câu hỏi mới:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newQuestionType}
            onChange={(e) => setNewQuestionType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="select">Select</option>
            <option value="date">Date</option>
          </select>
          <button
            type="button"
            className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors duration-200"
            onClick={addQuestion}
          >
            + Tạo câu hỏi mới
          </button>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors duration-200 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo Form"}
        </button>

        {formId && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-green-700 font-semibold text-center">
            ID Form đã tạo: <span className="font-mono">{formId}</span>
          </div>
        )}
      </div>
    </div>
  );
}
