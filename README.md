# MERN Stack Book Management System

A production-ready full-stack web application for managing book records with secure authentication.

## Tech Stack

- **MongoDB** - NoSQL database (MongoDB Atlas)
- **Express.js** - Backend framework
- **React.js + Vite** - Frontend framework
- **Node.js** - Runtime environment
- **JWT** - Authentication
- **Axios** - HTTP client with interceptors

## Features

- User authentication (Register/Login) with JWT
- Complete CRUD operations for books
- Protected routes
- Responsive design
- RESTful API architecture
- Production deployment ready

## Project Structure

```
mern-book-management/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Book.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── books.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── BookCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddBook.jsx
│   │   │   └── EditBook.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the repository
```bash
git clone <repository-url>
cd mern-book-management
```

### 2. Install dependencies
```bash
npm run install-all
```

### 3. Backend Setup

Create `.env` file in the `backend` directory:
```bash
cd backend
copy .env.example .env
```

Update the `.env` file with your credentials:
```
PORT=5000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
```

### 4. Frontend Setup

Create `.env` file in the `frontend` directory:
```bash
cd frontend
copy .env.example .env
```

Update the `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the application

From the root directory:
```bash
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Books (Protected)
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Deployment

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string

### Backend Deployment (Render)
1. Push code to GitHub
2. Create account at [Render](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
6. Add environment variables:
   - `MONGO_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`
7. Deploy

### Frontend Deployment (Vercel)
1. Create account at [Vercel](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   - `VITE_API_URL=your_render_backend_url/api`
5. Deploy

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URL=mongodb+srv://...
JWT_SECRET=your_secret_key
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_URL=https://your-api.render.com/api
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- HTTP-only token storage
- Request/Response interceptors
- Input validation
- CORS configuration

## Development

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

## Production Build

### Frontend
```bash
cd frontend
npm run build
```

## License

MIT

## Author

Your Name
