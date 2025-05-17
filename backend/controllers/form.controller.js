const db = require('../models');
const { v4: uuidv4 } = require('uuid');
const Form = db.Form;
const Question = db.Question;
const Option = db.Option;
const Response = db.Response;
const Answer = db.Answer;
const { Op } = require('sequelize');

// Create a new form with questions and options
/*
{
  "form": {
    "id": "abc123",
    "title": "Khảo sát sản phẩm",
    "description": "Hãy giúp chúng tôi hiểu bạn hơn"
  },
  "questions": [
    {
      "question_text": "Bạn thích sản phẩm nào?",
      "question_type": "radio",
      "options": ["A", "B", "C"]
    },
    {
      "question_text": "Bạn thích màu gì?",
      "question_type": "checkbox",
      "options": ["Đỏ", "Xanh", "Vàng"]
    }
  ]
}
*/
exports.createForm = async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    const { form, questions } = req.body;
    
    // Nếu không có form ID, tạo một UUID mới
    if (!form.id) {
      form.id = uuidv4();
    }
    
    // Tạo form
    const newForm = await Form.create({
      id: form.id,
      title: form.title,
      description: form.description
    }, { transaction: t });
    
    // Tạo questions và options
    for (const q of questions) {
      const newQuestion = await Question.create({
        form_id: newForm.id,
        question_text: q.question_text,
        question_type: q.question_type
      }, { transaction: t });
      
      // Nếu có options, tạo các options
      if (q.options && Array.isArray(q.options)) {
        for (const optionText of q.options) {
          await Option.create({
            question_id: newQuestion.id,
            option_text: optionText
          }, { transaction: t });
        }
      }
    }
    
    await t.commit();
    
    res.status(201).send({
      formId: newForm.id
    });
  } catch (error) {
    await t.rollback();
    res.status(500).send({
      message: error.message || "Có lỗi xảy ra khi tạo form."
    });
  }
};

// Get form details by ID with questions and options
/* 
{
  "form": {
    "id": "abc123",
    "title": "Khảo sát sản phẩm",
    "description": "Hãy giúp chúng tôi hiểu bạn hơn",
    "created_at": "2025-05-16T10:00:00Z"
  },
  "questions": [
    {
      "id": 1,
      "form_id": "abc123",
      "question_text": "Bạn thích sản phẩm nào?",
      "question_type": "radio",
      "options": [
        { "id": 101, "question_id": 1, "option_text": "Sản phẩm A" },
        { "id": 102, "question_id": 1, "option_text": "Sản phẩm B" },
        { "id": 103, "question_id": 1, "option_text": "Sản phẩm C" }
      ]
    },
    {
      "id": 2,
      "form_id": "abc123",
      "question_text": "Bạn thích màu gì?",
      "question_type": "checkbox",
      "options": [
        { "id": 201, "question_id": 2, "option_text": "Đỏ" },
        { "id": 202, "question_id": 2, "option_text": "Xanh" },
        { "id": 203, "question_id": 2, "option_text": "Vàng" }
      ]
    },
    {
      "id": 3,
      "form_id": "abc123",
      "question_text": "Bạn có nhận xét gì về sản phẩm?",
      "question_type": "text",
      "options": []
    }
  ]
}
*/
exports.getFormDetailsById = async (req, res) => {
  try {
    const formId = req.params.id;
    
    if (!formId) {
      return res.status(400).send({
        message: "Không có ID form được cung cấp!"
      });
    }
    
    // Lấy thông tin form
    const form = await Form.findByPk(formId);
    
    if (!form) {
      return res.status(404).send({
        message: `Không tìm thấy form với ID=${formId}.`
      });
    }
    
    // Lấy tất cả các câu hỏi của form
    const questions = await Question.findAll({
      where: { form_id: formId }
    });
    
    // Tạo mảng để lưu questions với options
    const questionsWithOptions = [];
    
    // Lấy options cho mỗi câu hỏi
    for (const question of questions) {
      const options = await Option.findAll({
        where: { question_id: question.id }
      });
      
      questionsWithOptions.push({
        ...question.toJSON(),
        options: options
      });
    }
    
    res.send({
      form: form,
      questions: questionsWithOptions
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Có lỗi xảy ra khi lấy thông tin form."
    });
  }
};

// Submit form responses
exports.submitForm = async (req, res) => {
  const t = await db.sequelize.transaction();
  
  try {
    const { form_id, answers } = req.body;
    
    // Kiểm tra form tồn tại
    const formExists = await Form.findByPk(form_id);
    
    if (!formExists) {
      await t.rollback();
      return res.status(404).send({
        message: `Không tìm thấy form với ID=${form_id}.`
      });
    }
    
    // Tạo response mới
    const newResponse = await Response.create({
      form_id: form_id
    }, { transaction: t });
    
    // Tạo các câu trả lời
    for (const ans of answers) {
      let answerValue;
      
      // Nếu câu trả lời là mảng, chuyển thành JSON string
      if (Array.isArray(ans.answer)) {
        answerValue = JSON.stringify(ans.answer);
      } else {
        answerValue = ans.answer;
      }
      
      await Answer.create({
        response_id: newResponse.id,
        question_id: ans.question_id,
        answer: answerValue
      }, { transaction: t });
    }
    
    await t.commit();
    
    res.status(201).send({
      responseId: newResponse.id,
      message: "Form đã được gửi thành công."
    });
  } catch (error) {
    await t.rollback();
    res.status(500).send({
      message: error.message || "Có lỗi xảy ra khi gửi form."
    });
  }
};

// Get form result by ID
exports.getFormResultById = async (req, res) => {
  try {
    const formId = req.params.id;
    
    if (!formId) {
      return res.status(400).send({
        message: "Không có ID form được cung cấp!"
      });
    }
    
    // Lấy thông tin form
    const form = await Form.findByPk(formId);
    
    if (!form) {
      return res.status(404).send({
        message: `Không tìm thấy form với ID=${formId}.`
      });
    }
    
    // Lấy câu hỏi của form
    const questions = await Question.findAll({
      where: { form_id: formId }
    });
    
    // Lấy response gần nhất
    const response = await Response.findOne({
      where: { form_id: formId },
      order: [['submitted_at', 'DESC']]
    });
    
    if (!response) {
      return res.status(404).send({
        message: "Chưa có phản hồi nào cho form này."
      });
    }
    
    // Tạo thống kê cho mỗi câu hỏi
    const stats = [];
    
    for (const question of questions) {
      // Lấy tất cả câu trả lời cho câu hỏi này
      const allAnswers = await Answer.findAll({
        where: { question_id: question.id },
        include: [
          {
            model: Response,
            where: { form_id: formId }
          }
        ]
      });
      
      // Tạo thống kê dựa trên loại câu hỏi
      if (question.question_type === 'text') {
        // Đối với câu hỏi text, mỗi câu trả lời là một option_text
        const countMap = {};
        
        allAnswers.forEach(ans => {
          if (!countMap[ans.answer]) {
            countMap[ans.answer] = 0;
          }
          countMap[ans.answer]++;
        });
        
        const counts = Object.keys(countMap).map(key => ({
          option_text: key,
          count: countMap[key]
        }));
        
        stats.push({
          question_id: question.id,
          question_text: question.question_text,
          counts: counts
        });
      } else if (question.question_type === 'radio' || question.question_type === 'select') {
        // Đối với radio và select, đếm số lần mỗi option được chọn
        const options = await Option.findAll({
          where: { question_id: question.id }
        });
        
        const counts = options.map(opt => {
          const count = allAnswers.filter(ans => ans.answer === opt.option_text).length;
          return {
            option_text: opt.option_text,
            count: count
          };
        });
        
        stats.push({
          question_id: question.id,
          question_text: question.question_text,
          counts: counts
        });
      } else if (question.question_type === 'checkbox') {
        // Đối với checkbox, phải parse JSON string và đếm tần suất xuất hiện
        const options = await Option.findAll({
          where: { question_id: question.id }
        });
        
        const optionCounts = {};
        options.forEach(opt => {
          optionCounts[opt.option_text] = 0;
        });
        
        // Đếm số lần mỗi option được chọn trong tất cả các câu trả lời
        allAnswers.forEach(ans => {
          try {
            const selectedOptions = JSON.parse(ans.answer);
            if (Array.isArray(selectedOptions)) {
              selectedOptions.forEach(selected => {
                if (optionCounts[selected] !== undefined) {
                  optionCounts[selected]++;
                }
              });
            }
          } catch (e) {
            // Bỏ qua lỗi parse JSON
          }
        });
        
        const counts = Object.keys(optionCounts).map(key => ({
          option_text: key,
          count: optionCounts[key]
        }));
        
        stats.push({
          question_id: question.id,
          question_text: question.question_text,
          counts: counts
        });
      }
    }
    
    res.send({
      response: response,
      stats: stats
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Có lỗi xảy ra khi lấy kết quả form."
    });
  }
};

// Get all forms
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.findAll({
      order: [['created_at', 'DESC']]
    });
    
    res.send(forms);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Có lỗi xảy ra khi lấy danh sách form."
    });
  }
};