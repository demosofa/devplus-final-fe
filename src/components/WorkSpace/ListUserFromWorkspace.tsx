import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Link, useParams } from 'react-router-dom';

import './WorkSpace.css';
import { CampaignType } from '@types';
import { useAcceptWorkspace, useRejectWorkspace } from '@hooks';

import { CAMPAIGN } from '@enums';
import { useListUserWithWorkspace } from 'hooks/useListUserWithWorkspace';

export const ListUserFromWorkspace = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const { id } = useParams();
	const { data: campaign, isLoading } = useListUserWithWorkspace(
		Number(id),
		currentPage,
		pageSize
	);

	const acceptWorkspace = useAcceptWorkspace();
	const rejectWorkspace = useRejectWorkspace();

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setCurrentPage(page);
		if (pageSize) {
			setPageSize(pageSize);
		}
	};

	const handleAcceptWorkspace = (id: number) => {
		Modal.confirm({
			title: `Accept Workspace ${id}`,
			icon: <ExclamationCircleFilled />,
			content: 'Do you Want to accept this workspace?',
			onOk() {
				acceptWorkspace.mutate(id);
			},
		});
	};

	const handleRejectWorkspace = (id: number) => {
		Modal.confirm({
			title: `Reject Workspace ${id}`,
			icon: <ExclamationCircleFilled />,
			content: 'Do you Want to reject this workspace?',
			onOk() {
				rejectWorkspace.mutate(id);
			},
		});
	};

	const columns: ColumnsType<CampaignType> = [
		{
			title: 'STT',
			key: 'index',
			render: (_text, _record, index) => index + 1,
		},
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (text: string, record) => (
				<>
					{record.status === CAMPAIGN.ACTIVE ? (
						<Link to={`/workspace-detail/${record.id}`}>{text}</Link>
					) : (
						<span>{text}</span>
					)}
				</>
			),
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Phone Number',
			dataIndex: 'phone_number',
			key: 'phone_number',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			key: 'action',
			render: (record) => (
				<div className="action-icons">
					{record.status === CAMPAIGN.ACTIVE ? (
						<div className="campaign-action">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="icons-check"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleAcceptWorkspace(record.id);
								}}
							>
								<path
									fill="currentColor"
									d="m7 14.94l6.06-6.06l2.06 2.06L9.06 17H7v-2.06M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m4.7-10.65l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2"
								/>
							</svg>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="icons-close"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleRejectWorkspace(record.id);
								}}
							>
								<path
									fill="currentColor"
									d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7zm.707-7l2.646-2.646a.502.502 0 0 0 0-.707a.502.502 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706L12.707 12z"
								/>
							</svg>
						</div>
					) : (
						'No actions'
					)}
				</div>
			),
		},
	];

	return (
		<>
			<Table<CampaignType>
				columns={columns}
				dataSource={campaign?.data}
				rowKey={(record) => record.id}
				pagination={{
					defaultPageSize: pageSize,
					showSizeChanger: true,
					current: currentPage,
					total: campaign?.meta.itemCount,
					onChange: handlePaginationChange,
				}}
				style={{ overflowX: 'auto' }}
				loading={isLoading}
			/>
		</>
	);
};
