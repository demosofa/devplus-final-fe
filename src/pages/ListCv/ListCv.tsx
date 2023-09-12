import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	ExclamationCircleFilled,
} from '@ant-design/icons';
import { Button, Input, Modal, Table, Tag } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { CvType, WorkspaceType } from '@types';
import { useAuth, useFailCV, useGetListCv, usePassCV } from '@hooks';
import { CV, ROLE } from '@enums';
import './ListCv.css';

import { BASE_URL } from '@constants';

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

	const passCV = usePassCV();
	const failCV = useFailCV();

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

	const { getAuth } = useAuth();

	const auth = getAuth();

	const onRow = (record: CvType) => {
		return {
			onClick: (e: any) => {
				e.stopPropagation();
				if (record.status === CV.PASS || record.status === CV.FAIL) {
					navigate('/cv-detail/' + record.id);
				}
			},
		};
	};

	const handlePassCV = (id: number) => {
		Modal.confirm({
			title: `Pass CV ${id}`,
			icon: <ExclamationCircleFilled />,
			content: 'Do you want to pass this CV?',
			onOk() {
				passCV.mutate(id);
			},
		});
	};

	const handleFailCV = (id: number) => {
		Modal.confirm({
			title: `Fail CV ${id}`,
			icon: <ExclamationCircleFilled />,
			content: 'Do you want to fail this CV?',
			onOk() {
				failCV.mutate(id);
			},
		});
	};

	const columns: ColumnsType<CvType> = [
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
				<div>
					{text === 'link' ? (
						text.startsWith('https://drive.google.com/') ? (
							<Link
								to={text}
								target="_blank"
								rel="noopener noreferrer"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								{text}
							</Link>
						) : (
							<Link
								to={`${BASE_URL}${text}`}
								target="_blank"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								{text}
							</Link>
						)
					) : text.startsWith('https://drive.google.com/') ? (
						<Link
							to={text}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							Follow me
						</Link>
					) : (
						<Link
							to={`${BASE_URL}${text}`}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => {
								e.stopPropagation();
							}}
						>
							Follow me
						</Link>
					)}
				</div>
			),
		},
		{
			title: 'Campaign',
			dataIndex: ['campaign', 'name'],
			key: 'campaign',
		},
		{
			title: 'Create At',
			dataIndex: 'create_at',
			key: 'create_at',
			render: (timestamp) => {
				return dayjs(timestamp).format('YYYY-MM-DD, HH:mm:ss');
			},
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status) => {
				let color;
				let text;
				switch (status) {
					case CV.FAIL:
						color = 'red';
						text = 'Fail';
						break;
					case CV.PASS:
						color = 'green';
						text = 'Pass';
						break;
					default:
						color = 'blue';
						text = 'New';
				}
				return (
					<Tag
						color={color}
						style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
					>
						{text}
					</Tag>
				);
			},
		},

		{
			title: 'Action',
			key: 'action',
			render: (record: WorkspaceType) => {
				if (auth && auth.role == ROLE.SUPER_ADMIN) {
					return 'No actions';
				}
				return (
					<div className="action-icons-workspace">
						{record.status === CV.NEW ? (
							<>
								<CheckCircleOutlined
									className="icons-check-Cv"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handlePassCV(record.id);
									}}
								/>
								<CloseCircleOutlined
									className="icons-close-Cv"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handleFailCV(record.id);
									}}
								/>
							</>
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
			<Input
				type="text"
				placeholder="Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				style={{ width: '300px' }}
				className="input-search-cv"
				onKeyDown={(e) => {
					e.key === 'Enter' && handleSearchClick();
				}}
			/>
			<Button className="btn-search-cv" onClick={handleSearchClick}>
				Search
			</Button>

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
				scroll={{ x: 'max-content' }}
				loading={isLoading}
				onRow={onRow}
			/>
		</>
	);
};
