import { Grid, Layout, Menu, MenuProps } from 'antd';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '@hooks';
import { AUTH_STATUS } from '@enums';
import { AuthMenuItem } from '@types';
import { navigation } from '../../navigation';
import { TopBar } from '@components';
import { capitalize } from '@utils';
import './PrivateLayout.css';

type MenuItem = Required<MenuProps>['items'];

const { Sider, Content } = Layout;

const { useBreakpoint } = Grid;

export function PrivateLayout() {
	const { getAuth, setAuth } = useAuth();
	const auth = getAuth();

	const [collapsed, setCollapsed] = useState(true);
	const location = useLocation();
	const navigate = useNavigate();

	const breakpoint = useBreakpoint();

	const title = location.pathname
		.replaceAll('/', ' ')
		.split('-')
		.reduce((prev, curr) => {
			return prev + ' ' + capitalize(curr);
		}, '');

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
				if (current.roles.includes(auth.role)) {
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
				collapsedWidth={breakpoint.sm ? 70 : 50}
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div>
					<img
						className="logo_image"
						src={
							collapsed
								? '/src/assets/logo_loading.png'
								: 'https://devplus.edu.vn/assets/images/devplus/Artboard_2.png'
						}
						alt="img"
					/>
				</div>
				<br />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[location.pathname]}
					items={acceptedNav}
					onClick={({ key }) => navigate(key)}
				/>
			</Sider>

			<Layout>
				<TopBar
					title={title}
					level={breakpoint.sm ? 3 : 5}
					auth={auth}
					setAuth={setAuth}
				/>

				<Content className={`private-content ${breakpoint.sm ? '' : 'mobile'}`}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
}
