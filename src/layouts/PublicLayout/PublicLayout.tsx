import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import './PublicLayout.css';
import { TopBar } from 'components/TopBar/TopBar';
import { useAuth } from '@hooks';

const { Content } = Layout;

export function PublicLayout() {
	const { getAuth, setAuth } = useAuth();
	const auth = getAuth();
	const location = useLocation();

	return (
		<Layout className="layout-container">
			{['login'].some((text) => location.pathname.includes(text)) ? null : (
				<TopBar auth={auth} setAuth={setAuth} />
			)}
			<Content>
				<Outlet />
			</Content>
		</Layout>
	);
}
