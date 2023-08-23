import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleFilled,
} from '@ant-design/icons';
import { Modal, Table } from 'antd';
import { WorkspaceType } from '@types';
import './WorkSpace.css';
import { ColumnsType } from 'antd/es/table';
import {
	useAcceptWorkspace,
	useGetListWorkSpace,
	useRejectWorkspace,
} from '@hooks';

const WorkSpace = () => {
	const { data: listWorkSpace } = useGetListWorkSpace();
	const acceptWorkspace = useAcceptWorkspace();
	const rejectWorkspace = useRejectWorkspace();

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
			title: 'id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'name',
			dataIndex: 'title_workspace',
			key: 'name',
			render: (text: string) => <a>{text}</a>,
		},
		{
			title: 'email',
			dataIndex: 'admin_email',
			key: 'email',
		},
		{
			title: 'password',
			dataIndex: 'admin_password',
			key: 'password',
		},
		{
			title: 'status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: WorkspaceType) => (
				<div className="action-icons">
					{record.status === 'pending' && (
						<>
							<CheckCircleOutlined
								className="icons-check"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleAcceptWorkspace(record.id);
								}}
							/>
							<CloseCircleOutlined
								className="icons-close"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleRejectWorkspace(record.id);
								}}
							/>
						</>
					)}
				</div>
			),
		},
	];

	return (
		<Table<WorkspaceType>
			columns={columns}
			dataSource={listWorkSpace}
			rowKey={(record) => record.id}
		/>
	);
};

export default WorkSpace;
