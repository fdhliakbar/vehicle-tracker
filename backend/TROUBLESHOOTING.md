# 🔧 Troubleshooting Supabase Connection

## Issue: Can't reach database server

### Possible Solutions:

## 1. 🔍 Verify Database Password
Pastikan password database benar dari Supabase Dashboard:

**Steps:**
1. Login ke https://supabase.com
2. Select your project: `efnhjdeajpztmoyumtgq`
3. Go to **Settings** → **Database**
4. Scroll to **Connection string** section
5. Copy the **exact** connection string provided

## 2. 🔑 Alternative Connection Methods

### Method A: Using Connection Pooler
```env
DATABASE_URL="postgresql://postgres.efnhjdeajpztmoyumtgq:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### Method B: Direct Connection
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.efnhjdeajpztmoyumtgq.supabase.co:5432/postgres"
```

### Method C: URL Encoded Password (if special chars)
If password contains special characters like `[]`, `@`, `#`, etc:
```env
DATABASE_URL="postgresql://postgres:encoded_password_here@db.efnhjdeajpztmoyumtgq.supabase.co:5432/postgres"
```

## 3. 🌐 Check Database Status
- Make sure your Supabase project is **active** (not paused)
- Check if you're on free tier and haven't exceeded limits

## 4. 🔌 Test Connection with psql (optional)
If you have PostgreSQL client installed:
```bash
psql "postgresql://postgres:[PASSWORD]@db.efnhjdeajpztmoyumtgq.supabase.co:5432/postgres"
```

## 5. 📝 Common Issues:
- **Bracket characters `[]`** in password need to be removed or URL-encoded
- **Case sensitivity** matters in password
- **Copy-paste errors** from dashboard
- **Project is paused** (free tier limitation)

## Next Steps:
1. Double-check password from Supabase dashboard
2. Try connection pooler URL instead of direct connection
3. If still failing, try creating a new database password in Supabase
