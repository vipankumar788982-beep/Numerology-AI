# Numerology Insight

A complete production-ready responsive web application that generates full numerology reports using the Pythagorean numerology method with multi-language support.

## Features

- Complete numerology calculations (Life Path, Expression, Soul Urge, Personality, Maturity, Personal Year)
- Karmic Debt Number detection (13, 14, 16, 19)
- Multi-language support (English, Hindi, Hinglish, Spanish, French, Arabic)
- PDF report generation
- Shareable report links
- User authentication (JWT)
- Admin dashboard for managing interpretations
- Responsive mobile-first design

## Tech Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Setup

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:

Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/numerology
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:5173
```

Create `.env` file in frontend folder:
```
VITE_API_URL=http://localhost:5000
```

4. Start MongoDB (if running locally)

5. Run the application:

```bash
# Start backend (from backend folder)
npm run dev

# Start frontend (from frontend folder)
npm run dev
```

6. Access the application at `http://localhost:5173`

## Project Structure

```
numerology-insight/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── languages/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   └── public/
└── README.md
```

## API Endpoints

- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- POST `/api/reports/generate` - Generate numerology report
- GET `/api/reports/:id` - Get report by ID
- GET `/api/reports/user/:userId` - Get user reports
- PUT `/api/admin/interpretations` - Update interpretations (admin)

## Deployment

Ready for deployment to platforms like Vercel (frontend) and Render/Railway (backend).

## License

MIT
