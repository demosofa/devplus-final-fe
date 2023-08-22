import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useGetListWorkSpace } from 'hooks/useGetListWorkSpace';
import { WORKSPACE } from 'types';
import './WorkSpace.css';

const WorkSpace = () => {
	const { data: listWorkSpace } = useGetListWorkSpace();
	const columns = [
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
			render: (record: WORKSPACE) => (
				<div className="action-icons">
					{record.status === 'pending' && (
						<>
							<CheckCircleOutlined className="icons-check" />
							<CloseCircleOutlined className="icons-close" />
						</>
					)}
				</div>
			),
		},
	];

	return (
		<Table<WORKSPACE>
			columns={columns}
			dataSource={listWorkSpace}
			rowKey={(record) => record.id}
		/>
	);
};

export default WorkSpace;
