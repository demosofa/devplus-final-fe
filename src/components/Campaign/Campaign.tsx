import { useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { CampaignType } from '@types';
import { useGetListCampaign } from '../../hooks';

export const Campaign = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data: listCampaign, isLoading } = useGetListCampaign(currentPage);

	const [pageSize, setPageSize] = useState(5);

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setCurrentPage(page);
		if (pageSize) {
			setPageSize(pageSize);
		}
	};

	const columns: ColumnsType<CampaignType> = [
		{
			title: 'STT',
			key: 'index',
			render: (_text, _record, index) => index + 1,
		},
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'expired time',
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
		<>
			<Table<CampaignType>
				columns={columns}
				dataSource={listCampaign?.data}
				rowKey={(record) => record.id}
				pagination={{
					defaultPageSize: pageSize,
					showSizeChanger: true,
					current: currentPage,
					total: listCampaign?.meta.itemCount,
					onChange: handlePaginationChange,
				}}
				style={{ overflowX: 'auto' }}
				loading={isLoading}
			/>
		</>
	);
};
