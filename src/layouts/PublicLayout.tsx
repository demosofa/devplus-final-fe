import { Breadcrumb, Grid, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import './PublicLayout.css';
import { superAdminNav } from './navigation';
import { findClickedItem } from '@utils';

export function PublicLayout() {
	const location = useLocation();
	console.log(location.pathname);

	const [collapsed, setCollapsed] = useState(false);

	const [breadcrumbItem, setBreadcrumItem] = useState('Workspace');

	const breakpoint = Grid.useBreakpoint();

	const handleMenuItemClick = (menuItem: any) => {
		const clickedItem = findClickedItem(superAdminNav, menuItem.key);
		const clickedLabel = clickedItem?.label;
		if (clickedLabel !== undefined) {
			setBreadcrumItem(clickedLabel);
		}
	};

	const breadcrumb =
		breadcrumbItem === 'Main Account' || breadcrumbItem === 'Sub Account'
			? [{ title: 'User' }, { title: breadcrumbItem }]
			: [{ title: breadcrumbItem }];

	return (
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
					mode="inline"
					defaultSelectedKeys={['1']}
					items={superAdminNav}
					onClick={handleMenuItemClick}
				/>
			</Sider>
			<Layout>
				<Content className={`layout-content ${breakpoint.sm ? '' : 'mobile'}`}>
					<Breadcrumb
						style={{ margin: '16px 0' }}
						items={[{ title: 'DP06' }].concat(breadcrumb)}
					/>

					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
