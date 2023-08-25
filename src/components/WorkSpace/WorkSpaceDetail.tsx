import { Button, Modal } from 'antd';
import CreateCampaign from 'components/Campaign/CreateCampaign';
import { useState } from 'react';

const WorkSpaceDetail = () => {
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
		<div>
			<Button type="primary" onClick={showModal}>
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
		</div>
	);
};

export default WorkSpaceDetail;
