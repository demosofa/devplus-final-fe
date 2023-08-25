import { Button, Col, Form, Input, Row } from 'antd';
import { useCreateWorkSpace } from 'hooks/useCreateWorkspace';
import { CreateWorkspaceType } from 'types';

import './CreateWorkSpace.css';
import { useState } from 'react';
import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
	UserOutlined,
} from '@ant-design/icons';

export const CreateWorkSpace = () => {
	const [form] = Form.useForm();
	const createWSpace = useCreateWorkSpace();
	const [submitting, setSubmitting] = useState(false);
	const [successMessageVisible, setSuccessMessageVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);

	const addWorkSpace = async (values: CreateWorkspaceType) => {
		try {
			setSubmitting(true);

			await createWSpace.mutateAsync(values);

			setSuccessMessageVisible(true);
			setTimeout(() => {
				setSuccessMessageVisible(false);
			}, 3000);

			form.resetFields();
		} catch (error) {
			setErrorMessage(true);

			setTimeout(() => {
				setErrorMessage(false);
			}, 3000);
		} finally {
			setSubmitting(false);
		}
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

				{successMessageVisible && (
					<div className="success-message">
						<CheckCircleOutlined className="success-icon" /> &nbsp; Workspace
						created successfully
					</div>
				)}

				{errorMessage && (
					<div className="error-message">
						<ExclamationCircleOutlined className="error-icon" /> &nbsp; Email or
						Title workspace is exist in Workspace.
					</div>
				)}
			</div>
		</>
	);
};
