import React from 'react';
import { Card } from 'antd';

const SubmitForm = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Bạn đã điền thành công đơn khảo sát.
        </h1>
      </Card>
    </div>
  );
};

export default SubmitForm;