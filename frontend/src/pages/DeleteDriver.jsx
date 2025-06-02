import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const DeleteDriver = () => {
  const [phone, setPhone] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeleteDriver = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    
    try {
      const result = await axios.delete(`${API_BASE_URL}/DeleteDriver/${phone}`);
      setResponse(JSON.stringify(result.data, null, 2));
      setPhone(''); // Clear the form after successful deletion
    } catch (error) {
      setResponse(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: '40px 20px'
    }}>
      {/* Back Navigation */}
      <div style={{ marginBottom: '40px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#00f5ff',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
        >
          ← Back to Home
        </Link>
      </div>

      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '15px',
              background: 'linear-gradient(135deg, #ff6b6b, #ff5252)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🗑️
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #ff6b6b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Delete Driver
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '18px',
            lineHeight: '1.6'
          }}>
            Permanently remove a driver from the system
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          marginBottom: '30px'
        }}>
          <form onSubmit={handleDeleteDriver}>
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontSize: '16px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter driver's phone number"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '600',
                background: loading ? 'rgba(255, 107, 107, 0.5)' : 'linear-gradient(135deg, #ff6b6b, #ff5252)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Deleting...' : 'Delete Driver'}
            </button>
          </form>
        </div>

        {/* Response */}
        {response && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'left'
          }}>
            <h3 style={{ color: '#ff6b6b', marginBottom: '16px' }}>Response:</h3>
            <pre style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              margin: 0,
              lineHeight: '1.5'
            }}>
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteDriver;