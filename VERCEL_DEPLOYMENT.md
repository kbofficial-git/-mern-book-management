# 🚀 Vercel Deployment Guide - Frontend Only

## Important: Deploy Frontend Only

Vercel is for the **frontend** (React app) only.
The **backend** should be deployed to Render or another Node.js hosting service.

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub

Make sure your code is pushed to GitHub:
```bash
git push origin main
```

### Step 2: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Build Settings

**IMPORTANT:** Configure these settings:

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Detailed Configuration:**

- **Framework Preset:** Select "Vite" from dropdown
- **Root Directory:** Type `frontend` (this tells Vercel where your frontend code is)
- **Build Command:** `npm run build` (default is fine)
- **Output Directory:** `dist` (default is fine)
- **Install Command:** `npm install` (default is fine)

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

```
Name: VITE_API_URL
Value: https://your-backend-url.onrender.com/api
```

**Note:** Replace `your-backend-url.onrender.com` with your actual backend URL from Render.

If you haven't deployed the backend yet, you can:
- Use a placeholder for now: `http://localhost:5000/api`
- Update it later after deploying backend

### Step 5: Deploy

Click "Deploy" button and wait for deployment to complete.

## 🔧 If You Get "Code Not Found" Error

This means Vercel can't find your code. Fix it by:

1. **Set Root Directory to `frontend`** in project settings
2. Go to Project Settings → General → Root Directory
3. Enter: `frontend`
4. Save and redeploy

## 📝 Alternative: Deploy from Frontend Folder

If the above doesn't work, you can deploy just the frontend folder:

### Option A: Create Separate Frontend Repo

1. Create a new repository for frontend only
2. Copy only the `frontend` folder contents
3. Push to new repo
4. Deploy that repo to Vercel (no root directory needed)

### Option B: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend folder
cd frontend

# Deploy
vercel

# Follow prompts
```

## 🌐 After Deployment

### Update Backend CORS

After deploying, update your backend CORS settings to allow your Vercel domain:

In `backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Update Environment Variable

If you used a placeholder API URL, update it:

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Edit `VITE_API_URL`
4. Set to your actual backend URL
5. Redeploy

## ✅ Verification

After deployment:

1. Visit your Vercel URL
2. Try to register/login
3. Check browser console for errors
4. Verify API calls are going to correct backend URL

## 🐛 Common Issues

### Issue: "Code Not Found"
**Solution:** Set Root Directory to `frontend` in Vercel settings

### Issue: "Build Failed"
**Solution:** Check build logs, ensure all dependencies are in package.json

### Issue: "API calls failing"
**Solution:** 
- Check VITE_API_URL environment variable
- Verify backend is deployed and running
- Check backend CORS settings

### Issue: "Environment variables not working"
**Solution:** 
- Vercel requires `VITE_` prefix for Vite apps
- Redeploy after adding environment variables

## 📊 Project Structure for Vercel

```
your-repo/
├── frontend/          ← Vercel deploys THIS folder
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/           ← Deploy to Render separately
└── vercel.json        ← Root config (optional)
```

## 🎯 Quick Checklist

Before deploying:
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render (or have backend URL)
- [ ] Know your backend API URL

During deployment:
- [ ] Set Root Directory to `frontend`
- [ ] Select Vite as framework
- [ ] Add VITE_API_URL environment variable
- [ ] Deploy

After deployment:
- [ ] Test registration/login
- [ ] Update backend CORS if needed
- [ ] Update API URL if using placeholder

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html

---

**Remember:** Vercel is for frontend only. Deploy backend to Render separately!
