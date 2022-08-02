import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Index from './layout/main/index'
import Login from './views/login/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Login />}/>
        {/* Index组件中设置二级路由，一定要加 * 号 */}
        <Route path='/*' element={ <Index />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
