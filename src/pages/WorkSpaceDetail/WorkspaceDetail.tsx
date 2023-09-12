import { useParams } from 'react-router-dom';
import { Card } from 'antd';

import { useGetWorkspaceDetail } from '@hooks';
import './WorkSpaceDetail.css';

export const WorkSpaceDetail = () => {
	const { id } = useParams();

	const { data: workspace, isLoading } = useGetWorkspaceDetail(Number(id));

	return (
		<>
			{/* <Button className="btn-wrap-campaign">
				<Link style={{ color: 'white' }} to={generatePath('list-campaign', {})}>
					<PlusCircleOutlined /> View Campaign
				</Link>
			</Button> */}

			<Card loading={isLoading}>
				<h1>Name: {workspace?.title_workspace}</h1>
				<p>Status: {workspace?.status}</p>
			</Card>
		</>
	);
};
