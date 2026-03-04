# Quick Setup Guide

## ✅ Installation Complete!

All dependencies have been installed successfully.

## 🔧 Configuration Required

### Step 1: MongoDB Atlas Setup

You need to set up MongoDB Atlas and get your connection string:

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new cluster (Free tier available)
4. Create a database user:
   - Go to "Database Access"
   - Add new user with username and password
5. Whitelist your IP:
   - Go to "Network Access"
   - Add IP Address: `0.0.0.0/0` (allows all IPs)
6. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### Step 2: Update Backend Environment Variables

Open `backend/.env` and update:

```
MONGO_URL=your_actual_mongodb_connection_string_here
```

Replace the entire MONGO_URL value with your MongoDB Atlas connection string.

**Important:** Make sure to:
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add `/bookmanagement` before the `?` in the URL

Example:
```
MONGO_URL=mongodb+srv://myuser:mypass123@cluster0.abc123.mongodb.net/bookmanagement?retryWrites=true&w=majority
```

### Step 3: Update JWT Secret (Optional but Recommended)

In `backend/.env`, change the JWT_SECRET to a random string:
```
JWT_SECRET=your_random_secret_key_here_make_it_long_and_secure
```

## 🚀 Running the Application

### Option 1: Run Both (Recommended)
From the root directory:
```bash
npm run dev
```

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📱 Access the Application

Once running:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🎯 First Steps

1. Open http://localhost:3000
2. Click "Register" to create an account
3. Fill in your details and register
4. You'll be automatically logged in
5. Start adding books!

## 🐛 Troubleshooting

### Backend won't start?
- Check if MongoDB connection string is correct in `backend/.env`
- Make sure MongoDB Atlas network access allows your IP
- Verify database user credentials

### Frontend can't connect to backend?
- Make sure backend is running on port 5000
- Check `frontend/.env` has correct API URL
- Look for CORS errors in browser console

### Port already in use?
- Backend: Change PORT in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

## 📚 What's Next?

- Read `README.md` for full documentation
- Check `DEPLOYMENT.md` for production deployment
- Explore the API endpoints
- Customize the UI in `frontend/src/index.css`

## 🔐 Security Notes

- Never commit `.env` files to Git
- Change JWT_SECRET before production
- Use strong passwords for MongoDB
- Restrict MongoDB network access in production

## 📞 Need Help?

Check the documentation:
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Express.js: https://expressjs.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/

---

**Current Status:**
✅ Dependencies installed
✅ Project structure created
✅ Environment files created
⚠️ MongoDB connection needed
⚠️ Ready to run after MongoDB setup
