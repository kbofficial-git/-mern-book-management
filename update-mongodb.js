// Quick script to update MongoDB connection string
// Usage: node update-mongodb.js YOUR_PASSWORD

const fs = require('fs');
const path = require('path');

const password = process.argv[2];

if (!password) {
  console.log('❌ Please provide your MongoDB password!');
  console.log('');
  console.log('Usage: node update-mongodb.js YOUR_PASSWORD');
  console.log('');
  console.log('Example: node update-mongodb.js MySecurePass123');
  console.log('');
  process.exit(1);
}

const connectionString = `mongodb+srv://bookadmin:${password}@bookadmin.jxwhoy0.mongodb.net/bookmanagement?retryWrites=true&w=majority&appName=bookadmin`;

const envPath = path.join(__dirname, 'backend', '.env');
const envContent = `PORT=5000
MONGO_URL=${connectionString}
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_32chars_minimum
NODE_ENV=development
`;

fs.writeFileSync(envPath, envContent);

console.log('✅ MongoDB connection string updated successfully!');
console.log('');
console.log('Connection string:');
console.log(connectionString);
console.log('');
console.log('The backend will automatically restart and connect to MongoDB.');
console.log('');
