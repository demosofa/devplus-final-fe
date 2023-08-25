import { Button, Form, Input } from 'antd';
import { useCreateWorkSpace } from 'hooks/useCreateWorkspace';
import { CreateWorkspaceType } from 'types';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

import './CreateWorkSpace.css';

export const CreateWorkSpace = () => {
	const [form] = Form.useForm();
	const createWSpace = useCreateWorkSpace();
	const [submitting, setSubmitting] = useState(false);

	const addWorkSpace = async (values: CreateWorkspaceType) => {
		setSubmitting(true);

		await createWSpace.mutateAsync(values);

		form.resetFields();

		setSubmitting(false);
	};

	return (
		<>
			<div className="register_workspace">
				<UserOutlined />
				<span> Register Workspace</span>
			</div>
			<hr />

			<div className="container">
				<Form
					form={form}
					onFinish={addWorkSpace}
					labelCol={{ span: 10 }}
					wrapperCol={{ span: 20 }}
				>
					<Form.Item
						label="Title workspace"
						name={'title_workspace'}
						rules={[
							{
								required: true,
								message: 'Please input your title of workspace!',
							},
						]}
					>
						<Input placeholder="Input workspace" />
					</Form.Item>

					<Form.Item
						label="Name"
						name={'name'}
						rules={[{ required: true, message: 'Please input your name!' }]}
					>
						<Input placeholder="Input name" />
					</Form.Item>

					<Form.Item
						label="Email"
						name={'email'}
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Please enter a valid email!' },
						]}
					>
						<Input placeholder="Input email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name={'password'}
						rules={[
							{ required: true, message: 'Please input your password!' },
							{
								min: 8,
								message: 'Password must be at least 8 characters!',
							},
						]}
					>
						<Input.Password placeholder="Input password" />
					</Form.Item>

					<Form.Item
						label="Phone number"
						name={'phone_number'}
						rules={[
							{
								required: true,
								message: 'Please input your phone number!',
							},
							{
								min: 10,
								message: 'phone number must be at least 10 characters!',
							},
						]}
					>
						<Input placeholder="Input phone number" />
					</Form.Item>

					<Form.Item className="submit-button">
						<Button type="primary" htmlType="submit" loading={submitting}>
							{submitting ? 'Registering...' : 'Register'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};
