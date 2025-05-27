const { getDb } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

// Helper function để lấy db instance
const getDbInstance = () => {
  const db = getDb();
  if (!db) {
    throw new Error('Database not initialized. Please ensure database is connected before using controllers.');
  }
  return db;
};

// Create a new form with questions and options
exports.createForm = async (req, res) => {
  let t;
  
  try {
    const db = getDbInstance();
    t = await db.sequelize.transaction();
    
    const { form, questions } = req.body;
    
    // Validation
    if (!form || !form.title) {
      await t.rollback();
      return res.status(400).send({
        message: "Tiêu đề form là bắt buộc."
      });
    }
    
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      await t.rollback();
      return res.status(400).send({
        message: "Form phải có ít nhất một câu hỏi."
      });
    }
    
    // Nếu không có form ID, tạo một UUID mới
    if (!form.id) {
      form.id = uuidv4();
    }
    
    // Tạo form
    const newForm = await db.Form.create({
      id: form.id,
      title: form.title,
      description: form.description
    }, { transaction: t });
    
    // Tạo questions và options
    for (const q of questions) {
      if (!q.question_text || !q.question_type) {
        await t.rollback();
        return res.status(400).send({
          message: "Mỗi câu hỏi phải có nội dung và loại câu hỏi."
        });
      }
      
      const newQuestion = await db.Question.create({
        form_id: newForm.id,
        question_text: q.question_text,
        question_type: q.question_type
      }, { transaction: t });
      
      // Nếu có options, tạo các options
      if (q.options && Array.isArray(q.options)) {
        for (const optionText of q.options) {
          if (optionText && optionText.trim()) {
            await db.Option.create({
              question_id: newQuestion.id,
              option_text: optionText.trim()
            }, { transaction: t });
          }
        }
      }
    }
    
    await t.commit();
    
    res.status(201).send({
      success: true,
      formId: newForm.id,
      message: "Form đã được tạo thành công."
    });
  } catch (error) {
    if (t) await t.rollback();
    console.error('Error in createForm:', error);
    res.status(500).send({
      success: false,
      message: error.message || "Có lỗi xảy ra khi tạo form."
    });
  }
};

// Get form details by ID with questions and options
exports.getFormDetailsById = async (req, res) => {
  try {
    const db = getDbInstance();
    const formId = req.params.id;
    
    if (!formId) {
      return res.status(400).send({
        success: false,
        message: "Không có ID form được cung cấp!"
      });
    }
    
    // Lấy thông tin form
    const form = await db.Form.findByPk(formId);
    
    if (!form) {
      return res.status(404).send({
        success: false,
        message: `Không tìm thấy form với ID=${formId}.`
      });
    }
    
    // Lấy tất cả các câu hỏi của form
    const questions = await db.Question.findAll({
      where: { form_id: formId },
      order: [['id', 'ASC']]
    });
    
    // Tạo mảng để lưu questions với options
    const questionsWithOptions = [];
    
    // Lấy options cho mỗi câu hỏi
    for (const question of questions) {
      const options = await db.Option.findAll({
        where: { question_id: question.id },
        order: [['id', 'ASC']]
      });
      
      questionsWithOptions.push({
        ...question.toJSON(),
        options: options.map(opt => opt.toJSON())
      });
    }
    
    res.send({
      success: true,
      form: form.toJSON(),
      questions: questionsWithOptions
    });
  } catch (error) {
    console.error('Error in getFormDetailsById:', error);
    res.status(500).send({
      success: false,
      message: error.message || "Có lỗi xảy ra khi lấy thông tin form."
    });
  }
};

// Submit form responses
exports.submitForm = async (req, res) => {
  let t;
  
  try {
    const db = getDbInstance();
    t = await db.sequelize.transaction();
    
    const { form_id, answers } = req.body;
    
    if (!form_id) {
      await t.rollback();
      return res.status(400).send({
        success: false,
        message: "ID form là bắt buộc."
      });
    }
    
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      await t.rollback();
      return res.status(400).send({
        success: false,
        message: "Cần có ít nhất một câu trả lời."
      });
    }
    
    // Kiểm tra form tồn tại
    const formExists = await db.Form.findByPk(form_id);
    
    if (!formExists) {
      await t.rollback();
      return res.status(404).send({
        success: false,
        message: `Không tìm thấy form với ID=${form_id}.`
      });
    }
    
    // Tạo response mới
    const newResponse = await db.Response.create({
      form_id: form_id
    }, { transaction: t });
    
    // Tạo các câu trả lời
    for (const ans of answers) {
      if (!ans.question_id) {
        await t.rollback();
        return res.status(400).send({
          success: false,
          message: "Mỗi câu trả lời phải có question_id."
        });
      }
      
      let answerValue;
      
      // Nếu câu trả lời là mảng, chuyển thành JSON string
      if (Array.isArray(ans.answer)) {
        answerValue = JSON.stringify(ans.answer);
      } else {
        answerValue = ans.answer;
      }
      
      await db.Answer.create({
        response_id: newResponse.id,
        question_id: ans.question_id,
        answer: answerValue
      }, { transaction: t });
    }
    
    await t.commit();
    
    res.status(201).send({
      success: true,
      responseId: newResponse.id,
      message: "Form đã được gửi thành công."
    });
  } catch (error) {
    if (t) await t.rollback();
    console.error('Error in submitForm:', error);
    res.status(500).send({
      success: false,
      message: error.message || "Có lỗi xảy ra khi gửi form."
    });
  }
};

// Get form result by ID
exports.getFormResultById = async (req, res) => {
  try {
    const db = getDbInstance();
    const formId = req.params.id;
    
    if (!formId) {
      return res.status(400).send({
        success: false,
        message: "Không có ID form được cung cấp!"
      });
    }
    
    // Lấy thông tin form
    const form = await db.Form.findByPk(formId);
    
    if (!form) {
      return res.status(404).send({
        success: false,
        message: `Không tìm thấy form với ID=${formId}.`
      });
    }
    
    // Lấy câu hỏi của form
    const questions = await db.Question.findAll({
      where: { form_id: formId },
      order: [['id', 'ASC']]
    });
    
    // Đếm tổng số phản hồi của form
    const totalResponses = await db.Response.count({
      where: { form_id: formId }
    });

    if (totalResponses === 0) {
      return res.status(404).send({
        success: false,
        message: "Chưa có phản hồi nào cho form này."
      });
    }
    
    // Tạo thống kê cho mỗi câu hỏi
    const stats = [];
    
    for (const question of questions) {
      // Lấy tất cả câu trả lời cho câu hỏi này
      const allAnswers = await db.Answer.findAll({
        where: { question_id: question.id },
        include: [
          {
            model: db.Response,
            where: { form_id: formId }
          }
        ]
      });
      
      // Tạo thống kê dựa trên loại câu hỏi
      if (question.question_type === 'text') {
        // Đối với câu hỏi text, mỗi câu trả lời là một option_text
        const countMap = {};
        
        allAnswers.forEach(ans => {
          const answer = ans.answer || 'Không có câu trả lời';
          if (!countMap[answer]) {
            countMap[answer] = 0;
          }
          countMap[answer]++;
        });
        
        const counts = Object.keys(countMap).map(key => ({
          option_text: key,
          count: countMap[key]
        }));
        
        stats.push({
          question_id: question.id,
          question_text: question.question_text,
          question_type: question.question_type,
          counts: counts
        });
      } else if (question.question_type === 'radio' || question.question_type === 'select') {
        // Đối với radio và select, đếm số lần mỗi option được chọn
        const options = await db.Option.findAll({
          where: { question_id: question.id },
          order: [['id', 'ASC']]
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
          question_type: question.question_type,
          counts: counts
        });
      } else if (question.question_type === 'checkbox') {
        // Đối với checkbox, phải parse JSON string và đếm tần suất xuất hiện
        const options = await db.Option.findAll({
          where: { question_id: question.id },
          order: [['id', 'ASC']]
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
            console.warn('Failed to parse checkbox answer:', ans.answer);
          }
        });
        
        const counts = Object.keys(optionCounts).map(key => ({
          option_text: key,
          count: optionCounts[key]
        }));
        
        stats.push({
          question_id: question.id,
          question_text: question.question_text,
          question_type: question.question_type,
          counts: counts
        });
      }
    }
    
    res.send({
      success: true,
      response: {
        form_id: formId,
        form_title: form.title,
        total_responses: totalResponses
      },
      stats: stats
    });
  } catch (error) {
    console.error('Error in getFormResultById:', error);
    res.status(500).send({
      success: false,
      message: error.message || "Có lỗi xảy ra khi lấy kết quả form."
    });
  }
};

// Get all forms
exports.getAllForms = async (req, res) => {
  try {
    const db = getDbInstance();
    
    const forms = await db.Form.findAll({
      order: [['created_at', 'DESC']]
    });
    
    // Lấy thêm thông tin về số câu hỏi và phản hồi cho mỗi form
    const formsWithStats = await Promise.all(
      forms.map(async (form) => {
        const questionCount = await db.Question.count({
          where: { form_id: form.id }
        });
        
        const responseCount = await db.Response.count({
          where: { form_id: form.id }
        });
        
        return {
          ...form.toJSON(),
          question_count: questionCount,
          response_count: responseCount
        };
      })
    );
    
    res.send({
      success: true,
      forms: formsWithStats
    });
  } catch (error) {
    console.error('Error in getAllForms:', error);
    res.status(500).send({
      success: false,
      message: error.message || "Có lỗi xảy ra khi lấy danh sách form."
    });
  }
};