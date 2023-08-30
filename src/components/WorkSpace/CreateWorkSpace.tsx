import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';

import { useCreateWorkSpace } from '@hooks';
import { CreateWorkspaceType } from 'types';
import './CreateWorkSpace.css';

export const CreateWorkSpace = () => {
	const [form] = Form.useForm();
	const { mutateAsync: createWSpace, isLoading } = useCreateWorkSpace();

	const addWorkSpace = async (values: CreateWorkspaceType) => {
		await createWSpace(values);
		form.resetFields();
	};

	return (
		<div>
			<Card style={{ marginBottom: 15 }}>
				<div className="register_workspace">
					<span> Register Workspace</span>
				</div>
			</Card>
			<Card>
				<div className="container">
					<Form
						className="formWorkspace"
						form={form}
						onFinish={addWorkSpace}
						labelCol={{ span: 3 }}
						wrapperCol={{ span: 20 }}
					>
						<div className="form-row">
							<Form.Item
								label="Title"
								name={'title_workspace'}
								rules={[
									{
										required: true,
										message: 'Please input your title of workspace!',
									},
								]}
							>
								<Input
									className="inputWorkspace"
									placeholder="Input workspace"
								/>
							</Form.Item>
						</div>
						<div className="form-row">
							<Form.Item
								label="Name"
								name={'name'}
								rules={[{ required: true, message: 'Please input your name!' }]}
							>
								<Input className="inputWorkspace" placeholder="Input name" />
							</Form.Item>
						</div>
						<div className="form-row">
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
						</div>
						<div className="form-row">
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
						</div>
						<div className="form-row">
							<Form.Item
								label="Phone number:"
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
						</div>

						<Form.Item colon={false} className="full-btn">
							<Button
								className="submit-button marg128"
								type="primary"
								htmlType="submit"
								loading={isLoading}
							>
								<PlusCircleOutlined /> Create Workspace
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Card>
		</div>
	);
};
