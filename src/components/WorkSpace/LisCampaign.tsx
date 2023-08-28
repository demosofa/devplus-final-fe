import { Table } from 'antd';

import { useDetailWorkspace } from 'hooks/useDetailWorkspace';
import ReactQuill from 'react-quill';

export const ListCampaign = () => {
	const { data: listWorkSpace } = useDetailWorkspace();

	const columns = [
		{
			title: 'name',
			dataIndex: 'name',
			key: 'name',
			render: (text: string) => <a>{text}</a>,
		},
		{
			title: 'description',
			dataIndex: 'description',
			key: 'description',
			render: (value: string) => (
				<ReactQuill value={value} readOnly={true} theme={'bubble'} />
			),
		},
		{
			title: 'Expired Time',
			dataIndex: 'expired_time',
			key: 'expired_time',
		},
		{
			title: 'status',
			dataIndex: 'status',
			key: 'status',
		},
	];
	return (
		<div>
			<h3 className="workspace-wrap-text">Campaign</h3>
			<Table
				columns={columns}
				dataSource={listWorkSpace?.campaign}
				rowKey={(record) => record.id}
			/>
		</div>
	);
};
