const express = require('express');
const cors = require('cors'); // Import the cors package
const { MongoClient } = require('mongodb');
const dbConfig = require('./atlas_url');
const generateInvoice = require('./Proformainvoice');
const path = require('path');//html

const app = express();
app.use(cors()); // Use the cors middleware
app.use(express.json()); // to use the request body as JSON

// Serve static files from the current directory
//app.use(express.static(__dirname));

// Update CORS for React dev server:
app.use(cors({
  origin: 'http://localhost:3001' // React dev server
}));

let client;
let db;
let isConnected = false;

// Connect to MongoDB
MongoClient.connect(dbConfig.url)
  .then(clientInstance => {
    client = clientInstance;
    db = client.db(dbConfig.dbName);
    console.log('Connected to database:', dbConfig.dbName);
    console.log('Using collection:', dbConfig.collectionName);
    isConnected = true;
  })
  .then(() => {
    // Start the server
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    }).on('error', (err) => {
      console.error('Error starting server:', err);
      if (err.code === 'EADDRINUSE') {
        console.log('Port 3000 is already in use. Try using a different port.');
      }
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

  // Serve the HTML file
/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontPage.html'));
});*/

// Define routes
app.post("/AddDriver", async (request, response) => {
  if (!isConnected) {
    response.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const driver = {
    name: request.body.name,
    phone: request.body.phone,
    licenseNumber: request.body.licenseNumber,
    balance: 0
  };

  try {
    const collection = db.collection(dbConfig.collectionName);
    const existingDriver = await collection.findOne({ phone: driver.phone });
    if (existingDriver) {
      response.json({ message: 'Driver details already exist', driver: existingDriver });
    } else {
      const Reg=/^[789]\d{9}$/;
      const checknum= Reg.test(driver.phone);//india
      try{
        if(!checknum) {
          throw new Error();
        }//change here
      }
      catch(err){
        //console.log("Invalid Phone Number Entered");
        response.status(400).json({ error: "Invalid Phone Number"});
        return; //prevent the server from shutting down
      }
  
      const result = await collection.insertOne(driver);
      response.json({ message: 'Driver details added successfully' });
    }
  } catch (err) {
    console.log('Error adding driver:', err);
    response.status(500).json({ error: 'Error adding driver' });
    return; //prevent the server from shutting down
  }
});
//get driver by name
app.get("/DriverByName/:name", async (request, response) => {
  if (!isConnected) {
    response.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const name = request.params.name;

  if (!name || name.length === 0) {
    response.status(400).json({ error: 'Invalid name' });
    return;
  }

  try {
    const collection = db.collection(dbConfig.collectionName);
    const drivers = await collection.find({ name: name }).toArray();
    if (drivers.length > 0) {
      response.json({ message: 'Driver details found', drivers: drivers });
    } else {
      response.json({ message: 'Driver details not found' });
    }
  } catch (err) {
    console.log('Error getting driver:', err);
    response.status(500).json({ error: 'Error getting driver' });
  }
});
//multiple drivers using get name
app.post("/MultipleByName", async (request, response) => {
  if (!isConnected) {
    response.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const names = request.body.names;
  function isAlphabetAndSpaces(arr) {
    return arr.every(str => /^[A-Za-z\s]+$/.test(str));
  }

  if (!names || names.length === 0 || !isAlphabetAndSpaces(names)) {
    response.status(400).json({ error: 'Invalid name' });
    return;
  }

  try {
    const collection = db.collection(dbConfig.collectionName);
    const regex = new RegExp(names.join('|'), 'i'); // create a regex pattern from the names array
    const drivers = await collection.find({ name: { $regex: regex } }).toArray();
    if (drivers.length > 0) {
      response.json({ message: 'Driver details found', drivers: drivers });
    } else {
      response.json({ message: 'Driver details not found' });
    }
  } catch (err) {
    console.log('Error getting drivers:', err);
    response.status(500).json({ error: 'Error getting drivers' });
  }
});
// Get driver balance by phone number
app.get("/Balance/:phone", async (request, response) => {
  if (!isConnected) {
    response.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const phone = request.params.phone;

  if (!phone || phone.length === 0) {
    response.status(400).json({ error: 'Invalid phone number' });
    return;
  }

  try {
    const collection = db.collection(dbConfig.collectionName);
    const driver = await collection.findOne({ phone: phone });
    if (driver) {
      if (driver.balance > 3000){
        response.json({ message: 'Pay immediately! Your balance is ' + driver.balance });
      }
      else{
        response.json({ message: 'Driver balance Under Limit', balance: driver.balance });
      }
    } else {
      response.json({ message: 'Driver balance not found' });
    }
  } catch (err) {
    console.log('Error getting driver balance:', err);
    response.status(500).json({ error: 'Error getting driver balance' });
  }
});
// Pay driver balance fully or partially
app.post("/PayBalance/:phone", async (request, response) => {
  if (!isConnected) {
    response.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const phone = request.params.phone;
  const paymentAmount = request.body.paymentAmount;
  const paymentType = request.body.paymentType; // 'full' or 'partial'

  if (!phone || phone.length === 0) {
    response.status(400).json({ error: 'Invalid phone number' });
    return;
  }

  if (!paymentAmount || paymentAmount <= 0) {
    response.status(400).json({ error: 'Invalid payment amount' });
    return;
  }

  if (!paymentType || (paymentType !== 'full' && paymentType !== 'partial')) {
    response.status(400).json({ error: 'Invalid payment type' });
    return;
  }

  try {
    const collection = db.collection(dbConfig.collectionName);
    const driver = await collection.findOne({ phone: phone });
    if (driver) {
      if (paymentType === 'full') {
        // Pay full balance
        const newBalance = 0;
        await collection.updateOne({ phone: phone }, { $set: { balance: newBalance } });
        await saveTransactionHistory(phone, "payment", driver.balance);
        response.json({ message: 'Balance paid in full' });
      } else if (paymentType === 'partial') {
        // Pay partial balance
        const newBalance = driver.balance - paymentAmount;
        if (newBalance < 0) {
          response.status(400).json({ error: 'Payment amount exceeds balance' });
          return;
        }
        await collection.updateOne({ phone: phone }, { $set: { balance: newBalance } });
        await saveTransactionHistory(phone, "payment", paymentAmount);
        //
        generateInvoice(driver, "Balance Payed", paymentAmount, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
        response.json({ message: 'Partial payment successful' });
      }
    } else {
      response.json({ message: 'Driver balance not found' });
    }
  } catch (err) {
    console.log('Error paying driver balance:', err);
    response.status(500).json({ error: 'Error paying driver balance' });
  }
});
//save transaction history
async function saveTransactionHistory(phoneNumber, transactionType, amount) {
  try {
    const collection = db.collection(dbConfig.collectionName);
    const driver = await collection.findOne({ phone: phoneNumber });
    if (driver) {
      const transactionHistoryCollection = db.collection(dbConfig.collectionName2);
      const transactionHistory = {
        driverId: driver._id,
        transactionType,
        amount,
        timestamp: new Date()
      };
      if (transactionType === 'subscription') {
        transactionHistory.expireAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // expire in 30 days
      }
      await transactionHistoryCollection.insertOne(transactionHistory);
    } else {
      console.log('Error: Driver not found');
    }
  } catch (err) {
    console.log('Error saving transaction history:', err);
  }
}
// Subscribe and add balance
app.post("/Subscribe", async (request, response) => {
  const { phone, subscriptionAmount } = request.body;

  if (!phone || !subscriptionAmount) {
    return response.status(400).json({ error: 'Phone and subscription amount are required' });
  }

  if (subscriptionAmount !== 500 && subscriptionAmount !== 1000) {
    return response.status(400).json({ error: 'Invalid subscription amount. Must be 500 or 1000' });
  }

  try {
    const collection = db.collection('drivers');
    const driver = await collection.findOne({ phone: phone });

    if (!driver) {
      return response.status(404).json({ error: 'Driver not found' });
    }

    // Check if the existing balance exceeds the limit
    if (driver.balance >= 3000) {
      return response.status(400).json({ error: 'Cant Subscribe, Balance already exceeds 3000' });
    }

    const newBalance = driver.balance + subscriptionAmount;
    await collection.updateOne({ phone: phone }, { $set: { balance: newBalance } });

    // Save transaction history
    await saveTransactionHistory(phone, "subscription", subscriptionAmount);

    // Generate an invoice after a successful subscription
    generateInvoice(driver, "subscription", subscriptionAmount, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // expire in 30 days

    response.json({ message: `Subscription successful. Balance updated to ${newBalance}` });
  } catch (err) {
    console.log('Error subscribing and adding balance:', err);
    response.status(500).json({ error: 'Error subscribing and adding balance' });
  }
});

// Show transaction history
app.get("/TransactionHistory/:phone", async (request, response) => {
  if (!isConnected) {
    response.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const phone = request.params.phone;

  if (!phone || phone.length === 0) {
    response.status(400).json({ error: 'Invalid phone number' });
    return;
  }

  try {
    const collection1 = db.collection(dbConfig.collectionName);
    console.log(`Searching for driver with phone: ${phone}`);
    const driver = await collection1.findOne({ phone: phone });

    if (!driver) {
      console.log(`Driver not found for phone: ${phone}`);
      response.status(404).json({ error: 'Driver not found' });
      return;
    }

    const driverId = driver._id;
    console.log(`Driver found with ID: ${driverId}`);
    const collection2 = db.collection(dbConfig.collectionName2);
    const transactions = await collection2.find({ driverId: driverId }).toArray();

    if (transactions.length > 0) {
      response.json({ message: 'Transaction history found', transactions: transactions });
    } else {
      response.json({ message: 'Transaction history not found' });
    }
  } catch (err) {
    console.log('Error getting transaction history:', err);
    response.status(500).json({ error: 'Error getting transaction history' });
  }
});




// Health check endpoint for monitoring and CD pipeline
app.get('/health', (req, res) => {
  try {
    const healthInfo = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 3000,
      database: isConnected ? 'connected' : 'disconnected',
      services: {
        mongodb: isConnected ? 'healthy' : 'unhealthy',
        nodemailer: 'configured',
        pdfkit: 'available'
      },
      endpoints: [
        '/AddDriver',
        '/DriverByName/:name',
        '/Balance/:phone',
        '/PayBalance/:phone',
        '/Subscribe',
        '/TransactionHistory/:phone',
        '/MultipleByName'
      ]
    };
    
    res.status(200).json(healthInfo);
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'EnergyHive Backend API is running! 🚀',
    name: 'EnergyHive Driver Management API',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    description: 'RESTful API for driver management system with subscription and payment features',
    endpoints: {
      'POST /AddDriver': 'Add a new driver',
      'GET /DriverByName/:name': 'Get driver by name',
      'POST /MultipleByName': 'Get multiple drivers by names',
      'GET /Balance/:phone': 'Check driver balance',
      'POST /PayBalance/:phone': 'Pay driver balance',
      'POST /Subscribe': 'Add subscription balance',
      'GET /TransactionHistory/:phone': 'Get transaction history',
      'GET /health': 'Health check endpoint',
      'GET /api/info': 'API information'
    },
    database: {
      type: 'MongoDB',
      status: isConnected ? 'connected' : 'disconnected'
    },
    links: {
      health: '/health',
      apiInfo: '/api/info'
    }
  });
});

// API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'EnergyHive Driver Management API',
    version: '1.0.0',
    description: 'RESTful API for driver management system with subscription and payment features',
    endpoints: {
      'POST /AddDriver': 'Add a new driver',
      'GET /DriverByName/:name': 'Get driver by name', 
      'POST /MultipleByName': 'Get multiple drivers by names',
      'GET /Balance/:phone': 'Check driver balance',
      'POST /PayBalance/:phone': 'Pay driver balance',
      'POST /Subscribe': 'Add subscription balance',
      'GET /TransactionHistory/:phone': 'Get transaction history',
      'GET /health': 'Health check endpoint',
      'GET /api/info': 'API information'
    },
    database: {
      type: 'MongoDB',
      status: isConnected ? 'connected' : 'disconnected'
    }
  });
});

// Graceful shutdown handlers for PM2 and Docker
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (client) {
    client.close();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  if (client) {
    client.close();
  }
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});


// Export the app instance
module.exports = app;
