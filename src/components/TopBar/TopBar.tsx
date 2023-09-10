import { Button, Dropdown, Layout, MenuProps, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { AuthPayload, SetAuth } from '@types';
import './TopBar.css';

const { Header } = Layout;
const { Title } = Typography;

type MenuItem = MenuProps['items'];

export function TopBar({
	title,
	auth,
	setAuth,
}: {
	title: string;
	auth: AuthPayload | void;
	setAuth: SetAuth;
}) {
	const handleLogout = () => {
		setAuth();
	};

	const authItems: MenuItem = [
		{ key: 1, label: <Link to={`/detail-user/${auth?.id}`}>My Profile</Link> },
		{
			key: 2,
			label: (
				<Link to="#" onClick={handleLogout}>
					Logout
				</Link>
			),
		},
	];

	const unAuthItems: MenuItem = [
		{ key: 1, label: <Link to="/login">Login</Link> },
		{
			key: 2,
			label: <Link to="/create-workspace">Create Workspace</Link>,
		},
	];

	const items = auth ? authItems : unAuthItems;

	return (
		<Header className="top-bar">
			<Title level={4}>{title}</Title>

			<Dropdown menu={{ items }}>
				<Button>{auth ? auth.name : 'Guest'}</Button>
			</Dropdown>
		</Header>
	);
}
