import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleFilled,
	PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import { WORKSPACE } from '@enums';

import {
	useAcceptWorkspace,
	useGetListWorkSpace,
	useRejectWorkspace,
} from '@hooks';
import { WorkspaceType } from '@types';
import './WorkSpace.css';

export const WorkSpace = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const { data: listWorkSpace, isLoading } = useGetListWorkSpace(
		currentPage,
		pageSize
	);

	const navigate = useNavigate();

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
			content: 'Do you want to accept this workspace?',
			onOk() {
				acceptWorkspace.mutate(id);
			},
		});
	};

	const handleRejectWorkspace = (id: number) => {
		Modal.confirm({
			title: `Reject Workspace ${id}`,
			icon: <ExclamationCircleFilled />,
			content: 'Do you want to reject this workspace?',
			onOk() {
				rejectWorkspace.mutate(id);
			},
		});
	};

	const onRow = (record: WorkspaceType) => {
		return {
			onClick: (e: any) => {
				e.stopPropagation();
				if (record.status === WORKSPACE.ACCEPT) {
					navigate('/workspace-detail/' + record.id);
				}
			},
		};
	};

	const columns: ColumnsType<WorkspaceType> = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'title_workspace',
			key: 'name',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: WorkspaceType) => (
				<div className="action-icons-workspace">
					{record.status === 'pending' ? (
						<>
							<CheckCircleOutlined
								className="icons-check-workspace"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleAcceptWorkspace(record.id);
								}}
							/>
							<CloseCircleOutlined
								className="icons-close-workspace"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleRejectWorkspace(record.id);
								}}
							/>
						</>
					) : (
						'No actions'
					)}
				</div>
			),
		},
	];

	return (
		<>
			<Button className="btn-wrap-campaign">
				<Link style={{ color: 'white' }} to={'/create-workspace'}>
					<PlusCircleOutlined /> Create Workspace
				</Link>
			</Button>
			<Table<WorkspaceType>
				columns={columns}
				dataSource={listWorkSpace?.data}
				rowKey={(record) => record.id}
				pagination={{
					defaultPageSize: pageSize,
					showSizeChanger: true,
					current: currentPage,
					total: listWorkSpace?.meta.itemCount,
					onChange: handlePaginationChange,
				}}
				scroll={{ x: 'max-content' }}
				loading={isLoading}
				onRow={onRow}
			/>
		</>
	);
};
