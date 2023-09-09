import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Grid, Col, Form, Input, Row, Typography, Space } from 'antd';
import { Link } from 'react-router-dom';

import { useCreateWorkSpace } from '@hooks';
import { CreateWorkspaceType } from '@types';
import './CreateWorkSpace.css';

const { useForm } = Form;
const { useBreakpoint } = Grid;

const { Title } = Typography;

export const CreateWorkSpace = () => {
	const [form] = useForm();
	const breakpoint = useBreakpoint();

	const { mutateAsync: createWSpace, isLoading } = useCreateWorkSpace();

	const addWorkSpace = async (values: CreateWorkspaceType) => {
		await createWSpace(values);
		form.resetFields();
	};

	return (
		<Row className="login-container">
			<Col span={0} md={12} lg={14} className="login-left"></Col>

			<Col
				span={24}
				md={12}
				lg={10}
				className={`login-right ${breakpoint.md ? '' : 'mobile'}`}
			>
				<Row style={{ height: '100%' }} align="middle">
					<Col span={24}>
						<Title
							className={`login-title ${breakpoint.md ? '' : 'mobile'}`}
							level={2}
						>
							Create Workspace
						</Title>

						<Row justify="center">
							<Col span={23} sm={20} md={22}>
								<Form
									form={form}
									className={`login-form ${breakpoint.md ? '' : 'mobile'}`}
									onFinish={addWorkSpace}
									size="large"
									labelCol={{ span: 8, xl: 6 }}
									labelAlign="left"
									wrapperCol={{ span: 16, xl: 18 }}
								>
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
										<Input placeholder="Input workspace" />
									</Form.Item>

									<Form.Item
										label="Name"
										name={'name'}
										rules={[
											{ required: true, message: 'Please input your name!' },
										]}
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
											{
												required: true,
												message: 'Please input your password!',
											},
											{
												min: 8,
												message: 'Password must be at least 8 characters!',
											},
										]}
									>
										<Input.Password placeholder="Input password" />
									</Form.Item>

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
										<Input placeholder="Input phone number" />
									</Form.Item>

									<Form.Item className="login-btn" wrapperCol={{ span: 24 }}>
										<Space.Compact block style={{ gap: 5 }}>
											<Button>
												<Link to={'..'}>Go back</Link>
											</Button>

											<Button
												block
												type="primary"
												htmlType="submit"
												loading={isLoading}
											>
												<PlusCircleOutlined /> Create Workspace
											</Button>
										</Space.Compact>
									</Form.Item>
								</Form>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
