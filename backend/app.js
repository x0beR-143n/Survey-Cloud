const express = require("express");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Health check endpoint (available immediately)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Form API Server is running - Survey Platform 2',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      forms: '/forms/*'
    }
  });
});

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

const startServer = async () => {
  try {
    console.log('🚀 Starting server initialization...');
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    
    // Step 1: Initialize database connection
    console.log('🔄 Step 1: Initializing database connection...');
    const { initializeDatabase } = require("./models");
    const db = await initializeDatabase();
    console.log('✅ Database initialized successfully');
    
    // Step 2: Sync database
    console.log('🔄 Step 2: Syncing database schema...');
    await db.sequelize.sync({ force: false, alter: false });
    console.log("✅ Successfully synced with MySQL DB");
    
    // Step 3: Setup routes AFTER database is ready
    console.log('🔄 Step 3: Setting up routes...');
    const formRoutes = require("./routes/form.routes");
    app.use("/forms", formRoutes);
    console.log('✅ Routes configured successfully');
    
    // Step 4: Error handling middleware
    app.use((err, req, res, next) => {
      console.error('❌ Error occurred:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString()
      });
      
      res.status(err.status || 500).json({ 
        success: false,
        message: process.env.NODE_ENV === 'production' 
          ? 'Internal server error' 
          : err.message,
        timestamp: new Date().toISOString()
      });
    });
    
    // Step 5: 404 handler
    app.use('*', (req, res) => {
      console.log(`❓ 404 - Route not found: ${req.method} ${req.originalUrl}`);
      res.status(404).json({ 
        success: false,
        message: 'Endpoint not found',
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
        availableEndpoints: [
          'GET /',
          'GET /health',
          'GET /forms/all',
          'POST /forms/create-form',
          'GET /forms/get-form-details-by-id/:id',
          'POST /forms/submit-form',
          'GET /forms/get-form-result-by-id/:id'
        ]
      });
    });
    
    // Step 6: Start server
    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🎉 Server is running successfully!`);
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API base URL: http://localhost:${PORT}/forms`);
      console.log(`📋 Available endpoints:`);
      console.log(`   GET  /health`);
      console.log(`   GET  /forms/all`);
      console.log(`   POST /forms/create-form`);
      console.log(`   GET  /forms/get-form-details-by-id/:id`);
      console.log(`   POST /forms/submit-form`);
      console.log(`   GET  /forms/get-form-result-by-id/:id`);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = (signal) => {
      console.log(`\n🔄 Received ${signal}, shutting down gracefully...`);
      server.close(async () => {
        console.log('🔒 HTTP server closed');
        try {
          await db.sequelize.close();
          console.log('🔒 Database connection closed');
          console.log('✅ Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error closing database connection:', error);
          process.exit(1);
        }
      });
      
      // Force close after 10 seconds
      setTimeout(() => {
        console.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    console.error('❌ Failed to start server:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    process.exit(1);
  }
};

// Start the server
console.log('🔄 Initializing Form API Server...');
startServer().catch(error => {
  console.error('❌ Server startup failed:', error);
  process.exit(1);
});