import { Button, Col, Form, Input, Row } from 'antd';

import { useCreateHR } from '@hooks';
import { UserCreate } from '@types';
import './CreateHR.css';

export function CreateHR() {
	const [form] = Form.useForm();

	const { mutateAsync: createHR, isLoading } = useCreateHR();

	const onFinish = async (values: UserCreate) => {
		await createHR(values);

		form.resetFields();
	};

	return (
		<Row>
			<Col span={24} sm={23} md={16}>
				<Form
					className="create-hr-form"
					form={form}
					onFinish={onFinish}
					size="large"
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Form.Item className="fontWeight" label="Name" name="name" required>
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
						className="fontWeight"
						wrapperCol={{ span: 24, sm: 10 }}
						style={{ paddingTop: 20 }}
					>
						<Button loading={isLoading} block htmlType="submit">
							Create HR
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
}
