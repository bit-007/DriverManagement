const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://energyhive-backend.onrender.com' // Direct backend URL for production
  : '/api'; // Use nginx proxy for local development

export { API_BASE_URL };