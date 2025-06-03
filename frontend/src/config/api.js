const API_BASE_URL = process.env.REACT_APP_API_URL 
  || (window.location.hostname === 'localhost'
      ? '/api'
      : 'https://energyhive-backend.onrender.com');

export { API_BASE_URL };