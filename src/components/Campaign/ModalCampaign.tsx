import { Button, Modal } from 'antd';
import { useState } from 'react';
import { UpdateCampaign } from './UpdateCampaign';

export const ModalCampaign = () => {
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
				Update Campaign
			</Button>
			<Modal
				title="Update Campaign"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<UpdateCampaign />
			</Modal>
		</div>
	);
};