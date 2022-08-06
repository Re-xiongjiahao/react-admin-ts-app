import React, { FC } from 'react';
import { Outlet } from 'react-router-dom'

type IndexProps = {};

const Index: FC<IndexProps> = (props) => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Index;