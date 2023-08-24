import { SoundFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, message } from 'antd';
import { useState } from 'react';

import { useUpdateCampaign } from 'hooks/useUpdateCampaign';

import './UpdateCampaign.css';
import { useFindOneCampaign } from 'hooks/useFindOneCampaign';
import { useParams } from 'react-router-dom';
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
			console.error('Error creating campaign:', error);
			message.error('Please try again.');
		} finally {
			setSubmitting(false);
		}
	};
	if (campaignLoading) {
		return null;
	}
	return (
		<div>
			<div className="register_workspace">
				<SoundFilled />
				&nbsp;
				<span> Update Campaign</span>
			</div>
			<hr />
			<div className="container">
				<Form
					form={form}
					onFinish={handleUpdateCampaign}
					labelCol={{ span: 10 }}
					wrapperCol={{ span: 20 }}
				>
					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
							<Form.Item
								label="Name"
								name={'name'}
								rules={[
									{
										required: true,
										message: 'Please input your name!',
									},
								]}
							>
								<Input placeholder="Input name" defaultValue={campaign.name} />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
							<Form.Item
								label="Description"
								name={'description'}
								rules={[
									{ required: true, message: 'Please input description!' },
								]}
							>
								<Input
									placeholder="Input description"
									defaultValue={campaign.description}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={8} xs={24} sm={24} md={16} lg={16} xl={16}>
							<Form.Item label="Expired time" name={'expired_time'}>
								<Input
									placeholder="Input expired time"
									defaultValue={campaign.expired_time}
								/>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button
							className="submit-button"
							type="primary"
							htmlType="submit"
							loading={submitting}
						>
							{submitting ? 'Update...' : 'Update'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
