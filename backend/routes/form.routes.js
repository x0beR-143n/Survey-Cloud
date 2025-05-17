const formController = require('../controllers/form.controller');
const router = require('express').Router();

// Tạo form mới
router.post('/create-form', formController.createForm);

// Lấy chi tiết form theo ID
router.get('/get-form-details-by-id/:id', formController.getFormDetailsById);

// Gửi câu trả lời cho form
router.post('/submit-form', formController.submitForm);

// Lấy kết quả form theo ID
router.get('/get-form-result-by-id/:id', formController.getFormResultById);

// Lấy tất cả forms
router.get('/all', formController.getAllForms);

module.exports = router;