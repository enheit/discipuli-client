import React from 'react';

const Footer = (props) => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      &copy; Discipuli {year}
    </footer>
  )
}

export default Footer;
