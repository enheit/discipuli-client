import React from 'react';
import PropTypes from 'prop-types';

import Header from './header';
import Footer from './footer';

const MainLayout = props => (
  <div className="main-layout">
    <Header />
    {props.children}
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
