// db.config.js - Fixed for Cloud SQL Connector
const secretManager = require('./secret-manager');
const { Connector } = require('@google-cloud/cloud-sql-connector'); 

let connectorInstance = null;

const getDbConfig = async () => {
    try {
        const secrets = await secretManager.getAllSecrets();
        const instanceConnectionName = secrets.INSTANCE_CONNECTION_NAME;
        
        // Initialize connector
        if (!connectorInstance) {
            connectorInstance = new Connector();
        }

        // Get the MySQL connection options
        const clientOpts = await connectorInstance.getOptions({
            instanceConnectionName: instanceConnectionName,
            ipType: 'PUBLIC', // Change to 'PRIVATE' if needed
        });

        return {
            database: secrets.DB_NAME,
            username: secrets.DB_USER,
            password: secrets.DB_PASSWORD,
            dialect: "mysql",
            dialectOptions: {
                // Pass the stream directly to dialectOptions
                stream: clientOpts.stream,
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: process.env.NODE_ENV === 'production' ? false : console.log
        };
    } catch (error) {
        console.error('❌ Error getting database configuration:', error);
        throw error;
    }
};

const closeConnector = async () => {
    if (connectorInstance) {
        await connectorInstance.close();
        connectorInstance = null;
        console.log('✅ Cloud SQL Connector closed');
    }
};

module.exports = { 
    getDbConfig,
    closeConnector 
};