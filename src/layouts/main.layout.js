import React from 'react';

const MainLayout = (props) => {
  return (
    <div className="main-layout">
      <h1>Header</h1>
      {props.children}
    </div>
  )
}

export default MainLayout;