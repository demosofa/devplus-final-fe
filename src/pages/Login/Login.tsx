import { Button, Col, Form, Grid, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth, useLogin } from '@hooks';
import { UserLogin } from '@types';
import { useEffect } from 'react';
import './login.css';

const { Title } = Typography;
const { useBreakpoint } = Grid;

export function Login() {
	const { getAuth, setAuth } = useAuth();

	const navigate = useNavigate();
	const { mutateAsync: login, isLoading } = useLogin();

	const breakpoint = useBreakpoint();

	const onFinish = async (values: UserLogin) => {
		const token = await login(values);
		setAuth(token);
	};

	useEffect(() => {
		const auth = getAuth();

		if (auth) navigate('/');
	}, [getAuth, navigate]);

	return (
		<Row className="login-container">
			<Col span={0} md={14} lg={16} className="login-left"></Col>

			<Col
				span={24}
				md={10}
				lg={8}
				className={`login-right ${breakpoint.md ? '' : 'mobile'}`}
			>
				<Row style={{ height: '100%' }} align="middle">
					<Col span={24}>
						<Title
							className={`login-title ${breakpoint.md ? '' : 'mobile'}`}
							level={2}
						>
							Login
						</Title>

						<Row justify="center">
							<Col span={23} sm={20} md={22}>
								<Form
									className={`login-form ${breakpoint.md ? '' : 'mobile'}`}
									size="large"
									onFinish={onFinish}
								>
									<Form.Item
										name="email"
										rules={[
											{ required: true },
											{
												type: 'email',
												warningOnly: true,
											},
										]}
									>
										<Input type="email" placeholder="Email" />
									</Form.Item>

									<Form.Item
										name="password"
										rules={[
											{ required: true },
											{
												type: 'string',
												warningOnly: true,
											},
										]}
									>
										<Input.Password placeholder="Password" />
									</Form.Item>

									<Form.Item style={{ paddingTop: 14, marginBottom: 14 }}>
										<Button
											loading={isLoading}
											block
											className="register-btn"
											htmlType="submit"
										>
											Login
										</Button>
									</Form.Item>

									<Link to={'/'}>Return to homepage</Link>
								</Form>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}
