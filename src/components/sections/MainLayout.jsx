import React                from 'react'
import { Outlet }           from 'react-router-dom'
import { Layout }           from 'antd';
import HeaderSection        from './HeaderSection';

const { Content } = Layout;

export const MainLayout = () => {
    return (
        <Layout className='main_layout'>
            <HeaderSection />
            <Content className='main_content'>
                <Outlet />
            </Content>
        </Layout>
    )
}
