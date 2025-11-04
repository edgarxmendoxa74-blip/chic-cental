#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Testing Lalamove Backend API${NC}\n"

# Test 1: Health Check
echo -e "${GREEN}1️⃣ Testing Health Check...${NC}"
curl -s http://localhost:4000/ | json_pp
echo -e "\n"

# Test 2: Get Quotation
echo -e "${GREEN}2️⃣ Testing Get Quotation...${NC}"
curl -s -X POST http://localhost:4000/get-quotation \
  -H "Content-Type: application/json" \
  -d '{
    "dropoff": {
      "address": "SM Aura, Taguig",
      "lat": "14.5536",
      "lng": "121.0492"
    },
    "serviceType": "MOTORCYCLE"
  }' | json_pp
echo -e "\n"

# Test 3: Create Delivery (commented out to avoid creating real orders)
echo -e "${GREEN}3️⃣ Testing Create Delivery...${NC}"
echo -e "${BLUE}(Uncomment in script to test - creates real order in sandbox)${NC}"
# curl -s -X POST http://localhost:4000/create-delivery \
#   -H "Content-Type: application/json" \
#   -d '{
#     "customerName": "Juan Dela Cruz",
#     "phone": "09171234567",
#     "dropoff": {
#       "address": "SM Aura, Taguig",
#       "lat": "14.5536",
#       "lng": "121.0492"
#     },
#     "serviceType": "MOTORCYCLE",
#     "remarks": "Please call upon arrival",
#     "orderTotal": "500"
#   }' | json_pp

echo -e "\n${GREEN}✅ Tests complete!${NC}"

