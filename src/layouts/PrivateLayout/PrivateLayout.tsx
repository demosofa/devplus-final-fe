import { Grid, Layout, Menu, MenuProps } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '@hooks';
import { AUTH_STATUS } from '@enums';
import { AuthMenuItem } from '@types';
import { navigation } from '../../navigation';
import { TopBar } from 'components/TopBar/TopBar';
import './PrivateLayout.css';

type MenuItem = Required<MenuProps>['items'];

const { Sider, Content } = Layout;

export function PrivateLayout() {
	const { getAuth, setAuth } = useAuth();
	const auth = getAuth();

	const [collapsed, setCollapsed] = useState(true);
	const location = useLocation();

	const breakpoint = Grid.useBreakpoint();

	const acceptedNav = navigation.reduce(
		(result: MenuItem, current: AuthMenuItem) => {
			if (!current || !auth) return [];

			if (current.type != 'divider' && current.children) {
				const children = current.children.filter(
					(item) => item.roles?.includes(auth.role) ?? true
				);
				current = { ...current, children };
			}

			if (current.roles) {
				if (current.roles.some((role) => role === auth.role)) {
					result.push(current);
				}
			} else {
				result.push(current);
			}

			return result;
		},
		[]
	);

	if (!auth) {
		return <Navigate to="/login" />;
	} else if (auth.status == AUTH_STATUS.DISABLE) {
		return <Navigate to="/403" />;
	}

	return (
		<Layout className="layout-container">
			<Sider
				breakpoint="sm"
				onBreakpoint={(broken) => !broken && setCollapsed(true)}
				collapsible={breakpoint.sm}
				collapsedWidth={60}
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div className="logo" />
				<br />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[location.pathname]}
					items={acceptedNav}
				/>
			</Sider>

			<Layout>
				<TopBar auth={auth} setAuth={setAuth} />
				<Content className={`layout-content ${breakpoint.sm ? '' : 'mobile'}`}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
