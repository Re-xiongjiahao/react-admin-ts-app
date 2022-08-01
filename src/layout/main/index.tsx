import { Layout} from 'antd';

// import SideBar from './components/SiderBar';
// import AppHeader from './components/AppHeader';
// import AppMain from './components/AppMain';
import { SideBar, AppHeader , AppMain } from './components'

const MainLayout = () => {
  return (
    <Layout id='components-layout-demo-custom-trigger'>
      {/* 左侧菜单组件 */}
      <SideBar />
      <Layout className="site-layout">
        <AppHeader />
        <AppMain />
      </Layout>
    </Layout>
  );
};

export default MainLayout;