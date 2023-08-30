import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';

import { CvType, WorkspaceType } from '@types';
import { useGetListCv } from '@hooks';
import { CV } from '@enums';
import './ListCv.css';

const { Search } = Input;

export const ListCv = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const { data: cv, isLoading } = useGetListCv(
		currentPage,
		pageSize,
		searchTerm
	);

	const navigate = useNavigate();

	const handleSearchClick = () => {
		setCurrentPage(1);
		setSearchTerm(searchValue);
	};

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setCurrentPage(page);
		if (pageSize) {
			setPageSize(pageSize);
		}
	};

	const onRow = (record: CvType) => {
		return {
			onClick: (e: any) => {
				e.stopPropagation();
				if (record.status === CV.PASS) {
					navigate('/cv-detail/' + record.id);
				}
			},
		};
	};

	const columns: ColumnsType<CvType> = [
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
			title: 'Apply position',
			dataIndex: 'apply_position',
			key: 'apply_position',
		},
		{
			title: 'File',
			dataIndex: 'file',
			key: 'file',
			render: (text) => (
				<Link to={text} target="_blank">
					Follow me
				</Link>
			),
		},
		{
			title: 'Campaign',
			dataIndex: ['campaign', 'name'],
			key: 'file',
		},
		{
			title: 'Create At',
			dataIndex: 'create_at',
			key: 'create_at',
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
					{record.status === CV.NEW ? (
						<>
							<CheckCircleOutlined className="icons-check-Cv" />
							<CloseCircleOutlined className="icons-close-Cv" />
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
			<Search
				placeholder="Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onSearch={handleSearchClick}
				className="btn-search-cv"
			/>

			<Table<CvType>
				columns={columns}
				dataSource={cv?.data}
				rowKey={(record) => record.id}
				pagination={{
					defaultPageSize: pageSize,
					showSizeChanger: true,
					current: currentPage,
					total: cv?.meta.itemCount,
					onChange: handlePaginationChange,
				}}
				style={{ overflowX: 'auto' }}
				loading={isLoading}
				onRow={onRow}
			/>
		</>
	);
};
