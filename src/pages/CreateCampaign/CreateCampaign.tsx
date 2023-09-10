import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { RangePickerProps } from 'antd/es/date-picker';
import { PlusCircleOutlined } from '@ant-design/icons';

import './CreateCampaign.css';
import { useCreateCampaign } from '@hooks';
import { CampaignType } from '@types';

dayjs.extend(customParseFormat);

export const CreateCampaign = () => {
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
		<Row>
			<Col span={24} sm={23} md={16}>
				<Form
					form={form}
					onFinish={onFinish}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
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
					>
						<ReactQuill
							className="quill-editor override"
							value={description}
							onChange={handleDescriptionChange}
						/>
					</Form.Item>

					<Form.Item
						style={{ marginTop: 30 }}
						className="fontWeight"
						label="Expired Time"
						name="expired_time"
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
							style={{ display: 'block' }}
						/>
					</Form.Item>

					<Form.Item colon={false} className="full-btn">
						<Button type="primary" htmlType="submit" loading={isLoading}>
							<PlusCircleOutlined /> Create Campaign
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};