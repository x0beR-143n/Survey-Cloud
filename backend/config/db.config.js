module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "kien1211",
    DB: "survey_platform",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};