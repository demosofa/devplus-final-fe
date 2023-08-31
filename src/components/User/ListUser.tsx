import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Spin } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

import { useGetListUser } from 'hooks/useListUser';
import { UserType } from '@types';

export const ListUser = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const { data: listUser, isLoading } = useGetListUser(currentPage, pageSize);

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setCurrentPage(page);
		if (pageSize) {
			setPageSize(pageSize);
		}
	};

	const onRow = (record: UserType) => {
		return {
			onClick: (e: any) => {
				e.stopPropagation();
				navigate('/detail-user/' + record.id);
			},
		};
	};

	const navigate = useNavigate();

	const columns: ColumnsType<UserType> = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'Name',
			render: (text: string, record) => (
				<>
					<Link to={`/detail-user/${record.id}`}>{text}</Link>
				</>
			),
		},

		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Phone number',
			dataIndex: 'phone_number',
			key: 'Phone number',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: UserType) => {
				return (
					<div className="action-icons">
						<div className="campaign-action">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="icons-check"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									navigate('/update-user/' + record.id);
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
									// handleDeleteCampaign(record.id);
								}}
							>
								<path
									fill="currentColor"
									d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9s9-4.038 9-9s-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7s7 3.14 7 7s-3.141 7-7 7zm.707-7l2.646-2.646a.502.502 0 0 0 0-.707a.502.502 0 0 0-.707 0L12 11.293L9.354 8.646a.5.5 0 0 0-.707.707L11.293 12l-2.646 2.646a.5.5 0 0 0 .707.708L12 12.707l2.646 2.646a.5.5 0 1 0 .708-.706L12.707 12z"
								/>
							</svg>
						</div>
					</div>
				);
			},
		},
	];

	if (isLoading) {
		return (
			<div>
				<Spin tip="Loading" size="large">
					<div className="content" />
				</Spin>
			</div>
		);
	}

	return (
		<>
			<Table<UserType>
				columns={columns}
				dataSource={listUser?.data}
				rowKey={(record) => record.id}
				pagination={{
					defaultPageSize: pageSize,
					showSizeChanger: true,
					current: currentPage,
					total: listUser?.meta.itemCount,
					onChange: handlePaginationChange,
				}}
				style={{ overflowX: 'auto' }}
				loading={isLoading}
				onRow={onRow}
			/>
		</>
	);
};
