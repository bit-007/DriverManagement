import React, { useState } from 'react';

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
      const result = await fetch('http://localhost:3000/Subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          subscriptionAmount: parseInt(formData.subscriptionAmount, 10)
        })
      });
      const data = await result.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(error.message);
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
      value: '0',
      price: 'FREE',
      title: 'FREE TRIAL',
      features: ['7 Days Trial', 'Basic Support', 'Core Features', 'No Payment Required'],
      popular: false,
      badge: 'Try Free',
      color: '#10b981'
    },
    {
      value: '500',
      price: '₹500',
      title: 'VALUE PACK',
      features: ['Basic Support', '30 Days Validity', 'Essential Features'],
      popular: false,
      color: '#f59e0b'
    },
    {
      value: '1000',
      price: '₹1000',
      title: 'PREMIUM PACK',
      features: ['Priority Support', '30 Days Validity', 'All Features', 'Extended Benefits'],
      popular: true,
      badge: 'Most Popular',
      color: '#00f5ff'
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
        <button
          onClick={() => window.history.back()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#00f5ff',
            background: 'none',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          ← Back to Home
        </button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
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
            Start with a free trial or select a premium plan
          </p>
        </div>

        <div onSubmit={handleSubmit}>
          {/* Plans Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}>
            {plans.map((plan, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  background: formData.subscriptionAmount === plan.value 
                    ? `linear-gradient(135deg, ${plan.color}20, ${plan.color}10)`
                    : 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  border: formData.subscriptionAmount === plan.value 
                    ? `2px solid ${plan.color}` 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: formData.subscriptionAmount === plan.value ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: formData.subscriptionAmount === plan.value 
                    ? `0 20px 40px ${plan.color}30` 
                    : '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => setFormData({...formData, subscriptionAmount: plan.value})}
              >
                {plan.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #00f5ff, #0066ff)'
                      : 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{ 
                  fontSize: plan.value === '0' ? '2.5rem' : '3rem', 
                  fontWeight: '800', 
                  color: plan.color, 
                  marginBottom: '8px' 
                }}>
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
                        background: plan.color
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
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      accentColor: plan.color
                    }}
                    required
                  />
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: formData.subscriptionAmount === plan.value ? plan.color : 'rgba(255, 255, 255, 0.7)'
                  }}>
                    {plan.value === '0' ? 'Start Free Trial' : 'Select Plan'}
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
            onClick={handleSubmit}
            disabled={loading || !formData.phone || !formData.subscriptionAmount}
            style={{
              padding: '18px 40px',
              fontSize: '18px',
              fontWeight: '600',
              background: loading 
                ? 'rgba(0, 245, 255, 0.5)' 
                : formData.subscriptionAmount === '0'
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : 'linear-gradient(135deg, #00f5ff, #0066ff)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading || !formData.phone || !formData.subscriptionAmount ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(0, 245, 255, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: !formData.phone || !formData.subscriptionAmount ? 0.6 : 1
            }}
          >
            {loading 
              ? 'Processing...' 
              : formData.subscriptionAmount === '0' 
                ? 'Start Free Trial' 
                : 'Subscribe Now'
            }
          </button>
        </div>

        {/* Features Comparison */}
        <div style={{
          marginTop: '80px',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '30px',
            color: 'white'
          }}>
            Why Start with Free Trial?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🚀
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '18px' }}>No Risk</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: 0 }}>
                  Try all features without any payment commitment
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ⚡
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '18px' }}>Instant Access</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: 0 }}>
                  Get started immediately with full system access
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                🎯
              </div>
              <div>
                <h4 style={{ color: 'white', marginBottom: '8px', fontSize: '18px' }}>Test Drive</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: 0 }}>
                  Evaluate if the platform meets your needs
                </p>
              </div>
            </div>
          </div>
        </div>

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