# Deployment Guide

## Local Development

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)

### Quick Start

1. Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```

2. Configure environment variables:
```bash
# Backend (.env)
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and JWT secret

# Frontend (.env)
cp frontend/.env.example frontend/.env
```

3. Start MongoDB (if local):
```bash
mongod
```

4. Run the application:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. Access at `http://localhost:5173`

## Production Deployment

### Backend (Render/Railway/Heroku)

1. Create a new web service
2. Connect your repository
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Strong random secret
   - `FRONTEND_URL`: Your frontend URL
   - `NODE_ENV`: production

4. Build command: `cd backend && npm install`
5. Start command: `cd backend && npm start`

### Frontend (Vercel/Netlify)

1. Create a new project
2. Set build settings:
   - Build command: `cd frontend && npm run build`
   - Output directory: `frontend/dist`
3. Set environment variable:
   - `VITE_API_URL`: Your backend API URL

### MongoDB Atlas Setup

1. Create a free cluster at mongodb.com/cloud/atlas
2. Create a database user
3. Whitelist IP addresses (0.0.0.0/0 for development)
4. Get connection string and add to backend .env

## Docker Deployment (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/numerology
      - JWT_SECRET=your_secret_here
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:5000

volumes:
  mongo-data:
```

Run: `docker-compose up`

## Security Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Use MongoDB Atlas with authentication
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS in production
- [ ] Set secure cookie flags
- [ ] Rate limit API endpoints
- [ ] Validate all user inputs
- [ ] Keep dependencies updated

## Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Optimize database queries with indexes
- Use connection pooling for MongoDB
