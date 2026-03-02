import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
    
    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('⚠️  MongoDB connection error:', error.message);
    console.log('💡 Please install MongoDB locally or use MongoDB Atlas (free cloud database)');
    console.log('📖 See QUICKSTART.md for setup instructions');
    console.log('\n🔗 Quick MongoDB Atlas setup:');
    console.log('   1. Go to https://www.mongodb.com/cloud/atlas');
    console.log('   2. Create free account and cluster');
    console.log('   3. Get connection string');
    console.log('   4. Update MONGODB_URI in backend/.env\n');
    process.exit(1);
  }
};

export default connectDB;
