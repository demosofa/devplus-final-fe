import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth, useLogin } from '@hooks';
import { UserLogin } from '@types';
import { useEffect } from 'react';

export function Login() {
	const { getAuth, setAuth } = useAuth();

	const navigate = useNavigate();
	const { mutateAsync: login, isLoading } = useLogin();

	const onFinish = async (values: UserLogin) => {
		const token = await login(values);
		setAuth(token);
	};

	useEffect(() => {
		const auth = getAuth();

		if (auth) navigate('/');
	}, [getAuth, navigate]);

	return (
		<div>
			<Form className="register-form" size="large" onFinish={onFinish}>
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

				<Form.Item>
					<Button
						loading={isLoading}
						block
						className="register-btn"
						htmlType="submit"
					>
						Sign in
					</Button>
				</Form.Item>
			</Form>

			<Link to={'/'}>Return to homepage</Link>
		</div>
	);
}
