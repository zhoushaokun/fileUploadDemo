import React from 'react';
import { 
    Layout, 
    Menu,
    Breadcrumb,
    Avatar,
} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import UploadVideo from '../components/UploadVideo';
import styles from './Side.css';

const { useState } = React;

const menuConfig = {
    video: {
        key: 'video',
        menuName: '视频库',
        compoent:'',
    },
    self: {
        key: 'self',
        menuName: '个人中心',
        component: <UploadVideo></UploadVideo>,
    },
};

const { Header, Sider, Content } = Layout;

export default function SiderDemo () {
    const [collapsed, setcollapsed] = useState(false);
    const [currentMenu, setCurrentMenu] = useState('video');

    const toggle = () => {
        setcollapsed(!collapsed);
    };

    const menuClickHandler = ({key='video'}) => {
        setCurrentMenu(key);
    };

    return (
        <Layout className='side'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='logo' >
                    <Avatar style={{ backgroundColor: '#69c0ff' }} icon={<EyeOutlined />} />
                    {
                        !collapsed && <span style={{ color: '#69c0ff', marginLeft: '10px'}}>sikies的视频库</span>
                    }
                </div>
                <Menu onClick={menuClickHandler} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key={menuConfig.video.key}>
                        <VideoCameraOutlined />
                        <span>视频库</span>
                    </Menu.Item>
                    <Menu.Item key={menuConfig.self.key}>
                        <UserOutlined />
                        <span>个人中心</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>sikies</Breadcrumb.Item>
                        <Breadcrumb.Item>{menuConfig[currentMenu].menuName}</Breadcrumb.Item>
                    </Breadcrumb>
                    {menuConfig[currentMenu].component}
                </Content>
            </Layout>
        </Layout>
    );
}
