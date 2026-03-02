# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

**Windows:**
```bash
install.bat
```

**Mac/Linux:**
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Step 2: Setup Environment (1 minute)

**Option A: Use Local MongoDB**
```bash
# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/numerology
JWT_SECRET=mysecretkey123
FRONTEND_URL=http://localhost:5173
```

**Option B: Use MongoDB Atlas (Free)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update backend/.env:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/numerology
```

**Frontend .env:**
```bash
# frontend/.env
VITE_API_URL=http://localhost:5000
```

### Step 3: Start Application (1 minute)

**Windows:**
```bash
start.bat
```

**Mac/Linux:**
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

### Step 4: Access Application

Open browser: **http://localhost:5173**

### Step 5: Test It Out

1. Enter your name: "John Doe"
2. Select date of birth
3. Choose language (try Hinglish!)
4. Click "Generate My Report"
5. View your complete numerology analysis!

## 🎯 What You Get

- ✅ Life Path Number with detailed interpretation
- ✅ Birthday, Expression, Soul Urge, Personality Numbers
- ✅ Maturity and Personal Year predictions
- ✅ Karmic Debt detection
- ✅ Lucky numbers and dates
- ✅ Career suggestions
- ✅ Relationship insights
- ✅ PDF download
- ✅ Shareable links

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas (free cloud database)
```

### Port Already in Use
```bash
# Change ports in .env files
# Backend: PORT=5001
# Frontend: Update vite.config.js port
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules && npm install
cd frontend && rm -rf node_modules && npm install
```

## 📱 Create Your First Report

1. **Home Page** → Enter details
2. **Generate** → Wait 2 seconds
3. **View Report** → See all your numbers
4. **Download PDF** → Save for later
5. **Share Link** → Send to friends

## 👤 Optional: Create Account

1. Click "Sign Up"
2. Enter email and password
3. Access Dashboard
4. View all your reports

## 🔐 Admin Access

To create an admin user:
1. Register normally
2. Open MongoDB
3. Find your user
4. Set `isAdmin: true`
5. Access `/admin` route

## 🌍 Try Different Languages

- English: Professional interpretations
- Hindi: Full Devanagari script
- Hinglish: "Aap ek natural leader hain"
- Spanish: "Eres un líder nato"
- French: "Vous êtes un leader né"
- Arabic: Right-to-left support

## 📊 Sample Test Data

**Test User 1:**
- Name: Sarah Johnson
- DOB: 1990-05-15
- Language: English

**Test User 2:**
- Name: Raj Kumar
- DOB: 1985-08-20
- Language: Hinglish

**Test User 3:**
- Name: Maria Garcia
- DOB: 1992-12-03
- Language: Spanish

## 🎨 Customize

**Change Colors:**
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1', // Change this
  secondary: '#8b5cf6', // And this
}
```

**Add Language:**
1. Create `backend/languages/your-lang.json`
2. Copy structure from `en.json`
3. Translate all text
4. Add to language dropdown in `Home.jsx`

## 📈 Next Steps

- [ ] Deploy to production (see DEPLOYMENT.md)
- [ ] Add more interpretations
- [ ] Customize styling
- [ ] Add new features
- [ ] Share with friends!

## 💡 Pro Tips

1. **Bookmark Reports**: Copy share link for later
2. **Compare Reports**: Generate for family/friends
3. **PDF Reports**: Download for offline reading
4. **Lucky Dates**: Check weekly for best days
5. **Karmic Debt**: Pay attention to these numbers

## 🆘 Need Help?

- Check README.md for detailed docs
- See PROJECT_OVERVIEW.md for architecture
- Read DEPLOYMENT.md for production setup

## 🎉 You're Ready!

Your numerology application is now running. Start generating reports and discovering life paths!

---

**Happy Numerology! ✨🔢**
