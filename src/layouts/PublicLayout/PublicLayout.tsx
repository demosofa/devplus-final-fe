import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './PublicLayout.css';

const { Content } = Layout;

export function PublicLayout() {
	return (
		<Layout className="layout-container">
			<Content className="public-content">
				<Outlet />
			</Content>
		</Layout>
	);
}
