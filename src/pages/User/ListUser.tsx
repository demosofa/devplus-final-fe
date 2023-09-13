import { Button, Form, Input, Modal, Select, SelectProps, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '@types';
import { useAuth, useUpdateUser, useGetListUser } from '@hooks';
import { AUTH_STATUS, ROLE } from '@enums';

const { useForm } = Form;

export const ListUser = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const [isModalOpen, setIsModalOpen] = useState<UserType | undefined>();

	const [form] = useForm();

	const { getAuth } = useAuth();

	const auth = getAuth();

	const { data: listUser, isLoading } = useGetListUser(
		auth,
		currentPage,
		pageSize,
		searchTerm
	);

	const { mutateAsync: updateUser, isLoading: loadUpdateUser } =
		useUpdateUser();

	const handlePaginationChange = (page: number, pageSize?: number) => {
		setCurrentPage(page);
		if (pageSize) {
			setPageSize(pageSize);
		}
	};

	const handleSearchClick = () => {
		setCurrentPage(1);
		setSearchTerm(searchValue);
	};

	const showModal = (record: UserType) => {
		setIsModalOpen(record);
	};

	const handleOk = () => {
		form.submit();
		setIsModalOpen(undefined);
	};

	const handleCancel = () => {
		setIsModalOpen(undefined);
	};

	const onRow = (record: UserType) => {
		return {
			onClick: (e: any) => {
				e.stopPropagation();

				if (auth?.role != ROLE.SUPER_ADMIN)
					navigate('/detail-user/' + record.id);
			},
		};
	};

	const navigate = useNavigate();

	const onFinish = async (value: UserType) => {
		if (isModalOpen) {
			value.id = isModalOpen.id;
			await updateUser(value);
		}
	};

	const options: SelectProps['options'] = [
		{
			label: 'enable',
			value: 'enable',
		},
		{
			label: 'disable',
			value: 'disable',
		},
	];

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
			render: (status) => {
				let color;
				let text;
				switch (status) {
					case AUTH_STATUS.DISABLE:
						color = 'red';
						text = 'Disable';
						break;
					case AUTH_STATUS.ENABLE:
						color = 'green';
						text = 'Enable';
						break;
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
			render: (record: UserType) => {
				if (auth && auth.role == ROLE.SUPER_ADMIN) {
					return 'No actions';
				}

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
									showModal(record);
								}}
							>
								<path
									fill="currentColor"
									d="m7 14.94l6.06-6.06l2.06 2.06L9.06 17H7v-2.06M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m4.7-10.65l-1 1l-2.05-2.05l1-1c.21-.22.56-.22.77 0l1.28 1.28c.22.21.22.56 0 .77M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2"
								/>
							</svg>
						</div>
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
				scroll={{ x: 'max-content' }}
				loading={isLoading}
				onRow={onRow}
			/>

			<Modal
				title="Update User"
				open={isModalOpen ? true : false}
				onOk={handleOk}
				onCancel={handleCancel}
				confirmLoading={loadUpdateUser}
				destroyOnClose={true}
			>
				<Form
					form={form}
					initialValues={isModalOpen}
					name="form_item_path"
					layout="vertical"
					onFinish={onFinish}
					preserve={false}
				>
					<Form.Item name="name" label="Name">
						<Input />
					</Form.Item>
					<Form.Item name="phone_number" label="Phone Number">
						<Input />
					</Form.Item>
					<Form.Item name="password" label="Password">
						<Input />
					</Form.Item>
					<Form.Item name="status" label="Status">
						<Select options={options} />
					</Form.Item>
					<Form.Item name="email" label="Email">
						<Input disabled />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
