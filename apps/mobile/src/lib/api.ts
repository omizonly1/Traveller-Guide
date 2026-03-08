import axios from 'axios';

// Ensure this matches your local IP if testing on physical devices, or 10.0.2.2 for Android emulators
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
});

export default api;
