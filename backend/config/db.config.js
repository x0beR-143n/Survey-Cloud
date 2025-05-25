const secretManager = require('./secret-manager');

let dbConfig = null;

const getDbConfig = async () => {
  if (dbConfig) {
    return dbConfig;
  }

  try {   
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
    return dbConfig;
  } catch (error) {
    console.error('Error getting database configuration:', error);
    throw error;
  }
};

module.exports = { getDbConfig };