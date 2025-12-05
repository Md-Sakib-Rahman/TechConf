// test-db.js
require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

console.log('--- DEBUG START ---');

if (!uri) {
    console.error('ERROR: MONGO_URI is undefined. Check your .env file location.');
    process.exit(1);
}

// Log first 15 chars to verify it loaded (hiding password)
console.log(`URI detected: ${uri.substring(0, 15)}...`);

async function run() {
    try {
        console.log('Attempting to connect...');
        
        // Force a 5-second timeout so you don't wait forever
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000 
        });
        
        console.log('SUCCESS: Database connection established!');
        console.log('Connection State:', mongoose.connection.readyState); // Should be 1
    } catch (err) {
        console.error('CONNECTION FAILED:', err.message);
        
        if (err.message.includes('bad auth')) {
            console.log('-> HINT: Check your username and password in the URI.');
        } else if (err.message.includes('querySrv')) {
            console.log('-> HINT: This is usually a DNS/Network issue.');
        } else {
            console.log('-> HINT: Your IP address might be blocked by MongoDB Atlas.');
        }
    } finally {
        await mongoose.disconnect();
        console.log('--- DEBUG END ---');
    }
}

run();