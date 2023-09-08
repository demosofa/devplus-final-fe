import { Button, Card, DatePicker, Form, Input, Space } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { RangePickerProps } from 'antd/es/date-picker';
import { PlusCircleOutlined } from '@ant-design/icons';

import './CreateCampaign.css';
import { useCreateCampaign } from 'hooks/useCreateCampaign';
import { CampaignType } from '@types';

export const CreateCampaign = () => {
	dayjs.extend(customParseFormat);

	const [form] = Form.useForm();

	const { mutate: CreateCampaign, isLoading } = useCreateCampaign();

	const [description, setDescription] = useState('');

	const onFinish = (values: CampaignType) => {
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
				<div className="container-detail">
					<Form
						form={form}
						onFinish={onFinish}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
					>
						<div className="form-row">
							<Form.Item
								className="fontWeight"
								label="Name"
								name={'name'}
								rules={[
									{
										required: true,
										message: 'Please input your new name!',
									},
								]}
							>
								<Input placeholder="Input name" />
							</Form.Item>
						</div>

						<div className="form-row">
							<Form.Item
								className="fontWeight"
								label="Description"
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
									className="quill-editor"
									value={description}
									onChange={handleDescriptionChange}
									style={{ height: '120px' }}
								/>
							</Form.Item>
						</div>

						<div className="form-row">
							<Form.Item
								style={{ marginTop: 30 }}
								className="fontWeight"
								label="Expired Time"
								rules={[
									{
										required: true,
										message: 'Please select a date',
									},
								]}
							>
								<Space.Compact>
									<Form.Item name="expired_time">
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
							<Button type="primary" htmlType="submit" loading={isLoading}>
								<PlusCircleOutlined /> Create Campaign
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Card>
		</div>
	);
};
