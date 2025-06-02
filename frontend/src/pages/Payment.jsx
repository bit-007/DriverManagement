import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

const Payment = () => {
  const [checkDuesPhone, setCheckDuesPhone] = useState('');
  const [paymentData, setPaymentData] = useState({
    phone: '',
    payOption: '',
    amount: ''
  });
  const [checkDuesResponse, setCheckDuesResponse] = useState('');
  const [paymentResponse, setPaymentResponse] = useState('');
  const [loading, setLoading] = useState({ checkDues: false, payment: false });

  const handleCheckDues = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, checkDues: true });
    try {
      const result = await axios.get(`${API_BASE_URL}/Balance/${checkDuesPhone}`);
      setCheckDuesResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setCheckDuesResponse(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    } finally {
      setLoading({ ...loading, checkDues: false });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, payment: true });
    try {
      const result = await axios.post(`${API_BASE_URL}/PayBalance/${paymentData.phone}`, {
        paymentAmount: paymentData.payOption === 'partial' ? paymentData.amount : null,
        paymentType: paymentData.payOption
      });
      setPaymentResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setPaymentResponse(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    } finally {
      setLoading({ ...loading, payment: false });
    }
  };

  const handlePaymentDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
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

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Payment Center
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '20px',
          lineHeight: '1.6'
        }}>
          Check your dues and make payments seamlessly
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '40px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Check Dues Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '30px', color: 'white' }}>
            📊 Check Dues
          </h2>

          <form onSubmit={handleCheckDues}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={checkDuesPhone}
                onChange={(e) => setCheckDuesPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter phone number"
              />
            </div>

            <button
              type="submit"
              disabled={loading.checkDues}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                background: loading.checkDues ? 'rgba(255, 167, 38, 0.5)' : 'linear-gradient(135deg, #ff6b6b, #ffa726)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading.checkDues ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {loading.checkDues ? 'Checking...' : 'Check Dues'}
            </button>
          </form>

          {checkDuesResponse && (
            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#ffa726', marginBottom: '12px' }}>
                Dues Information:
              </h4>
              <pre style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.8)',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                margin: 0
              }}>
                {checkDuesResponse}
              </pre>
            </div>
          )}
        </div>

        {/* Payment Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '30px', color: 'white' }}>
            💳 Make Payment
          </h2>

          <form onSubmit={handlePayment}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={paymentData.phone}
                onChange={handlePaymentDataChange}
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter phone number"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Payment Option
              </label>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '12px 16px',
                  background: paymentData.payOption === 'full' ? 'rgba(0, 245, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  border: paymentData.payOption === 'full' ? '1px solid #00f5ff' : '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  <input
                    type="radio"
                    name="payOption"
                    value="full"
                    checked={paymentData.payOption === 'full'}
                    onChange={handlePaymentDataChange}
                    required
                  />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Pay Full</span>
                </label>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '12px 16px',
                  background: paymentData.payOption === 'partial' ? 'rgba(0, 245, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  border: paymentData.payOption === 'partial' ? '1px solid #00f5ff' : '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  <input
                    type="radio"
                    name="payOption"
                    value="partial"
                    checked={paymentData.payOption === 'partial'}
                    onChange={handlePaymentDataChange}
                    required
                  />
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Pay Partial</span>
                </label>
              </div>
            </div>

            {paymentData.payOption === 'partial' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={paymentData.amount}
                  onChange={handlePaymentDataChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter amount to pay"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading.payment}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                background: loading.payment ? 'rgba(0, 245, 255, 0.5)' : 'linear-gradient(135deg, #00f5ff, #0066ff)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading.payment ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {loading.payment ? 'Processing...' : 'Make Payment'}
            </button>
          </form>

          {paymentResponse && (
            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#00f5ff', marginBottom: '12px' }}>
                Payment Response:
              </h4>
              <pre style={{
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.8)',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                margin: 0
              }}>
                {paymentResponse}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;