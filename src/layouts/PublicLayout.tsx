import {
	GithubOutlined,
	PieChartOutlined,
	UserOutlined,
	UserSwitchOutlined,
	UsergroupAddOutlined,
} from '@ant-design/icons';
import { Grid, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './PublicLayout.css';

interface MenuItem {
	key: string;
	icon?: React.ReactNode;
	children?: MenuItem[];
	label: string;
}

function getItem(
	label: string,
	key: string,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	};
}

export function PublicLayout() {
	const [collapsed, setCollapsed] = useState(false);

	const breakpoint = Grid.useBreakpoint();

	const items: MenuItem[] = [
		getItem(
			'Workspace',
			'1',
			<Link to={'/hehe'}>
				<GithubOutlined />
			</Link>
		),
		getItem(
			'Campaign',
			'2',
			<Link to={'/campain'}>
				<PieChartOutlined />
			</Link>
		),
		getItem('User', 'sub1', <UserOutlined />, [
			getItem(
				'Main Account',
				'3',
				<Link to={'/campain'}>
					<UserSwitchOutlined />
				</Link>
			),
			getItem(
				'Sub Account',
				'4',
				<Link to={'/campain'}>
					<UsergroupAddOutlined />
				</Link>
			),
		]),
	];

	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					breakpoint="sm"
					onBreakpoint={(broken) => !broken && setCollapsed(true)}
					collapsible={breakpoint.sm}
					collapsedWidth={60}
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<div className="demo-logo-vertical" />
					<br />
					<Menu
						theme="dark"
						defaultSelectedKeys={['1']}
						mode="inline"
						items={items}
					/>
				</Sider>
				<Layout>
					<Content
						className={`layout-content ${breakpoint.sm ? '' : 'mobile'}`}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</>
	);
}
