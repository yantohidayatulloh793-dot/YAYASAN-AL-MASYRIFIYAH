# Troubleshooting Guide

## Backend Issues

### MongoDB Connection Error
**Problem**: Cannot connect to MongoDB

**Solution**:
1. Ensure MongoDB is running: `mongod`
2. Check MONGODB_URI in .env
3. Verify MongoDB port (default: 27017)
4. Try connecting manually: `mongo mongodb://localhost:27017/yayasan-absensi`

### Port Already in Use
**Problem**: Port 5000 already in use

**Solution**:
1. Find process: `lsof -i :5000`
2. Kill process: `kill -9 <PID>`
3. Or change PORT in .env

### JWT Token Error
**Problem**: Token not valid or expired

**Solution**:
1. Check JWT_SECRET in .env
2. Regenerate token by login again
3. Check token expiry: `JWT_EXPIRE=7d`

## Frontend Issues

### API Connection Error
**Problem**: Cannot connect to API

**Solution**:
1. Ensure backend is running
2. Check REACT_APP_API_URL in .env
3. Verify CORS configuration in backend
4. Check network tab in browser DevTools

### Page Blank/Error
**Problem**: React page shows blank

**Solution**:
1. Check browser console for errors
2. Clear cache: Ctrl+Shift+Delete
3. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Styling Issues
**Problem**: TailwindCSS not working

**Solution**:
1. Check index.css imports
2. Rebuild CSS: `npm run build`
3. Verify tailwind config

## Common Errors

### Error: Cannot find module
**Solution**: Run `npm install` in affected directory

### Error: EADDRINUSE
**Solution**: Change port or kill existing process

### Error: CORS error
**Solution**: Check CORS config in backend/server.js

### Error: 401 Unauthorized
**Solution**: 
1. Login again
2. Check token in localStorage
3. Verify JWT_SECRET matches

---

## Getting Help

If issues persist:
1. Check logs in console
2. Review error messages carefully
3. Search GitHub issues
4. Ask in discussions
