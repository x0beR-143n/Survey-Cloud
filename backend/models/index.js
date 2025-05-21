const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

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

module.exports = db;