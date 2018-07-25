#!/bin/bash


clear

echo "Installing your application."

echo "Hi, $USER"


echo "Installing containers."
docker build .

echo "Installing backend."
cd backend && composer install && cp .env.example .env
cd ..

echo "Installing frontend."
cd frontend && npm install
cd ..

clear

echo "Installed successful!!"
echo "Running your application..."

docker-compose up -d

cd frontend && npm start
