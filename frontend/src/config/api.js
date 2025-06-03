// Make sure this looks correct:
const API_BASE_URL = process.env.REACT_APP_API_URL 
  || (process.env.NODE_ENV === 'production' 
      ? 'https://energyhive-backend.onrender.com' 
      : '/api');

export { API_BASE_URL };