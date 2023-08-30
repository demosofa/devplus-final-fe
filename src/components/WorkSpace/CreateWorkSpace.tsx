import { Button, Form, Input } from 'antd';
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { CreateWorkspaceType } from 'types';
import { useCreateWorkSpace } from 'hooks/useCreateWorkspace';
import './CreateWorkSpace.css';
import { useNavigate } from 'react-router-dom';

export const CreateWorkSpace = () => {
	const [form] = Form.useForm();
	const createWSpace = useCreateWorkSpace();
	const [submitting, setSubmitting] = useState(false);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);
	const addWorkSpace = async (values: CreateWorkspaceType) => {
		setSubmitting(true);

		try {
			await createWSpace.mutateAsync(values);
			setRegistrationSuccess(true);
			form.resetFields();
		} catch (error) {
			console.error('Registration failed:', error);
		}

		setSubmitting(false);
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (registrationSuccess) {
			setTimeout(() => {
				navigate('/workspace');
			}, 1000);
		}
	}, [navigate, registrationSuccess]);

	return (
		<>
			<div className="register_workspace">
				<UserOutlined />
				<span> Register Workspace</span>
			</div>
			<hr />

			<div className="container">
				<Form
					className="formWorkspace"
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
						<Input className="inputWorkspace" placeholder="Input workspace" />
					</Form.Item>

					<Form.Item
						label="Name"
						name={'name'}
						rules={[{ required: true, message: 'Please input your name!' }]}
					>
						<Input className="inputWorkspace" placeholder="Input name" />
					</Form.Item>

					<Form.Item
						label="Email"
						name={'email'}
						rules={[
							{ required: true, message: 'Please input your email!' },
							{ type: 'email', message: 'Please enter a valid email!' },
						]}
					>
						<Input className="inputWorkspace" placeholder="Input email" />
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
						<Input.Password
							className="inputWorkspace"
							placeholder="Input password"
						/>
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
						<Input
							className="inputWorkspace"
							placeholder="Input phone number"
						/>
					</Form.Item>

					<Form.Item>
						<Button
							className="submit-button"
							type="primary"
							htmlType="submit"
							loading={submitting}
						>
							<PlusCircleOutlined />{' '}
							{submitting ? 'Registering...' : 'Register'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};
