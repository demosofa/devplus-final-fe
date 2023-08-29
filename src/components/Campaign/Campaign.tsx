import { useMemo, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { CAMPAIGN } from '@enums';
import { CampaignType } from '@types';
import { useGetListCampaign } from '../../hooks';
import { SearchBar } from '../SearchBar/SearchBar';
import './Campaign.css';
import { UpdateCampaign } from './UpdateCampaign';
import { useNavigate } from 'react-router-dom';
import { useDeleteCampaign } from 'hooks/useDeleteCampaign';
import { ExclamationCircleFilled } from '@ant-design/icons';

export const Campaign = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [searchName, setSearchName] = useState('');

	const navigate = useNavigate();

	const { data: listCampaign, isLoading } = useGetListCampaign(
		currentPage,
		pageSize
	);

	const deleteCampaign = useDeleteCampaign();

	const handleDeleteCampaign = (id: number) => {
		Modal.confirm({
			title: `Accept Workspace ${id}`,
			icon: <ExclamationCircleFilled />,
			content: 'Do you Want to delete this campaign?',
			onOk() {
				deleteCampaign.mutate(id);
			},
		});
	};

	const filteredCampaigns = useMemo(() => {
		if (!listCampaign?.data) return [];

		if (!searchName) return listCampaign.data;

		return listCampaign.data.filter((campaign) =>
			campaign.name.toLowerCase().includes(searchName.toLowerCase())
		);
	}, [listCampaign, searchName]);

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setCurrentPage(page);
		if (pageSize) {
			setPageSize(pageSize);
		}
	};

	const [isModalOpen, setIsModalOpen] = useState<CampaignType | null>(null);

	const showModal = (record: CampaignType) => {
		setIsModalOpen(record);
	};

	const onRow = (record: CampaignType) => {
		return {
			onClick: (e: any) => {
				e.stopPropagation();
				navigate('/detail-campaign/' + record.id);
			},
		};
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
			key: 'Name',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			render: (description) => (
				<p dangerouslySetInnerHTML={{ __html: description }} />
			),
		},
		{
			title: 'Workspace',
			dataIndex: ['workspace', 'title_workspace'],
			key: 'workspace',
		},
		{
			title: 'Expired Time',
			dataIndex: 'expired_time',
			key: 'expired_time',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: CampaignType) => {
				return (
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
										showModal(record);
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
										handleDeleteCampaign(record.id);
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
				);
			},
		},
	];

	return (
		<>
			<SearchBar placeholder="Search by name" onSearch={setSearchName} />

			<Table<CampaignType>
				columns={columns}
				dataSource={filteredCampaigns}
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
				onRow={onRow}
			/>

			{isModalOpen ? (
				<UpdateCampaign data={isModalOpen} setData={setIsModalOpen} />
			) : null}
		</>
	);
};
