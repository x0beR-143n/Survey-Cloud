import React, { useState } from "react";

const questionTypesWithOptions = ["radio", "checkbox", "select"];

export default function CreateForm() {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestionType, setNewQuestionType] = useState("text");
  const [formId, setFormId] = useState(null);
  const [loading, setLoading] = useState(false);

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
      // Nếu backend cần id, bạn có thể dùng uuid hoặc bỏ đi nếu không cần
      // id: uuidv4(),
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
    alert("Tạo form thành công! ID: " + result.formId);
  } catch (error) {
    console.error("Lỗi khi tạo form:", error);
    alert("Lỗi: " + error.message);
  } finally {
    setLoading(false);
  }
};





  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Tạo Form Mới</h1>

      <div className="mb-5">
        <label className="block mb-1 font-semibold">Tên Form</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Nhập tên form"
        />
      </div>

      <div className="mb-5">
        <label className="block mb-1 font-semibold">Mô tả</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Nhập mô tả form"
          rows={3}
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Câu hỏi</h2>

      {questions.map((q, idx) => (
        <div
          key={idx}
          className="mb-6 border border-gray-300 rounded p-4 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Câu hỏi {idx + 1}</h3>
            <button
              onClick={() => removeQuestion(idx)}
              className="text-red-500 font-bold text-xl"
              title="Xóa câu hỏi"
            >
              &times;
            </button>
          </div>

          <input
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
            type="text"
            placeholder="Nội dung câu hỏi"
            value={q.question_text}
            onChange={(e) =>
              updateQuestion(idx, "question_text", e.target.value)
            }
          />

          <div className="flex items-center space-x-3 mb-3">
            <label className="font-medium">Loại:</label>
            <select
              className="border border-gray-300 rounded px-3 py-1"
              value={q.question_type}
              onChange={(e) => {
                const type = e.target.value;
                updateQuestion(idx, "question_type", type);
                if (questionTypesWithOptions.includes(type)) {
                  if (!q.options.length) updateQuestion(idx, "options", [""]);
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

          {questionTypesWithOptions.includes(q.question_type) && (
            <div className="mb-3">
              <label className="font-medium mb-1 block">Lựa chọn:</label>
              {q.options.map((opt, i) => (
                <div key={i} className="flex items-center mb-2 space-x-2">
                  <input
                    className="flex-grow border border-gray-300 rounded px-3 py-1"
                    type="text"
                    value={opt}
                    placeholder={`Lựa chọn ${i + 1}`}
                    onChange={(e) => updateOption(idx, i, e.target.value)}
                  />
                  <button
                    type="button"
                    className="text-red-500 font-bold"
                    onClick={() => removeOption(idx, i)}
                    disabled={q.options.length === 1}
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-600 mt-2"
                onClick={() => addOption(idx)}
              >
                + Thêm lựa chọn
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center space-x-3 mt-4 mb-6">
        <label className="font-semibold">Loại câu hỏi:</label>
        <select
          className="border border-gray-300 rounded px-3 py-1"
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
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Thêm câu hỏi
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded font-bold disabled:opacity-50"
      >
        {loading ? "Đang tạo..." : "Tạo Form"}
      </button>

      {formId && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded text-center text-green-700">
          ID Form đã tạo: <span className="font-mono">{formId}</span>
        </div>
      )}
    </div>
  );
}
