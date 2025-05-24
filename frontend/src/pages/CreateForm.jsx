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
    // Bỏ alert thành công
  } catch (error) {
    console.error("Lỗi khi tạo form:", error);
    alert("Lỗi: " + error.message);
  } finally {
    setLoading(false);
  }
};

  // Hàm copy link
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Đã copy link vào clipboard!");
    }).catch(() => {
      alert("Không thể copy. Vui lòng copy thủ công.");
    });
  };

  // Tạo share link
  const getShareLink = () => {
    return `${process.env.REACT_APP_FRONTED_SERVER_URL}/form-detail/${formId}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Tạo Form Mới
      </h1>

      <div className="mb-6">
        <label htmlFor="formTitle" className="block mb-2 font-semibold text-gray-700">
          Tên Form <span className="text-red-500">*</span>
        </label>
        <input
          id="formTitle"
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Nhập tên form"
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div className="mb-8">
        <label htmlFor="formDescription" className="block mb-2 font-semibold text-gray-700">
          Mô tả
        </label>
        <textarea
          id="formDescription"
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Nhập mô tả form"
          rows={4}
          className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Câu hỏi</h2>

      {questions.map((q, idx) => (
        <div
          key={idx}
          className="mb-8 border border-gray-300 rounded-lg p-6 bg-gray-50 shadow-sm relative"
        >
          <button
            onClick={() => removeQuestion(idx)}
            title="Xóa câu hỏi"
            className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition text-2xl font-bold focus:outline-none"
          >
            &times;
          </button>

          <label className="block mb-3 font-semibold text-gray-700" htmlFor={`question_text_${idx}`}>
            Câu hỏi {idx + 1} <span className="text-red-500">*</span>
          </label>
          <input
            id={`question_text_${idx}`}
            type="text"
            placeholder="Nhập nội dung câu hỏi"
            value={q.question_text}
            onChange={(e) => updateQuestion(idx, "question_text", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <div className="flex items-center mb-5 space-x-4">
            <label htmlFor={`question_type_${idx}`} className="font-semibold text-gray-700">
              Loại câu hỏi:
            </label>
            <select
              id={`question_type_${idx}`}
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
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="text">Text</option>
              <option value="radio">Radio</option>
              <option value="checkbox">Checkbox</option>
              <option value="select">Select</option>
              <option value="date">Date</option>
            </select>
          </div>

          {questionTypesWithOptions.includes(q.question_type) && (
            <div>
              <label className="block mb-3 font-semibold text-gray-700">
                Lựa chọn
              </label>
              {q.options.map((opt, i) => (
                <div key={i} className="flex items-center mb-3 space-x-3">
                  <input
                    type="text"
                    placeholder={`Lựa chọn ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(idx, i, e.target.value)}
                    className="flex-grow border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(idx, i)}
                    disabled={q.options.length === 1}
                    className={`text-red-600 hover:text-red-800 font-bold text-xl px-2 rounded ${
                      q.options.length === 1 ? "opacity-40 cursor-not-allowed" : ""
                    } transition`}
                    title="Xóa lựa chọn"
                  >
                    &times;
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addOption(idx)}
                className="mt-2 text-blue-600 hover:text-blue-800 font-semibold transition"
              >
                + Thêm lựa chọn
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center space-x-4 mb-8">
        <label htmlFor="newQuestionType" className="font-semibold text-gray-700">
          Loại câu hỏi mới:
        </label>
        <select
          id="newQuestionType"
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold transition"
        >
          + Thêm câu hỏi
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-md font-bold transition"
      >
        {loading ? "Đang tạo..." : "Tạo Form"}
      </button>

      {formId && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-green-100 border border-green-400 rounded text-center">
            <p className="text-green-700 font-semibold mb-2">✅ Tạo form thành công!</p>
            <p className="text-green-700 font-mono">
              ID Form: <span className="font-bold">{formId}</span>
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-300 rounded">
            <p className="text-blue-700 font-semibold mb-3">🔗 Link chia sẻ form:</p>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={getShareLink()}
                readOnly
                className="flex-grow px-3 py-2 bg-white border border-blue-300 rounded font-mono text-sm text-blue-800"
              />
              <button
                onClick={() => copyToClipboard(getShareLink())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}