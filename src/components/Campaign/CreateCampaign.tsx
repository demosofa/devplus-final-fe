import { Button, DatePicker, Form, Input, Space, message } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateCampaign.css';
import { useCreateCampaign } from 'hooks/useCreateCampaign';
import { CreateCampaignType } from '@types';

const CreateCampaign = () => {
	const { id } = useParams();
	const [form] = Form.useForm();
	const CreateCampaign = useCreateCampaign();
	const [submitting, setSubmitting] = useState(false);
	const [description, setDescription] = useState('');

	const onFinish = (values: CreateCampaignType) => {
		try {
			setSubmitting(true);

			values.workspaceId = +id!;
			CreateCampaign.mutate(values);

			message.success('campaign created successfully');

			form.resetFields();
		} catch (error) {
			message.error(
				'Email or Title campaign is exist in campaign. Please try again.'
			);
		} finally {
			setSubmitting(false);
		}
	};

	dayjs.extend(customParseFormat);

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
		<>
			<div className="main-container">
				<Form
					form={form}
					onFinish={onFinish}
					name="complex-form"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					className="full-form"
				>
					<Form.Item label="Name">
						<Space>
							<Form.Item
								name="name"
								noStyle
								rules={[
									{
										required: true,
										message: 'Please enter a name',
									},
								]}
							>
								<Input
									type="input"
									style={{
										width: '200px',
									}}
									placeholder="abc..."
								/>
							</Form.Item>
						</Space>
					</Form.Item>
					<Form.Item
						label="Description"
						name="description"
						style={{
							marginBottom: 0,
						}}
					>
						<Form.Item
							name="description"
							rules={[
								{
									required: true,
								},
							]}
							style={{
								display: 'inline-block',
							}}
						>
							<ReactQuill
								value={description}
								onChange={handleDescriptionChange}
								style={{ width: '200px' }}
							/>
						</Form.Item>
					</Form.Item>
					<div className="form-container">
						<Form.Item label="Expired Time" className="full-form">
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

					<Form.Item label=" " colon={false} className="full-btn">
						<Button type="primary" className="btn-cancel">
							Cancel
						</Button>
						<Button
							className="submit-button"
							type="primary"
							htmlType="submit"
							loading={submitting}
						>
							{submitting ? 'Registering...' : 'Register'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default CreateCampaign;
