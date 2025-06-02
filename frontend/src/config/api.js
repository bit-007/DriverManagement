const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' // Use nginx proxy path in production
  : 'http://localhost:3000'; // Local development

export { API_BASE_URL };