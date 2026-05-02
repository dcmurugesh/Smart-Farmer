#!/bin/bash

# Smart Farmer Portal - Setup Script for Linux/macOS
# This script installs dependencies and guides you to start the servers

echo ""
echo "============================================"
echo "Smart Farmer Information Portal Setup"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[✓] Node.js is installed: $(node --version)"
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "[ERROR] Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "[✓] Backend dependencies installed"
echo ""

# Check MongoDB
echo "MongoDB Setup:"
echo "[1] Using Local MongoDB (requires mongod running)"
echo "[2] Using MongoDB Atlas (Cloud)"
echo ""
read -p "Choose MongoDB option (1 or 2): " dbChoice

if [ "$dbChoice" = "2" ]; then
    echo ""
    echo "To use MongoDB Atlas:"
    echo "1. Sign up at https://mongodb.com/cloud/atlas"
    echo "2. Create a cluster"
    echo "3. Get your connection string"
    echo "4. Update backend/.env with your connection string"
    echo ""
fi

echo ""
echo "============================================"
echo "Setup Complete!"
echo "============================================"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd frontend"
echo "  npx live-server --port=3000"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "For more information, see README.md or QUICKSTART.md"
echo ""
