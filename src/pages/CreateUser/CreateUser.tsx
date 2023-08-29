import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useCreateUser } from '@hooks';
import { UserCreate } from '@types';

export function CreateUser() {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const { mutateAsync: createUser, isLoading } = useCreateUser();

	const onFinish = async (values: UserCreate) => {
		await createUser(values);
		navigate('/');
	};

	return (
		<div className="register-container">
			<Form
				className="register-form"
				size="large"
				form={form}
				onFinish={onFinish}
			>
				<Form.Item name="name" required>
					<Input placeholder="Your name" />
				</Form.Item>

				<Form.Item name="phone_number" required>
					<Input type="tel" placeholder="Phone number" />
				</Form.Item>

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
						Create User
					</Button>
				</Form.Item>
			</Form>

			<Link to={'/'}>Return to homepage</Link>
		</div>
	);
}
