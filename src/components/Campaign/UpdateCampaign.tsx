import { SoundFilled } from '@ant-design/icons';
import { Button, DatePicker, Form, Input } from 'antd';
import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'react-quill/dist/quill.snow.css';

import './UpdateCampaign.css';
import { useUpdateCampaign } from '@hooks';
import { CampaignType } from '@types';
import { clone } from '@utils';
import ReactQuill from 'react-quill';

export const UpdateCampaign = ({ data }: { data: CampaignType }) => {
	// const { id } = useParams();
	// const { data, isLoading: campaignLoading } = useFindOneCampaign(+id!);
	const [form] = Form.useForm();
	const [submitting, setSubmitting] = useState(false);

	const [description, setDescription] = useState('');
	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	const detailCampaign = useMemo(() => {
		const cloned = clone(data) as Omit<CampaignType, 'expired_time'> & {
			expired_time: Dayjs;
		};

		cloned.expired_time = dayjs(data.expired_time);

		return cloned;
	}, [data]);

	const updateCampaignHandle = useUpdateCampaign();

	const handleUpdateCampaign = async (values: CampaignType) => {
		setSubmitting(true);

		values.id = data.id;
		await updateCampaignHandle.mutateAsync(values);

		form.resetFields();

		setSubmitting(false);
	};

	return (
		<div>
			<div className="register_workspace">
				<SoundFilled />
				&nbsp;
				<span> Update Campaign</span>
			</div>
			<hr />
			<div>
				<Form
					style={{ marginRight: 175 }}
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
						rules={[
							{ required: true, message: 'Please input new description!' },
						]}
					>
						<ReactQuill
							value={description}
							onChange={handleDescriptionChange}
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
						<Button
							style={{ marginLeft: 80 }}
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
