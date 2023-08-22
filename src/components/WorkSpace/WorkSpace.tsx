import { Table } from 'antd';
import { useGetListWorkSpace } from 'hooks/useGetListWorkSpace';
import { WORKSPACE } from 'types/workspace.type';

const WorkSpace = () => {
	const { data: listWorkSpace } = useGetListWorkSpace();
	const columns = [
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
	];

	return <Table<WORKSPACE> columns={columns} dataSource={listWorkSpace} />;
};

export default WorkSpace;
