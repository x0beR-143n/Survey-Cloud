const axios = require('axios');

async function testAPI() {
  try {
    const response = await axios.get('http://localhost:8080/forms/get-form-result-by-id/test-id');
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testAPI(); 