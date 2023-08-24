import { SoundFilled } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';

import './UpdateCampaign.css';
import { useFindOneCampaign, useUpdateCampaign } from '@hooks';
import { CampaignType } from '@types';

export const UpdateCampaign = () => {
	const { id } = useParams();
	const { data: campaign, isLoading: campaignLoading } = useFindOneCampaign(
		+id!
	);
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	const updateCampaignHandle = useUpdateCampaign();

	const handleUpdateCampaign = async (data: CampaignType) => {
		try {
			setSubmitting(true);

			data.id = +id!;
			await updateCampaignHandle.mutateAsync(data);

			message.success('Campaign created successfully');

			form.resetFields();
		} catch (error) {
			message.error('Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	if (campaignLoading) return null;

	return (
		<div>
			<div className="register_workspace">
				<SoundFilled />
				&nbsp;
				<span> Update Campaign</span>
			</div>
			<hr />
			<Form
				form={form}
				onFinish={handleUpdateCampaign}
				labelCol={{ span: 10 }}
				wrapperCol={{ span: 20 }}
			>
				<Form.Item
					label="Name"
					name={'name'}
					rules={[
						{
							required: true,
							message: 'Please input your new name!',
						},
					]}
				>
					<Input placeholder="Input name" defaultValue={campaign.name} />
				</Form.Item>

				<Form.Item
					label="Description"
					name={'description'}
					rules={[{ required: true, message: 'Please input new description!' }]}
				>
					<TextArea
						placeholder="Input description"
						defaultValue={campaign.description}
					/>
				</Form.Item>

				<Form.Item
					className="timestampInitial"
					label="Expired time"
					name={'expired_time'}
				>
					<DatePicker defaultValue={dayjs(campaign.expired_time)} showTime />
				</Form.Item>

				<Form.Item className="submit-button">
					<Button type="primary" htmlType="submit" loading={submitting}>
						{submitting ? 'Update...' : 'Update'}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
