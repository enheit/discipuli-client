import React from 'react';

import { Header } from './header';

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <Header />
      {props.children}
    </div>
  )
}

export default MainLayout;