# MongoDB Setup Guide

## ⚠️ MongoDB Required

The application needs MongoDB to store user data and reports. You have two options:

## Option 1: MongoDB Atlas (Recommended - Free & Easy)

### Steps (5 minutes):

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free account

2. **Create a Free Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region close to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Create Database User**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `numerology`
   - Password: `numerology123` (or your own)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Allow Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" (Clusters)
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://numerology:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update backend/.env**
   ```
   MONGODB_URI=mongodb+srv://numerology:numerology123@cluster0.xxxxx.mongodb.net/numerology?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual password
   Replace `cluster0.xxxxx` with your actual cluster address

7. **Restart Backend**
   - The backend will automatically reconnect
   - You should see: "✅ MongoDB connected successfully"

## Option 2: Local MongoDB Installation

### Windows:
1. Download: https://www.mongodb.com/try/download/community
2. Run installer (choose "Complete" installation)
3. Install as Windows Service
4. MongoDB will start automatically
5. No changes needed in backend/.env

### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# Start service
sudo systemctl start mongodb
```

## Verify Connection

After setup, restart the backend:
1. Stop the backend (Ctrl+C in terminal)
2. Start again: `npm run dev` in backend folder
3. Look for: "✅ MongoDB connected successfully"

## Test the Application

Once MongoDB is connected:
1. Open http://localhost:5173
2. Generate a test report
3. Create an account
4. View your dashboard

## Troubleshooting

### "ECONNREFUSED" Error
- MongoDB is not running
- Check connection string is correct
- For Atlas: Verify IP whitelist includes your IP

### "Authentication Failed"
- Check username/password in connection string
- Verify database user was created in Atlas

### "Network Timeout"
- Check internet connection (for Atlas)
- Verify firewall allows MongoDB connections
- For Atlas: Check Network Access settings

## Quick Test Connection

You can test your MongoDB connection:

```javascript
// test-connection.js
import mongoose from 'mongoose';

const uri = 'YOUR_MONGODB_URI_HERE';

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  });
```

Run: `node test-connection.js`

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Installation: https://docs.mongodb.com/manual/installation/
- Community Support: https://www.mongodb.com/community/forums/

---

**Once MongoDB is set up, your application will be fully functional!** 🚀
