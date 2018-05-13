import React from 'react';

const EmptyLayout = (props) => {
  return (
    <div className="empty-layout">
      {props.children}
    </div>
  )
}

export default EmptyLayout;