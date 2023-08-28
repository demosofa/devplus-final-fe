import { useParams } from 'react-router-dom';

import { useGetWorkspaceDetail } from 'hooks/useGetWorkspaceDetail';
import { Button, Card, Modal } from 'antd';
import CreateCampaign from 'components/Campaign/CreateCampaign';
import { useState } from 'react';

export const WorkSpaceDetail = () => {
	const { id } = useParams();
	const { data: workspace, isLoading } = useGetWorkspaceDetail(Number(id));

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
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
			<Button type="primary" onClick={showModal} className="btn-wrap-campaign">
				Create Campaign
			</Button>
			<Modal
				title="Create Campaign"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<CreateCampaign />
			</Modal>
		</>
	);
};
