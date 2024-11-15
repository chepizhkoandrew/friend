#!/bin/bash

# Scan for .env files
echo "Scanning for .env files..."
find . -type f -name ".env" -print

# Scan for environment variables in JavaScript/TypeScript files
echo "Scanning for environment variables in JavaScript/TypeScript files..."
grep -r --include=\*.{js,ts} 'process.env' .

# Scan for environment variables in other common configuration files
echo "Scanning for environment variables in common configuration files..."
grep -r --include=\*.{json,yml,yaml} 'process.env' .

echo "Scan complete."