# 🚀 Quick Reference Guide

## 📋 Commands Cheat Sheet

### Installation
```bash
npm run install-all          # Install all dependencies
```

### Development
```bash
npm run dev                  # Run both frontend & backend
npm run server               # Run backend only
npm run client               # Run frontend only
```

### Individual Services
```bash
# Backend
cd backend
npm run dev                  # Development with nodemon
npm start                    # Production

# Frontend
cd frontend
npm run dev                  # Development server
npm run build                # Production build
npm run preview              # Preview production build
```

## 🌐 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | React application |
| Backend | http://localhost:5000 | Express API |
| API Docs | http://localhost:5000/ | API status |

## 🔑 API Endpoints

### Authentication (Public)
```
POST /api/auth/register      # Register new user
POST /api/auth/login         # Login user
```

### Books (Protected - Requires JWT)
```
GET    /api/books            # Get all books
GET    /api/books/:id        # Get single book
POST   /api/books            # Create book
PUT    /api/books/:id        # Update book
DELETE /api/books/:id        # Delete book
```

## 📦 Request/Response Examples

### Register User
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

// Response (same as register)
```

### Create Book
```javascript
POST /api/books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0-7432-7356-5",
  "publishedYear": 1925,
  "genre": "Fiction",
  "description": "A classic American novel"
}

// Response
{
  "message": "Book created successfully",
  "book": {
    "_id": "65abc456...",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "publishedYear": 1925,
    "genre": "Fiction",
    "description": "A classic American novel",
    "createdBy": "65abc123...",
    "createdAt": "2026-03-04T10:30:00.000Z",
    "updatedAt": "2026-03-04T10:30:00.000Z"
  }
}
```

### Get All Books
```javascript
GET /api/books
Authorization: Bearer <token>

// Response
[
  {
    "_id": "65abc456...",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "publishedYear": 1925,
    "genre": "Fiction",
    "description": "A classic American novel",
    "createdBy": {
      "_id": "65abc123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2026-03-04T10:30:00.000Z",
    "updatedAt": "2026-03-04T10:30:00.000Z"
  }
]
```

## 🔧 Environment Variables

### Backend (.env)
```bash
PORT=5000
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/bookmanagement
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

## 📁 Important Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Express server entry point |
| `backend/models/User.js` | User schema & methods |
| `backend/models/Book.js` | Book schema |
| `backend/routes/auth.js` | Auth endpoints |
| `backend/routes/books.js` | Book CRUD endpoints |
| `backend/middleware/auth.js` | JWT verification |
| `frontend/src/App.jsx` | React app & routes |
| `frontend/src/api.js` | Axios configuration |
| `frontend/src/context/AuthContext.jsx` | Auth state management |

## 🐛 Common Issues & Solutions

### Issue: Backend won't start
```bash
# Check MongoDB connection
# Verify MONGO_URL in backend/.env
# Test connection string format
```

### Issue: Frontend can't reach backend
```bash
# Ensure backend is running on port 5000
# Check VITE_API_URL in frontend/.env
# Verify CORS settings in backend/server.js
```

### Issue: Authentication not working
```bash
# Check JWT_SECRET is set in backend/.env
# Verify token is stored in localStorage
# Check Authorization header format: "Bearer <token>"
```

### Issue: MongoDB connection error
```bash
# Verify connection string format
# Check MongoDB Atlas network access (whitelist IP)
# Ensure database user has correct permissions
# Test connection string with MongoDB Compass
```

## 🧪 Testing with Postman/Thunder Client

### 1. Register a user
```
POST http://localhost:5000/api/auth/register
Body: { "name": "Test", "email": "test@test.com", "password": "test123" }
```

### 2. Copy the token from response

### 3. Test protected route
```
GET http://localhost:5000/api/books
Headers: Authorization: Bearer <paste_token_here>
```

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Book Collection
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  isbn: String (unique),
  publishedYear: Number,
  genre: String,
  description: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Frontend Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Dashboard | Protected |
| `/add-book` | AddBook | Protected |
| `/edit-book/:id` | EditBook | Protected |
| `/` | Redirect to Dashboard | - |

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens (7 day expiry)
- ✅ Protected API routes
- ✅ Request/Response interceptors
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variables for secrets

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Performance Tips

1. Use MongoDB indexes for faster queries
2. Implement pagination for large datasets
3. Add caching with Redis (optional)
4. Optimize images and assets
5. Use lazy loading for routes
6. Implement debouncing for search

## 📞 Support Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [JWT.io](https://jwt.io/)

## 🎯 Quick Start Checklist

- [ ] Install dependencies (`npm run install-all`)
- [ ] Create MongoDB Atlas account
- [ ] Get MongoDB connection string
- [ ] Update `backend/.env` with MONGO_URL
- [ ] Run application (`npm run dev`)
- [ ] Open http://localhost:3000
- [ ] Register a new account
- [ ] Add your first book!

---

**Pro Tip:** Keep this file open while developing for quick reference!
