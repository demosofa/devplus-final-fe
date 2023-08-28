import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleFilled,
} from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { WorkspaceType } from '@types';
import { useState } from 'react';
import './WorkSpace.css';
import { ColumnsType } from 'antd/es/table';
import {
	useAcceptWorkspace,
	useGetListWorkSpace,
	useRejectWorkspace,
} from '@hooks';
import { Link } from 'react-router-dom';

export const WorkSpace = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const { data: listWorkSpace, isLoading } = useGetListWorkSpace(
		currentPage,
		pageSize
	);

	const acceptWorkspace = useAcceptWorkspace();
	const rejectWorkspace = useRejectWorkspace();
	console.log(listWorkSpace);
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

	const columns: ColumnsType<WorkspaceType> = [
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
			dataIndex: 'title_workspace',
			key: 'name',
			render: (text: string, record: WorkspaceType) => (
				<>
					{record.status === 'accept' ? (
						<Link to={`/workspace-detail/${record.id}`}>{text}</Link>
					) : (
						<span>{text}</span>
					)}
				</>
			),
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
				style={{ overflowX: 'auto' }}
				loading={isLoading}
			/>
		</>
	);
};
