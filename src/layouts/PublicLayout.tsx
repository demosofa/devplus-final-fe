import { Breadcrumb, Grid, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './PublicLayout.css';
import { superAdminNav } from './navigation';
import { MenuItem } from '../types';

export function PublicLayout() {
	const [collapsed, setCollapsed] = useState(false);

	const [breadcrumbItem, setBreadcrumItem] = useState('Workspace');

	const breakpoint = Grid.useBreakpoint();

	const findClickedItem: any = (items: MenuItem[], key: string) => {
		for (const item of items) {
			if (item.key === key) {
				return item;
			}
			if (item.children && item.children.length > 0) {
				const subItem = findClickedItem(item.children, key);
				if (subItem) {
					return subItem;
				}
			}
		}
		return null;
	};

	const handleMenuItemClick = (menuItem: any) => {
		const clickedItem = findClickedItem(superAdminNav, menuItem.key);
		const clickedLabel = clickedItem?.label;
		if (clickedLabel !== undefined) {
			setBreadcrumItem(clickedLabel);
		}
	};

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
					items={superAdminNav}
					onClick={handleMenuItemClick}
				/>
			</Sider>
			<Layout>
				<Content className={`layout-content ${breakpoint.sm ? '' : 'mobile'}`}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>DP06</Breadcrumb.Item>
						{breadcrumbItem === 'Main Account' ||
						breadcrumbItem === 'Sub Account' ? (
							<>
								<Breadcrumb.Item>User</Breadcrumb.Item>
								<Breadcrumb.Item>{breadcrumbItem}</Breadcrumb.Item>
							</>
						) : (
							<Breadcrumb.Item>{breadcrumbItem}</Breadcrumb.Item>
						)}
					</Breadcrumb>

					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
