import { Dropdown, Layout, MenuProps, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { AuthPayload, SetAuth } from '@types';
import './TopBar.css';
import { TitleProps } from 'antd/es/typography/Title';

const { Header } = Layout;
const { Title } = Typography;

type MenuItem = MenuProps['items'];

interface Props extends TitleProps {
	auth: AuthPayload | void;
	setAuth: SetAuth;
}

export function TopBar({ auth, setAuth, ...props }: Props) {
	const handleLogout = () => {
		setAuth();
	};

	const authItems: MenuItem = [
		{ key: 1, label: <Link to={`/profile`}>My Profile</Link> },
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
			<Title {...props}>{props.title}</Title>

			<Dropdown menu={{ items }}>
				<div
					style={{
						display: 'flex',
						cursor: 'pointer',
						paddingRight: '20px',
					}}
				>
					<img
						className="img-drop"
						src="https://th.bing.com/th/id/OIP.nczpMSa69aDJWYGi0tKqggHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7"
					/>

					{auth ? auth.name : 'Guest'}
				</div>
			</Dropdown>
		</Header>
	);
}
