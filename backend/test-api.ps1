# PowerShell test script for Lalamove Backend API

Write-Host "`n🧪 Testing Lalamove Backend API`n" -ForegroundColor Blue

# Test 1: Health Check
Write-Host "1️⃣ Testing Health Check..." -ForegroundColor Green
$response = Invoke-RestMethod -Uri "http://localhost:4000/" -Method Get
$response | ConvertTo-Json -Depth 10
Write-Host ""

# Test 2: Get Quotation
Write-Host "2️⃣ Testing Get Quotation..." -ForegroundColor Green
$quotationBody = @{
    dropoff = @{
        address = "SM Aura, Taguig"
        lat = "14.5536"
        lng = "121.0492"
    }
    serviceType = "MOTORCYCLE"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:4000/get-quotation" `
    -Method Post `
    -ContentType "application/json" `
    -Body $quotationBody

$response | ConvertTo-Json -Depth 10
Write-Host ""

# Test 3: Create Delivery (commented out to avoid creating real orders)
Write-Host "3️⃣ Testing Create Delivery..." -ForegroundColor Green
Write-Host "(Uncomment in script to test - creates real order in sandbox)`n" -ForegroundColor Blue

<#
$deliveryBody = @{
    customerName = "Juan Dela Cruz"
    phone = "09171234567"
    dropoff = @{
        address = "SM Aura, Taguig"
        lat = "14.5536"
        lng = "121.0492"
    }
    serviceType = "MOTORCYCLE"
    remarks = "Please call upon arrival"
    orderTotal = "500"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:4000/create-delivery" `
    -Method Post `
    -ContentType "application/json" `
    -Body $deliveryBody

$response | ConvertTo-Json -Depth 10
#>

Write-Host "`n✅ Tests complete!" -ForegroundColor Green

