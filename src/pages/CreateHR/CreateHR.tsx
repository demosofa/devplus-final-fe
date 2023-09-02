import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useCreateHR } from '@hooks';
import { UserCreate } from '@types';
import './CreateHR.css';

const { Title } = Typography;

export function CreateHR() {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const { mutateAsync: createHR, isLoading } = useCreateHR();

	const onFinish = async (values: UserCreate) => {
		await createHR(values);

		form.resetFields();

		navigate('/');
	};

	return (
		<Row>
			<Col span={24} sm={16}>
				<Title level={4}>Create HR</Title>

				<Form
					className="create-hr-form"
					form={form}
					onFinish={onFinish}
					size="large"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Form.Item label="Name" name="name" required>
						<Input placeholder="Your name" />
					</Form.Item>

					<Form.Item label="Phone number" name="phone_number" required>
						<Input type="tel" placeholder="Phone number" />
					</Form.Item>

					<Form.Item
						label="Email"
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
						label="Password"
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

					<Form.Item
						wrapperCol={{ span: 24, sm: 16 }}
						className="create-hr-btn"
					>
						<Button loading={isLoading} block htmlType="submit">
							Create HR
						</Button>
					</Form.Item>

					<Link to={'/'}>Return to homepage</Link>
				</Form>
			</Col>
		</Row>
	);
}
