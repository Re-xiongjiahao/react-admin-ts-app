import React, { FC } from 'react';
import { Outlet} from 'react-router-dom'

type IndexProps = {};

const Index: FC<IndexProps> = (props) => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default Index;