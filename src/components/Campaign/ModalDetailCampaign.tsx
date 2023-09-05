import { Button, Modal } from 'antd';
import { useState } from 'react';

import { DetailCampaign } from './DetailCampaign';

export const ModalDetailCampaign = () => {
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
				Detail Campaign
			</Button>
			<Modal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<DetailCampaign />
			</Modal>
		</div>
	);
};
