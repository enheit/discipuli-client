import React from 'react';

import { Header } from './header';
import { Footer } from './footer';

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default MainLayout;