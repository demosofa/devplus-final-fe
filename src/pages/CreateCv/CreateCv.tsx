import { Button, Card, Form, Input, Space, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { PlusCircleOutlined } from '@ant-design/icons';

import { CreateCvType } from '@types';
import { useCreateCv } from '@hooks';

const CreateCv = () => {
	const { campaignId } = useParams();

	const [form] = Form.useForm();

	const { mutate: CreateCv, isLoading } = useCreateCv();

	const onFinish = (values: CreateCvType) => {
		values.campaignId = campaignId!;

		const { file, ...formValues }: { [key: string]: any } = values;
		const uploadFile = file.file as File;

		const formData = new FormData();
		formData.append('file', uploadFile);
		for (const name in formValues) {
			const value: string = formValues[name].toString();
			formData.append(name, value);
		}

		CreateCv(formData);
		form.resetFields();
	};

	return (
		<div>
			<Card>
				<div className="register_workspace">
					<span> Apply CV</span>
				</div>
				<div className="main-container">
					<Form
						form={form}
						onFinish={onFinish}
						name="complex-form"
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
						className="full-form"
					>
						<div className="form-row">
							<Form.Item label="Name">
								<Space>
									<Form.Item
										name="name"
										noStyle
										rules={[
											{
												required: true,
												message: 'Please enter your name',
											},
										]}
									>
										<Input
											type="input"
											style={{
												width: '800px',
											}}
											placeholder="Input your name"
										/>
									</Form.Item>
								</Space>
							</Form.Item>
						</div>
						<div className="form-row">
							<Form.Item label="Email">
								<Space>
									<Form.Item
										name="email"
										noStyle
										rules={[
											{
												required: true,
												message: 'Please enter your email',
											},
										]}
									>
										<Input
											type="input"
											style={{
												width: '800px',
											}}
											placeholder="Input your email"
										/>
									</Form.Item>
								</Space>
							</Form.Item>
						</div>
						<div className="form-row">
							<Form.Item label="Phone Number">
								<Space>
									<Form.Item
										name="phone_number"
										noStyle
										rules={[
											{
												required: true,
												message: 'Please enter your phone',
											},
										]}
									>
										<Input
											type="input"
											style={{
												width: '800px',
											}}
											placeholder="Input your phone number"
										/>
									</Form.Item>
								</Space>
							</Form.Item>
						</div>
						<div className="form-row">
							<Form.Item label="Position ">
								<Space>
									<Form.Item
										name="apply_position"
										noStyle
										rules={[
											{
												required: true,
												message: 'Please enter your position',
											},
										]}
									>
										<Input
											type="input"
											style={{
												width: '800px',
											}}
											placeholder="Input your phone position"
										/>
									</Form.Item>
								</Space>
							</Form.Item>
						</div>
						<div className="form-row">
							<Form.Item
								name="file"
								label="File"
								rules={[
									{
										required: true,
										message: 'Please enter your file',
									},
								]}
							>
								<Upload
									accept="application/pdf"
									maxCount={1}
									beforeUpload={() => false}
								>
									<Button icon={<PlusCircleOutlined />} type="default">
										Upload File
									</Button>
								</Upload>
							</Form.Item>
						</div>

						<Form.Item colon={false} className="full-btn">
							<Button
								className="submit-button"
								type="primary"
								htmlType="submit"
								loading={isLoading}
							>
								<PlusCircleOutlined /> Apply Cv
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Card>
		</div>
	);
};

export default CreateCv;
