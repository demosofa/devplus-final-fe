import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';

import { CvType, WorkspaceType } from '@types';
import { useGetListCv } from '@hooks';
import { CV } from '@enums';
import { formattedDate, formattedTime } from 'components/Date';

export const Cv = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const { data: cv, isLoading } = useGetListCv(currentPage, pageSize);

	const navigate = useNavigate();

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
			render: (text) => {
				const startIndex = text.indexOf('/d/') + 3;
				const endIndex = text.indexOf('/view');
				const fileId = text.substring(startIndex, endIndex);
				return (
					<Link to={`https://drive.google.com/uc?id=${fileId}`} target="_blank">
						Follow me
					</Link>
				);
			},
		},
		{
			title: 'Create At',
			dataIndex: 'create_at',
			key: 'create_at',
			render: () => {
				return (
					<span>
						{formattedDate} {formattedTime}
					</span>
				);
			},
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
							<CheckCircleOutlined className="icons-check-workspace" />
							<CloseCircleOutlined className="icons-close-workspace" />
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
