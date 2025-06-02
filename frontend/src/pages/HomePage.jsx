import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Modern Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 40px',
        background: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00f5ff, #0066ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ENERGYHIVE
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            {[
              { to: '/get-driver', text: 'Retrieve' },
              { to: '/add-driver', text: 'Add Driver' },
              { to: '/subscribe', text: 'Subscribe' },
              { to: '/payment', text: 'Pay' },
              { to: '/transaction-history', text: 'History' },
              { to: '/locations', text: 'Locations' },
              { to: '/delete-driver', text: 'Delete Driver' }
            ].map((link, index) => (
              <Link
                key={index}
                to={link.to}
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#00f5ff';
                  e.target.style.background = 'rgba(0, 245, 255, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.background = 'transparent';
                }}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '0 40px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          animation: 'fadeInUp 1s ease-out'
        }}>
          {/* Animated Background Elements */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(100px)',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float 8s ease-in-out infinite reverse'
          }} />

          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '2px',
            color: '#00f5ff',
            marginBottom: '20px',
            textTransform: 'uppercase'
          }}>
            Revolutionary Driver Management
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '30px',
            background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 50%, #0066ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 50px rgba(0, 245, 255, 0.3)'
          }}>
            WELCOME TO<br />ENERGYHIVE
          </h1>

          <p style={{
            fontSize: '22px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: '0 auto 50px'
          }}>
            Flexible Payments, Reliable Service, Anytime Support!<br />
            <span style={{ color: '#00f5ff' }}>Experience the future of driver management</span>
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/add-driver"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #00f5ff, #0066ff)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 32px rgba(0, 245, 255, 0.3)',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 245, 255, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 245, 255, 0.3)';
              }}
            >
              Get Started →
            </Link>
            <Link
              to="/locations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Our Locations
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            marginTop: '80px',
            flexWrap: 'wrap'
          }}>
            {[
              { number: '1000+', label: 'Drivers' },
              { number: '50K+', label: 'Transactions' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  color: '#00f5ff',
                  marginBottom: '8px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;