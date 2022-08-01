import { Layout} from 'antd';
const { Content } = Layout;
const AppMain = () => {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      Content
    </Content>
  )
}

export default AppMain