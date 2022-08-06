import React, { FC } from 'react';

type Error404Props = {};

const Error404: FC<Error404Props> = (props) => {
  return (
    <div style={{ fontSize:40,fontWeight:700,display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',width: '100%',height: '100%'}}>
      404 Not Found - 您的页面被外星人劫持了
    </div>
  )
}

export default Error404;