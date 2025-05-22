const secretManager = require('../utils/secretManager');

let dbConfig = null;

const getDbConfig = async () => {
  if (dbConfig) {
    return dbConfig;
  }

  try {
    // Trong môi trường production (Cloud Run), lấy config từ Secret Manager
    if (process.env.NODE_ENV === 'production' || process.env.GOOGLE_CLOUD_PROJECT) {
      const secrets = await secretManager.getAllSecrets();
      
      dbConfig = {
        HOST: secrets.DB_HOST,
        USER: secrets.DB_USER,
        PASSWORD: secrets.DB_PASSWORD,
        DB: secrets.DB_NAME,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      };
    } else {
      // Trong môi trường development, sử dụng config cố định
      console.log("Development");
    }
    
    return dbConfig;
  } catch (error) {
    console.error('Error getting database configuration:', error);
    throw error;
  }
};

module.exports = { getDbConfig };