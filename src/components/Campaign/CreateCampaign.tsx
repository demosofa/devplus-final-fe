import { Button, Card, DatePicker, Form, Input, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { RangePickerProps } from 'antd/es/date-picker';
import { PlusCircleOutlined } from '@ant-design/icons';

import './CreateCampaign.css';
import { useCreateCampaign } from 'hooks/useCreateCampaign';
import { CampaignType } from '@types';

const CreateCampaign = () => {
	dayjs.extend(customParseFormat);

	const { workspaceId } = useParams();

	const [form] = Form.useForm();

	const { mutate: CreateCampaign, isLoading } = useCreateCampaign();

	const [description, setDescription] = useState('');

	const onFinish = (values: CampaignType) => {
		values.workspaceId = Number(workspaceId);

		CreateCampaign(values);
		form.resetFields();
	};

	const range = (start: number, end: number) => {
		const result = [];

		for (let i = start; i < end; i++) {
			result.push(i);
		}

		return result;
	};

	const disabledDate: RangePickerProps['disabledDate'] = (current) => {
		return current && current < dayjs().endOf('day');
	};

	const disabledDateTime = () => ({
		disabledHours: () => range(0, 24).splice(4, 20),
		disabledMinutes: () => range(30, 60),
		disabledSeconds: () => [55, 56],
	});

	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	return (
		<div>
			<Card style={{ marginBottom: 15 }}>
				<div className="register_workspace">
					<span> Create Campaign</span>
				</div>
			</Card>
			<Card>
				<div className="main-container">
					<Form
						form={form}
						onFinish={onFinish}
						name="complex-form"
						labelCol={{
							span: 3,
						}}
						wrapperCol={{
							span: 16,
						}}
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
							<Form.Item
								label="Description"
								name="description"
								style={{
									marginBottom: 0,
								}}
							>
								<Form.Item
									className="checkValid"
									name="description"
									rules={[
										{
											required: true,
											message: 'Please input your description',
										},
									]}
									style={{
										display: 'inline-block',
									}}
								>
									<ReactQuill
										value={description}
										onChange={handleDescriptionChange}
										style={{ width: '800px', height: '120px' }}
									/>
								</Form.Item>
							</Form.Item>
						</div>

						<div className="form-row">
							<Form.Item style={{ marginTop: 45 }} label="Expired Time">
								<Space.Compact>
									<Form.Item
										name="expired_time"
										noStyle
										rules={[
											{
												required: true,
												message: 'Please select a date',
											},
										]}
									>
										<DatePicker
											format="YYYY-MM-DD HH:mm:ss"
											disabledDate={disabledDate}
											disabledTime={disabledDateTime}
											showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
										/>
									</Form.Item>
								</Space.Compact>
							</Form.Item>
						</div>

						<Form.Item colon={false} className="full-btn">
							<Button
								className="submit-button"
								type="primary"
								htmlType="submit"
								loading={isLoading}
							>
								<PlusCircleOutlined /> Create Campaign
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Card>
		</div>
	);
};

export default CreateCampaign;
