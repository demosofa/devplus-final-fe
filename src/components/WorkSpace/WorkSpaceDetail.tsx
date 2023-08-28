import { Button, Modal, Table } from 'antd';
import { useState } from 'react';

import CreateCampaign from 'components/Campaign/CreateCampaign';
import { useDetailWorkspace } from 'hooks/useDetailWorkspace';
import { ListCampaign } from './LisCampaign';
import './WorkSpaceDetail.css';

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

	const { data: listWorkSpace } = useDetailWorkspace();

	const columns = [
		{
			title: 'name',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => <a>{text}</a>,
		},
		{
			title: 'email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Phone Number',
			dataIndex: 'phone_number',
			key: 'phone_number',
		},
		{
			title: 'status',
			dataIndex: 'status',
			key: 'status',
		},
	];
	return (
		<div>
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
			<h3 className="workspace-wrap-text">Users</h3>
			<Table
				columns={columns}
				dataSource={listWorkSpace?.user}
				rowKey={(record) => record.id}
				className="users-workspace"
			/>

			<ListCampaign />
		</div>
	);
};

export default WorkSpaceDetail;
