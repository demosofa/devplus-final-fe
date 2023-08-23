import { Button, Col, Form, Input, message, Row } from 'antd';
import { useCreateWorkSpace } from 'hooks/useCreateWorkspace';
import { CREATEWORKSPACE } from 'types';

import './CreateWorkSpace.css';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

export const CreateWorkSpace = () => {
	const [form] = Form.useForm();
	const createWSpace = useCreateWorkSpace();
	const [submitting, setSubmitting] = useState(false);

	const addWorkSpace = async (values: CREATEWORKSPACE) => {
		try {
			setSubmitting(true);
			await createWSpace.mutateAsync(values);
			message.success('Workspace created successfully');
			form.resetFields();
		} catch (error) {
			console.error('Error creating workspace:', error);
			message.error(
				'Email or Title workspace is exist in Workspace. Please try again.'
			);
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
					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
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
						</Col>
					</Row>
					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
							<Form.Item
								label="Name"
								name={'name'}
								rules={[{ required: true, message: 'Please input your name!' }]}
							>
								<Input placeholder="Input name" />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
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
						</Col>
					</Row>
					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
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
						</Col>
					</Row>
					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
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
						</Col>
					</Row>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button
							className="submit-button"
							type="primary"
							htmlType="submit"
							loading={submitting}
						>
							{submitting ? 'Registering...' : 'Register'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};
