# Deployment Guide

## MongoDB Atlas Setup

### Step 1: Create Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project
4. Build a cluster (Free tier available)
5. Choose cloud provider and region

### Step 2: Configure Database Access
1. Go to Database Access
2. Add new database user
3. Set username and password
4. Grant read/write permissions

### Step 3: Configure Network Access
1. Go to Network Access
2. Add IP Address
3. Allow access from anywhere: `0.0.0.0/0` (for production, restrict to specific IPs)

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `bookmanagement`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bookmanagement?retryWrites=true&w=majority
```

## Backend Deployment on Render

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Ensure `backend/package.json` has correct scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 2: Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub

### Step 3: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure service:
   - **Name**: book-management-api
   - **Environment**: Node
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Root Directory**: backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 4: Add Environment Variables
1. Scroll to "Environment Variables"
2. Add the following:
   - `MONGO_URL`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a secure random string (32+ characters)
   - `NODE_ENV`: production
   - `PORT`: 5000

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy your service URL (e.g., `https://book-management-api.onrender.com`)

### Step 6: Test API
Visit: `https://your-service.onrender.com/`
Should return: `{"message": "Book Management API is running"}`

## Frontend Deployment on Vercel

### Step 1: Prepare Repository
Ensure your frontend code is in the `frontend` directory with proper structure.

### Step 2: Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### Step 3: Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Install Command**: `npm install`

### Step 4: Add Environment Variables
1. Go to "Environment Variables"
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-render-backend-url.onrender.com/api`
   - **Environment**: Production, Preview, Development

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at `https://your-app.vercel.app`

### Step 6: Configure Custom Domain (Optional)
1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Post-Deployment Configuration

### Update CORS Settings
In `backend/server.js`, update CORS to allow your Vercel domain:

```javascript
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Update MongoDB Network Access
If you want to restrict access:
1. Go to MongoDB Atlas → Network Access
2. Remove `0.0.0.0/0`
3. Add Render's IP addresses (check Render documentation)

## Continuous Deployment

### Automatic Deployments
Both Render and Vercel support automatic deployments:

1. **Render**: Automatically deploys when you push to main branch
2. **Vercel**: Automatically deploys on every push
   - Production: main branch
   - Preview: other branches

### Manual Deployment
- **Render**: Click "Manual Deploy" → "Deploy latest commit"
- **Vercel**: Push to GitHub or use Vercel CLI

## Monitoring & Logs

### Render
- View logs in the "Logs" tab
- Monitor metrics in the "Metrics" tab
- Set up alerts for downtime

### Vercel
- View deployment logs in project dashboard
- Monitor analytics and performance
- Check function logs for errors

### MongoDB Atlas
- Monitor database performance
- Set up alerts for high usage
- View slow queries

## Troubleshooting

### Backend Issues
1. Check Render logs for errors
2. Verify environment variables are set correctly
3. Test MongoDB connection string locally
4. Ensure all dependencies are in package.json

### Frontend Issues
1. Check Vercel deployment logs
2. Verify VITE_API_URL is correct
3. Test API endpoints with Postman
4. Check browser console for errors

### Database Issues
1. Verify MongoDB Atlas connection string
2. Check network access settings
3. Ensure database user has correct permissions
4. Monitor connection limits

## Security Checklist

- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable HTTPS only
- [ ] Restrict MongoDB network access
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting (optional)
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Backup database regularly

## Cost Optimization

### Free Tier Limits
- **MongoDB Atlas**: 512 MB storage
- **Render**: 750 hours/month (free tier)
- **Vercel**: Unlimited deployments, 100 GB bandwidth

### Tips
1. Use MongoDB indexes for better performance
2. Implement caching where possible
3. Optimize images and assets
4. Monitor usage regularly
5. Scale only when needed

## Maintenance

### Regular Tasks
1. Update dependencies monthly
2. Monitor error logs weekly
3. Check database performance
4. Review security advisories
5. Backup database regularly
6. Test critical features after updates

### Scaling
When you need to scale:
1. **Database**: Upgrade MongoDB Atlas tier
2. **Backend**: Upgrade Render plan or add instances
3. **Frontend**: Vercel scales automatically

## Support Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
