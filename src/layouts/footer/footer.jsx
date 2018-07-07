import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      &copy; Discipuli
      {' '}
      {year}
    </footer>
  );
};

export default Footer;
