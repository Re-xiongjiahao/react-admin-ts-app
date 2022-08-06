import React, { FC } from 'react';

type NoAuthProps = {};

const NoAuth: FC<NoAuthProps> = (props) => {
  return (
    <div style={{ fontSize:40,fontWeight:700,display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center',width: '100%',height: '100%'}}>
      无权限访问该页面
    </div>
  )
}

export default NoAuth;