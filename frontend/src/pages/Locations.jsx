import React from 'react';
import { Link } from 'react-router-dom';


const Locations = () => {
  const locations = [
    {
      name: "Koramangala",
      address: "452, 17th G Main Rd, 6th Block, Koramangala, Bengaluru, Karnataka 560047",
      type: "Main Hub",
      color: "#00f5ff"
    },
    {
      name: "Indiranagar",  
      address: "53, 100 Feet Rd, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038",
      type: "Service Center",
      color: "#6c5ce7"
    },
    {
      name: "NEW BEL Road",
      address: "No. 112, MSR Colony, MS Ramaiah, New BEL Rd, Mathikere, Bengaluru, 560054",
      type: "Support Office",
      color: "#ffa726"
    },
    {
      name: "Hebbal",
      address: "no 94, Ex Servicemen Colony, HMT Layout, Dinnur, RT Nagar, Bengaluru, Karnataka 560032",
      type: "Regional Hub",
      color: "#26d0ce"
    },
    {
      name: "Yelahanka",
      address: "3HWV+6MW, Suggappa Layout, East Colony, Yelahanka, Bengaluru, Karnataka 560064", 
      type: "Branch Office",
      color: "#a29bfe"
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
      {/* Animated Background Elements */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        animation: 'float 8s ease-in-out infinite'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(108, 92, 231, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 6s ease-in-out infinite reverse'
      }} />

      {/* Back Navigation */}
      <div style={{ marginBottom: '40px', position: 'relative', zIndex: 10 }}>
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
          onMouseOver={(e) => e.target.style.transform = 'translateX(-4px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateX(0)'}
        >
          ← Back to Home
        </Link>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #00f5ff, #0066ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              📍
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #00f5ff 50%, #6c5ce7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.1'
          }}>
            Our Locations in Bengaluru
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '20px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Find the nearest EnergyHive location for all your driver management needs
          </p>
        </div>

        {/* Locations Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {locations.map((location, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.4)`;
                e.currentTarget.style.borderColor = location.color + '88';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              {/* Location Type Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: location.color + '20',
                color: location.color,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: `1px solid ${location.color}40`
              }}>
                {location.type}
              </div>

              {/* Location Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${location.color}, ${location.color}88)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '24px'
              }}>
                🏢
              </div>

              {/* Location Name */}
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px',
                margin: '0 0 12px 0'
              }}>
                {location.name}
              </h3>

              {/* Address */}
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '16px',
                lineHeight: '1.5',
                marginBottom: '24px',
                margin: '0 0 24px 0'
              }}>
                {location.address}
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: `linear-gradient(135deg, ${location.color}, ${location.color}CC)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = `0 8px 20px ${location.color}40`;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  📍 Get Directions
                </button>
                <button
                  style={{
                    flex: 1,
                    minWidth: '120px',
                    padding: '12px 20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.borderColor = location.color + '60';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  📞 Contact
                </button>
              </div>

              {/* Decorative Element */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: `radial-gradient(circle, ${location.color}20 0%, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(20px)'
              }} />
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '16px',
            color: 'white'
          }}>
            Need Help Finding Us?
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '18px',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            Our customer support team is available 24/7 to assist you with directions and location details
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#00f5ff',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              📧 support@energyhive.com
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#00f5ff',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              📱 +91 98765 43210
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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

export default Locations;