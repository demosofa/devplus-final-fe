import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';

import { useCreateHR } from '@hooks';
import { UserCreate } from '@types';
import './CreateHR.css';

const { Title } = Typography;

export function CreateHR() {
	const [form] = Form.useForm();

	const { mutateAsync: createHR, isLoading } = useCreateHR();

	const onFinish = async (values: UserCreate) => {
		await createHR(values);

		form.resetFields();
	};

	return (
		<>
			<Card style={{ marginBottom: 20 }}>
				<Title level={4}>Create HR</Title>
			</Card>
			<Card>
				<Row>
					<Col span={24} sm={16}>
						<Form
							className="create-hr-form"
							form={form}
							onFinish={onFinish}
							size="large"
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
						>
							<Form.Item
								className="fontWeight"
								label="Name"
								name="name"
								required
							>
								<Input placeholder="Your name" />
							</Form.Item>

							<Form.Item
								className="fontWeight"
								label="Phone number"
								name="phone_number"
								required
							>
								<Input type="tel" placeholder="Phone number" />
							</Form.Item>

							<Form.Item
								className="fontWeight"
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
								className="fontWeight"
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
								className="create-hr-btn fontWeight"
								wrapperCol={{ span: 24, sm: 16 }}
							>
								<Button loading={isLoading} block htmlType="submit">
									Create HR
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Card>
		</>
	);
}
