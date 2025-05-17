use survey_platform;

INSERT INTO forms (id, title, description)
VALUES ('HFKSPWKG-123', 'Khảo sát sản phẩm', 'Hãy giúp chúng tôi hiểu bạn hơn');

-- Câu hỏi 1: radio
INSERT INTO questions (form_id, question_text, question_type)
VALUES ('HFKSPWKG-123', 'Bạn thích sản phẩm nào?', 'radio');

-- Câu hỏi 2: checkbox
INSERT INTO questions (form_id, question_text, question_type)
VALUES ('HFKSPWKG-123', 'Bạn thích màu gì?', 'checkbox');

-- Câu hỏi 3: text
INSERT INTO questions (form_id, question_text, question_type)
VALUES ('HFKSPWKG-123', 'Bạn có nhận xét gì về sản phẩm?', 'text');

-- Options cho câu hỏi 1
INSERT INTO options (question_id, option_text)
VALUES 
  (1, 'Sản phẩm A'),
  (1, 'Sản phẩm B'),
  (1, 'Sản phẩm C');

-- Options cho câu hỏi 2
INSERT INTO options (question_id, option_text)
VALUES 
  (2, 'Đỏ'),
  (2, 'Xanh'),
  (2, 'Vàng');
  
INSERT INTO responses (id, form_id, submitted_at)
VALUES (1, 'HFKSPWKG-123', NOW());

INSERT INTO answers (response_id, question_id, answer)
VALUES (1, 1, 'Sản phẩm B');

INSERT INTO answers (response_id, question_id, answer)
VALUES (1, 2, '["Đỏ", "Vàng"]');

INSERT INTO answers (response_id, question_id, answer)
VALUES (1, 3, 'Tôi rất hài lòng với sản phẩm.');


-- Response thứ 2
INSERT INTO responses (id, form_id, submitted_at)
VALUES (2, 'HFKSPWKG-123', NOW());

-- Câu hỏi 1: chọn "Sản phẩm A"
INSERT INTO answers (response_id, question_id, answer)
VALUES (2, 1, 'Sản phẩm A');

-- Câu hỏi 2: chọn "Xanh"
INSERT INTO answers (response_id, question_id, answer)
VALUES (2, 2, '["Xanh"]');

-- Câu hỏi 3: nhập bình luận
INSERT INTO answers (response_id, question_id, answer)
VALUES (2, 3, 'Cần cải thiện thời gian giao hàng.');
