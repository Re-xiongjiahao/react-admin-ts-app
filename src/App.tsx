import { Routes,Route,Navigate, useLocation } from 'react-router-dom'
import Index from './layout/main/index'
import Login from './views/login/Index';

import { useAppSelector} from './store/hooks'

function App() {
  const loginState = useAppSelector(state=>state.user.loginState)
  let { search } = useLocation()
  const str = search==='' ? '/' : search.split('?redirect=')[1]
  return (
      <Routes>
        {/* <Route path='/login' element={ <Login />}/> */}
        <Route path='/login' element={ loginState ? <Navigate to={str}/> : <Login />} />
        {/* Index组件中设置二级路由，一定要加 * 号 */}
        {/* <Route path='/*' element={ <Index />}/> */}
        <Route path='/*' element={ loginState ? <Index /> : <Navigate to='/login'/> }/>
      </Routes>
  );
}

export default App;
