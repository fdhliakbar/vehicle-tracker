# Vehicle Tracker API Testing Commands
# Make sure your backend server is running on http://localhost:5000

Write-Host "🧪 Testing Vehicle Tracker API..." -ForegroundColor Green

# 1. Health Check
Write-Host "`n1. Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000" -Method GET
    Write-Host "✅ Health Check Success:" -ForegroundColor Green
    $health | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Get All Vehicles
Write-Host "`n2. Testing Get All Vehicles..." -ForegroundColor Yellow
try {
    $vehicles = Invoke-RestMethod -Uri "http://localhost:5000/api/vehicles" -Method GET
    Write-Host "✅ Get Vehicles Success:" -ForegroundColor Green
    Write-Host "Found $($vehicles.count) vehicles" -ForegroundColor Cyan
    $vehicles.data[0] | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Get Vehicles Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Get Vehicle by ID
Write-Host "`n3. Testing Get Vehicle by ID..." -ForegroundColor Yellow
try {
    $vehicle = Invoke-RestMethod -Uri "http://localhost:5000/api/vehicles/1" -Method GET
    Write-Host "✅ Get Vehicle Success:" -ForegroundColor Green
    $vehicle.data | ConvertTo-Json -Depth 2
} catch {
    Write-Host "❌ Get Vehicle Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. User Login
Write-Host "`n4. Testing User Login..." -ForegroundColor Yellow
try {
    $loginBody = @{
        email = "admin@widya.com"
        password = "admin123"
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "✅ Login Success:" -ForegroundColor Green
    Write-Host "User: $($loginResponse.data.user.name) ($($loginResponse.data.user.role))" -ForegroundColor Cyan
    $global:token = $loginResponse.data.token
    Write-Host "🔑 Token saved for next requests" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Login Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Get Profile (with token)
if ($global:token) {
    Write-Host "`n5. Testing Get Profile (Protected)..." -ForegroundColor Yellow
    try {
        $headers = @{
            "Authorization" = "Bearer $global:token"
            "Content-Type" = "application/json"
        }
        $profile = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/profile" -Method GET -Headers $headers
        Write-Host "✅ Get Profile Success:" -ForegroundColor Green
        $profile.data | ConvertTo-Json -Depth 2
    } catch {
        Write-Host "❌ Get Profile Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Green
