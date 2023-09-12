import { Button, Card, Col, DatePicker, Form, Input, Row } from 'antd';
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

const { useForm } = Form;

export const CreateCampaign = () => {
	const [form] = useForm();

	const { mutate: CreateCampaign, isLoading } = useCreateCampaign();

	const [description, setDescription] = useState('');

	const onFinish = (values: CampaignType) => {
		CreateCampaign(values);
		form.resetFields();
	};

	const disabledDate: RangePickerProps['disabledDate'] = (current) => {
		return current && current < dayjs().endOf('day');
	};

	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	return (
		<Card>
			<Row>
				<Col span={24} sm={23} md={16} lg={12}>
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
		</Card>
	);
};
