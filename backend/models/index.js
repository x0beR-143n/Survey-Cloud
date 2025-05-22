const { getDbConfig } = require("../config/db.config.js");
const Sequelize = require("sequelize");

let sequelize = null;
let db = null;

const initializeDatabase = async () => {
  if (sequelize) {
    return db;
  }

  try {
    const dbConfig = await getDbConfig();
    
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
    console.log('Database connection has been established successfully.');

    db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    // Import models
    db.Form = require("./form.model.js")(sequelize, Sequelize);
    db.Question = require("./question.model.js")(sequelize, Sequelize);
    db.Option = require("./option.model.js")(sequelize, Sequelize);
    db.Response = require("./response.model.js")(sequelize, Sequelize);
    db.Answer = require("./answer.model.js")(sequelize, Sequelize);

    // Thiết lập associations
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    return db;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = { initializeDatabase };