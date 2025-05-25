const { getDbConfig } = require("../config/db.config.js");
const Sequelize = require("sequelize");

let sequelize = null;
let db = null;
let isInitialized = false;

const initializeDatabase = async () => {
  if (isInitialized && db) {
    return db;
  }

  try {
    console.log('🔄 Initializing database...');
    const dbConfig = await getDbConfig();
    console.log('✅ Database config loaded');
    console.log(`📊 Connecting to: ${dbConfig.DB} at ${dbConfig.HOST}`);
    
    sequelize = new Sequelize(
      dbConfig.DB, 
      dbConfig.USER, 
      dbConfig.PASSWORD, 
      {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        pool: dbConfig.pool,
        logging: process.env.NODE_ENV === 'production' ? false : console.log
      }
    );

    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    // Import models
    console.log('📋 Loading models...');
    db.Form = require("./form.model.js")(sequelize, Sequelize);
    db.Question = require("./question.model.js")(sequelize, Sequelize);
    db.Option = require("./option.model.js")(sequelize, Sequelize);
    db.Response = require("./response.model.js")(sequelize, Sequelize);
    db.Answer = require("./answer.model.js")(sequelize, Sequelize);

    // Thiết lập associations
    console.log('🔗 Setting up associations...');
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    isInitialized = true;
    console.log('✅ Database initialization completed');
    return db;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

// Export cả db object và function
module.exports = { 
  initializeDatabase,
  getDb: () => db // Thêm getter để lấy db instance
};