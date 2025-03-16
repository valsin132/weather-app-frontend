# Weather Application
## Overview
This project is a weather forecast application developed for the JavaScript Application Developer Internship at IBM. It provides real-time weather data using the OpenWeatherMap API, with a React frontend and a Node.js backend for logging user interactions.

# Features
## Frontend (React)
✅ Responsive design
✅ Searchable dropdown to select a city
✅ Browser stores three most-viewed cities
✅ Displays and suggests the most-viewed cities
✅ Shows current weather conditions (temperature, wind, humidity, etc.)
✅ Displays 5-day weather forecast

## Backend (Node.js)
✅ Saves user actions into MongoDB
✅ API connection to OpenWeatherMap for live data

# Installation Guide

Set Up Frontend
Clone the Repository
git clone https://github.com/valsin132/weather-app-frontend.git
cd frontend
npm install
npm run dev

Environment Variables (.env in /frontend)
VITE_OPENWEATHERMAP_API=your_api_key_here

Set Up Backend
Clone the Repository
git clone https://github.com/valsin132/weather-app-backend.git
cd backend
npm install
npm run dev

Environment Variables (.env in /backend)
PORT=
MONGO_URI=your_mongo_database

Usage Instructions
Start typing a city name in the search bar.
Select a city from the suggestions.
The page will display the current weather and 5-day forecast.
Three most-viewed cities will be stored and suggested.
The backend logs each city selection with a timestamp.

# Technology Stack
Frontend:
React.js
SCSS for styling
LocalStorage for storing top 3 cities
OpenWeatherMap API for weather data

# Backend:
Node.js with Express.js
CORS & dotenv

# Developed by Valdemaras


