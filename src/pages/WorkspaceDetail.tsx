import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { useGetWorkspaceDetail } from 'hooks/useGetWorkspaceDetail';
import '../components/WorkSpace/WorkSpaceDetail.css';

export const WorkSpaceDetail = () => {
	const { id } = useParams();

	const { data: workspace, isLoading } = useGetWorkspaceDetail(Number(id));

	return (
		<>
			<Button className="btn-wrap-campaign">
				<Link style={{ color: 'white' }} to={'/create-campaign/' + id}>
					<PlusCircleOutlined /> Create Campaign
				</Link>
			</Button>
			<div>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<Card>
						<h1>Name: {workspace?.title_workspace}</h1>
						<p>Status: {workspace?.status}</p>
					</Card>
				)}
			</div>
		</>
	);
};
