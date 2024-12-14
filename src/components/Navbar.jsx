import React from 'react';

const Navbar = () => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(116, 141, 149, 0.66)',
    color: '#ffffff',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'rgba(45, 38, 56, 0.66)',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '20px',
  };

  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'color 0.3s ease',
  };

  const linkHoverStyle = {
    color: '#61dafb',
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>ICHAT</div>
      <div style={navLinksStyle}>
        <a href="#home" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.color = linkHoverStyle.color} onMouseOut={(e) => e.currentTarget.style.color = linkStyle.color}>
          Home
        </a>
      </div>
    </nav>
  );
};

export default Navbar;