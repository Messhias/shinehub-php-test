#!/bin/bash


clear

echo "Starting your application"\

echo "Hi, $USER"


echo "Running up your containers"
docker-compose up -d

echo "Running your application!"
cd frontend && npm start
