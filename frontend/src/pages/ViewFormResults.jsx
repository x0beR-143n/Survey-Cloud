import React, { useState } from 'react';
import { Card, Input, Button, message, Spin, Alert, Row, Col } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BarChart, Bar, 
  PieChart, Pie, 
  LineChart, Line,
  AreaChart, Area,
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const COLOR_SETS = [
  ['#1890ff', '#52c41a', '#722ed1', '#fa8c16', '#eb2f96'], 
  ['#13c2c2', '#52c41a', '#722ed1', '#fa8c16', '#eb2f96'], 
  ['#722ed1', '#52c41a', '#1890ff', '#fa8c16', '#eb2f96'], 
  ['#fa8c16', '#52c41a', '#1890ff', '#722ed1', '#eb2f96'], 
  ['#eb2f96', '#52c41a', '#1890ff', '#722ed1', '#fa8c16'], 
];

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const ViewFormResults = () => {
  const { formId: urlFormId } = useParams();
  const navigate = useNavigate();
  const [formId, setFormId] = useState(urlFormId || '');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (!formId.trim()) {
      message.error('Vui lòng nhập mã đơn khảo sát!');
      return;
    }
    navigate(`/view-results/${formId}`);
  };

  const fetchData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/forms/get-form-result-by-id/${id}`);
      if (response.data && response.data.response && response.data.stats) {
        setData({
          form: {
            id: response.data.response.form_id,
            total_responses: response.data.response.total_responses
          },
          stats: response.data.stats
        });
      } else {
        setError('Dữ liệu không hợp lệ');
      }
    } catch (err) {
      console.error('Error fetching form results:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (urlFormId) {
      fetchData(urlFormId);
    }
  }, [urlFormId]);

  if (!urlFormId) {
    return (
      <div className="max-w-md mx-auto p-6">
        <Card className="text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Nhập mã đơn khảo sát để xem kết quả</h2>
          <Input
            placeholder="Nhập mã đơn khảo sát..."
            value={formId}
            onChange={e => setFormId(e.target.value)}
            className="mb-4 text-lg"
            size="large"
          />
          <Button type="primary" size="large" onClick={handleSubmit} className="w-full">
            Xem kết quả
          </Button>
        </Card>
      </div>
    );
  }

  if (loading) return <Spin className="flex justify-center mt-10" size="large" />;
  if (error) return <Alert type="error" message={error} className="mt-10" />;
  if (!data) return null;

  const { form, stats } = data;

  const renderChart = (question, colorSet) => {
    const { counts } = question;
    
    if (counts.length <= 3) {
      return (
        <PieChart>
          <Pie
            data={counts}
            dataKey="count"
            nameKey="option_text"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {counts.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={colorSet[idx % colorSet.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    }
    
    if (counts.length <= 6) {
      return (
        <BarChart data={counts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="option_text" />
          <YAxis />
          <Tooltip />
          <Legend />
          {counts.map((entry, idx) => (
            <Bar 
              key={idx}
              dataKey="count" 
              fill={colorSet[idx % colorSet.length]}
              name={entry.option_text}
            />
          ))}
        </BarChart>
      );
    }
    
    if (counts.length <= 10) {
      return (
        <LineChart data={counts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="option_text" />
          <YAxis />
          <Tooltip />
          <Legend />
          {counts.map((entry, idx) => (
            <Line 
              key={idx}
              type="monotone"
              dataKey="count"
              stroke={colorSet[idx % colorSet.length]}
              name={entry.option_text}
              dot={{ fill: colorSet[idx % colorSet.length] }}
            />
          ))}
        </LineChart>
      );
    }
    
    return (
      <AreaChart data={counts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="option_text" />
        <YAxis />
        <Tooltip />
        <Legend />
        {counts.map((entry, idx) => (
          <Area 
            key={idx}
            type="monotone"
            dataKey="count"
            fill={colorSet[idx % colorSet.length]}
            stroke={colorSet[idx % colorSet.length]}
            name={entry.option_text}
          />
        ))}
      </AreaChart>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2 text-blue-600">Kết quả khảo sát: {form.id}</h2>
          <p className="text-gray-600">Tiêu đề: {form.title}</p>
          {form.description && <p className="text-gray-600">Mô tả: {form.description}</p>}
        </div>

        {/* Phần biểu đồ */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Biểu đồ thống kê</h3>
          <Row gutter={[24, 24]}>
            {stats?.map((q, index) => {
              const colorSet = COLOR_SETS[index % COLOR_SETS.length];
              return (
                <Col xs={24} lg={12} key={q.question_id}>
                  <Card className="h-full shadow-md">
                    <h3 className="font-semibold mb-4 text-lg">{q.question_text}</h3>
                    <div className="mb-4">
                      <ResponsiveContainer width="100%" height={300}>
                        {renderChart(q, colorSet)}
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        {/* Phần kết quả chi tiết */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Kết quả chi tiết</h3>
          <div className="space-y-6">
            {stats?.map((q, index) => {
              return (
                <Card key={q.question_id} className="shadow-md">
                  <h3 className="font-semibold mb-4 text-lg">{q.question_text}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {q.counts.map((opt, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-gray-600 mb-1">{opt.option_text}</div>
                        <div className="text-2xl font-bold text-black">
                          {opt.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ViewFormResults; 