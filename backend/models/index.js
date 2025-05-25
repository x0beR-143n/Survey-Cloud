// models/index.js
const { getDbConfig, closeConnector } = require("../config/db.config.js");
const Sequelize = require("sequelize");

let sequelize = null;
let db = null;
let isInitialized = false;

const initializeDatabase = async () => {
    if (isInitialized && db) {
        return db;
    }

    try {
        console.log('🔄 Initializing database with Cloud SQL Connector...');
        const dbConfig = await getDbConfig();
        console.log('✅ Database config loaded');
        console.log(`📊 Connecting to database: ${dbConfig.DB}`);
        
        // Cấu hình Sequelize với Cloud SQL Connector
        const sequelizeOptions = {
            dialect: dbConfig.dialect,
            dialectOptions: dbConfig.dialectOptions,
            pool: dbConfig.pool,
            logging: dbConfig.logging,
            // Không cần host và port khi dùng Cloud SQL Connector
        };
        
        sequelize = new Sequelize(
            dbConfig.database, 
            dbConfig.username, 
            dbConfig.password, 
            sequelizeOptions
        );

        // Test connection
        console.log('🔄 Testing database connection...');
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully via Cloud SQL Connector');

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
        console.log('✅ Database initialization completed with Cloud SQL Connector');
        return db;
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
        throw error;
    }
};

// Function để đóng database connection và connector
const closeDatabaseConnection = async () => {
    try {
        if (sequelize) {
            await sequelize.close();
            sequelize = null;
            console.log('🔒 Database connection closed');
        }
        
        // Đóng Cloud SQL Connector
        await closeConnector();
        
        // Reset initialization state
        isInitialized = false;
        db = null;
        
    } catch (error) {
        console.error('❌ Error closing database connection:', error);
        throw error;
    }
};

// Export cả db object và functions
module.exports = { 
    initializeDatabase,
    getDb: () => db,
    closeDatabaseConnection
};