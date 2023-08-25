import { Breadcrumb, Grid, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@hooks';
import { ROLE } from '@enums';
import { adminNav, superAdminNav, userNav } from './navigation';
import { findClickedItem } from '@utils';

export function PrivateLayout() {
	const { getAuth } = useAuth();
	const auth = getAuth();

	const [collapsed, setCollapsed] = useState(false);

	const [breadcrumbItem, setBreadcrumItem] = useState('Workspace');

	const handleMenuItemClick = (menuItem: any) => {
		const clickedItem = findClickedItem(
			auth!.role === ROLE.SUPER_ADMIN
				? superAdminNav
				: auth!.role === ROLE.ADMIN
				? adminNav
				: auth!.role === ROLE.USER
				? userNav
				: [],
			menuItem.key
		);

		const clickedLabel = clickedItem?.label;
		if (clickedLabel !== undefined) {
			setBreadcrumItem(clickedLabel);
		}
	};

	const breakpoint = Grid.useBreakpoint();

	const breadcrumb =
		breadcrumbItem === 'Main Account' || breadcrumbItem === 'Sub Account'
			? [{ title: 'User' }, { title: breadcrumbItem }]
			: [{ title: breadcrumbItem }];

	if (!auth) return <Navigate to="/login" />;

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
					defaultSelectedKeys={['1']}
					mode="inline"
					items={
						auth.role === ROLE.SUPER_ADMIN
							? superAdminNav
							: auth.role === ROLE.ADMIN
							? adminNav
							: auth.role === ROLE.USER
							? userNav
							: []
					}
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
