# 🔒 Security Guidelines

## Environment Variables

### Development
For development, you can use the default passwords in `.env`:
```env
DEFAULT_ADMIN_PASSWORD="admin123"
DEFAULT_USER_PASSWORD="user123"
DEFAULT_DEMO_PASSWORD="demo123"
```

### Production  
For production deployment, **ALWAYS** change these to secure passwords:
```env
DEFAULT_ADMIN_PASSWORD="your-very-secure-admin-password-here"
DEFAULT_USER_PASSWORD="your-very-secure-user-password-here"
DEFAULT_DEMO_PASSWORD="your-very-secure-demo-password-here"
```

## Test Accounts

After seeding, you can login with:
- **Admin**: `admin@widya.com` / (password from DEFAULT_ADMIN_PASSWORD)
- **User**: `user@widya.com` / (password from DEFAULT_USER_PASSWORD)
- **Demo**: `demo@widya.com` / (password from DEFAULT_DEMO_PASSWORD)

## GitGuardian

If GitGuardian detects secrets, it's because the defaults are visible. This is acceptable for development, but ensure production uses secure passwords via environment variables.
