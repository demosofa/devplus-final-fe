import { LoadingOutlined, SoundFilled } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, notification } from 'antd';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import 'react-quill/dist/quill.snow.css';

import './UpdateCampaign.css';
import { useFindOneCampaign, useUpdateCampaign } from '@hooks';
import { CampaignType } from '@types';
import { clone } from '@utils';
import ReactQuill from 'react-quill';

export const UpdateCampaign = () => {
	const { id } = useParams();
	const { data, isLoading: campaignLoading } = useFindOneCampaign(+id!);
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	const [description, setDescription] = useState('');
	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	const detailCampaign = useMemo(() => {
		if (campaignLoading || !data) {
			return undefined;
		}

		const cloned = clone(data) as Omit<CampaignType, 'expired_time'> & {
			expired_time: Dayjs;
		};

		cloned.expired_time = dayjs(data.expired_time);

		return cloned;
	}, [data, campaignLoading]);

	const updateCampaignHandle = useUpdateCampaign();

	const handleUpdateCampaign = async (data: CampaignType) => {
		try {
			setSubmitting(true);

			data.id = +id!;
			await updateCampaignHandle.mutateAsync(data);

			notification.success({ message: 'Campaign update successfully' });

			form.resetFields();
		} catch (error) {
			notification.error({
				message: 'Email or Title campaign already exists. Please try again.',
			});
		} finally {
			setSubmitting(false);
		}
	};

	if (campaignLoading)
		return (
			<div>
				<LoadingOutlined /> &nbsp; Loading...
			</div>
		);

	return (
		<div>
			<div className="register_workspace">
				<SoundFilled />
				&nbsp;
				<span> Update Campaign</span>
			</div>
			<hr />
			<Form
				initialValues={detailCampaign}
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
					<Input placeholder="Input name" />
				</Form.Item>

				<Form.Item
					label="Description"
					name={'description'}
					rules={[{ required: true, message: 'Please input new description!' }]}
				>
					<ReactQuill
						value={description}
						onChange={handleDescriptionChange}
						style={{ width: '275px' }}
					/>
				</Form.Item>

				<Form.Item
					className="timestampInitial"
					label="Expired time"
					name={'expired_time'}
				>
					<DatePicker showTime />
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
