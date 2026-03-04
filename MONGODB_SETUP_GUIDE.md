# 🍃 MongoDB Atlas Setup Guide

This guide will walk you through setting up MongoDB Atlas for your Book Management System.

## Step-by-Step Instructions

### 1. Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign In"**
3. Sign up with:
   - Email and password, OR
   - Google account, OR
   - GitHub account

### 2. Create a New Project

1. After logging in, click **"New Project"**
2. Enter project name: `BookManagement` (or any name you prefer)
3. Click **"Next"**
4. Add members (optional) or skip
5. Click **"Create Project"**

### 3. Build a Database Cluster

1. Click **"Build a Database"** or **"Create"**
2. Choose deployment option:
   - **Shared** (FREE) - Perfect for development
   - M0 Sandbox - 512 MB storage
3. Select cloud provider:
   - AWS, Google Cloud, or Azure
   - Choose region closest to you
4. Cluster name: `Cluster0` (default is fine)
5. Click **"Create"**

⏳ Wait 3-5 minutes for cluster creation

### 4. Create Database User

1. You'll see "Security Quickstart"
2. Under **"How would you like to authenticate your connection?"**
3. Choose **"Username and Password"**
4. Create credentials:
   ```
   Username: bookadmin
   Password: [Click "Autogenerate Secure Password" or create your own]
   ```
5. **IMPORTANT:** Copy and save your password somewhere safe!
6. Click **"Create User"**

### 5. Configure Network Access

1. Under **"Where would you like to connect from?"**
2. Choose **"My Local Environment"**
3. Click **"Add My Current IP Address"**
4. For development, also add:
   - Click **"Add IP Address"**
   - Enter: `0.0.0.0/0`
   - Description: `Allow all IPs`
   - Click **"Add Entry"**

⚠️ **Note:** `0.0.0.0/0` allows access from anywhere. For production, restrict to specific IPs.

5. Click **"Finish and Close"**

### 6. Get Connection String

1. Click **"Go to Databases"**
2. On your cluster, click **"Connect"**
3. Choose **"Connect your application"**
4. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
5. Copy the connection string:
   ```
   mongodb+srv://bookadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 7. Modify Connection String

Your connection string needs to be modified:

**Original:**
```
mongodb+srv://bookadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Modified (what you need):**
```
mongodb+srv://bookadmin:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/bookmanagement?retryWrites=true&w=majority
```

Changes made:
1. Replace `<password>` with your actual password
2. Add `/bookmanagement` before the `?`

**Example:**
```
mongodb+srv://bookadmin:MySecurePass123@cluster0.abc123.mongodb.net/bookmanagement?retryWrites=true&w=majority
```

### 8. Update Your Application

1. Open `backend/.env` file
2. Replace the MONGO_URL line with your connection string:

```env
PORT=5000
MONGO_URL=mongodb+srv://bookadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bookmanagement?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_32chars_minimum
NODE_ENV=development
```

3. Save the file

### 9. Test Connection

Run your backend:
```bash
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
Connected to MongoDB
```

✅ If you see this, you're connected!

## 🎯 Quick Checklist

- [ ] Created MongoDB Atlas account
- [ ] Created new project
- [ ] Built free cluster (M0)
- [ ] Created database user with password
- [ ] Saved password securely
- [ ] Added IP address (0.0.0.0/0 for development)
- [ ] Copied connection string
- [ ] Modified connection string (added /bookmanagement)
- [ ] Replaced <password> with actual password
- [ ] Updated backend/.env file
- [ ] Tested connection by running backend

## 🔍 Verify Your Setup

### Check in MongoDB Atlas:

1. Go to **"Database"** in left sidebar
2. Click **"Browse Collections"** on your cluster
3. After running your app and registering a user, you should see:
   - Database: `bookmanagement`
   - Collections: `users`, `books`

### Test in Your Application:

1. Start the application: `npm run dev`
2. Open http://localhost:3000
3. Register a new user
4. Add a book
5. Check MongoDB Atlas - you should see the data!

## 🐛 Troubleshooting

### Error: "MongoServerError: bad auth"
- ❌ Wrong username or password
- ✅ Double-check credentials in connection string
- ✅ Ensure no special characters are URL-encoded

### Error: "MongooseServerSelectionError"
- ❌ Network access not configured
- ✅ Add 0.0.0.0/0 to IP whitelist
- ✅ Check if cluster is running

### Error: "Connection string is invalid"
- ❌ Malformed connection string
- ✅ Ensure format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?options`
- ✅ Check for spaces or line breaks

### Can't see database in Atlas
- ❌ Database only appears after first write
- ✅ Register a user or add a book first
- ✅ Refresh the Collections view

## 📊 Connection String Breakdown

```
mongodb+srv://bookadmin:MyPass123@cluster0.abc123.mongodb.net/bookmanagement?retryWrites=true&w=majority
│              │         │         │                          │              │
│              │         │         │                          │              └─ Write concern
│              │         │         │                          └─ Database name
│              │         │         └─ Cluster hostname
│              │         └─ Password
│              └─ Username
└─ Protocol
```

## 🔐 Security Best Practices

1. **Never commit .env files**
   - Already in .gitignore
   - Never share your connection string publicly

2. **Use strong passwords**
   - Minimum 12 characters
   - Mix of letters, numbers, symbols

3. **Restrict IP access in production**
   - Don't use 0.0.0.0/0 in production
   - Add only your server's IP

4. **Rotate credentials regularly**
   - Change passwords every 90 days
   - Update in your .env file

## 📱 MongoDB Atlas Features

### Free Tier (M0) Includes:
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Shared vCPU
- ✅ Perfect for development
- ✅ No credit card required

### Useful Features:
- **Charts**: Visualize your data
- **Realm**: Build mobile apps
- **Atlas Search**: Full-text search
- **Triggers**: Database events
- **Backups**: Automatic backups (paid tiers)

## 🎓 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI tool

## 💡 Pro Tips

1. **Use MongoDB Compass** for visual database management
   - Download: https://www.mongodb.com/products/compass
   - Connect using the same connection string

2. **Monitor your usage**
   - Check Atlas dashboard regularly
   - Set up alerts for storage limits

3. **Create indexes** for better performance
   - Email index (already unique)
   - ISBN index (already unique)
   - Add more as needed

4. **Backup your data**
   - Export collections regularly
   - Use mongodump/mongorestore

## ✅ You're Ready!

Once you've completed these steps and see "Connected to MongoDB" in your terminal, you're all set to use the Book Management System!

Next steps:
1. Run the application: `npm run dev`
2. Open http://localhost:3000
3. Register and start managing books!

---

**Need Help?** Check the troubleshooting section or refer to MongoDB Atlas documentation.
