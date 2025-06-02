import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Subscribe = () => {
  const [formData, setFormData] = useState({
    phone: '',
    subscriptionAmount: ''
  });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post('/Subscribe', {
        phone: formData.phone,
        subscriptionAmount: parseInt(formData.subscriptionAmount, 10)
      });
      setResponse(JSON.stringify(result.data, null, 2));
    } catch (error) {
      setResponse(error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const plans = [
    {
      value: '500',
      price: '₹500',
      title: 'VALUE PACK',
      features: ['Basic Support', '30 Days Validity', 'Essential Features'],
      popular: false
    },
    {
      value: '1000',
      price: '₹1000',
      title: 'PREMIUM PACK',
      features: ['Priority Support', '30 Days Validity', 'All Features', 'Extended Benefits'],
      popular: true
    }
  ];

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

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* Header */}
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Choose Your Plan
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '20px',
            lineHeight: '1.6'
          }}>
            Select the perfect subscription plan for your needs
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Plans Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}>
            {plans.map((plan, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  background: formData.subscriptionAmount === plan.value 
                    ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(0, 102, 255, 0.2))'
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  border: formData.subscriptionAmount === plan.value 
                    ? '2px solid #00f5ff' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: formData.subscriptionAmount === plan.value ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: formData.subscriptionAmount === plan.value 
                    ? '0 20px 40px rgba(0, 245, 255, 0.3)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => setFormData({...formData, subscriptionAmount: plan.value})}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #00f5ff, #0066ff)',
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{ fontSize: '3rem', fontWeight: '800', color: '#00f5ff', marginBottom: '8px' }}>
                  {plan.price}
                </div>

                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '30px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {plan.title}
                </div>

                <div style={{ marginBottom: '30px' }}>
                  {plan.features.map((feature, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '16px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#00f5ff'
                      }} />
                      {feature}
                    </div>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  <input
                    type="radio"
                    name="subscriptionAmount"
                    value={plan.value}
                    checked={formData.subscriptionAmount === plan.value}
                    onChange={handleChange}
                    style={{ width: '20px', height: '20px' }}
                    required
                  />
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: formData.subscriptionAmount === plan.value ? '#00f5ff' : 'rgba(255, 255, 255, 0.7)'
                  }}>
                    Select Plan
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Phone Input */}
          <div style={{ maxWidth: '400px', margin: '0 auto 40px', textAlign: 'left' }}>
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
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '18px 40px',
              fontSize: '18px',
              fontWeight: '600',
              background: loading ? 'rgba(0, 245, 255, 0.5)' : 'linear-gradient(135deg, #00f5ff, #0066ff)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0, 245, 255, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </form>

        {/* Response Display */}
        {response && (
          <div style={{
            marginTop: '40px',
            padding: '30px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'left',
            maxWidth: '600px',
            margin: '40px auto 0'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#00f5ff',
              marginBottom: '16px'
            }}>
              Subscription Response:
            </h3>
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

export default Subscribe;