import { PlusCircleOutlined, SoundFilled } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'react-quill/dist/quill.snow.css';

import './UpdateCampaign.css';
import { useFindOneCampaign, useUpdateCampaign } from '@hooks';
import { CampaignType } from '@types';
import { clone } from '@utils';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateCampaign = () => {
	const [form] = Form.useForm();

	const { id } = useParams();

	const { data, isLoading: loadCampaign } = useFindOneCampaign(+id!);

	const [registrationSuccess, setRegistrationSuccess] = useState(false);

	const [description, setDescription] = useState('');
	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	const detailCampaign = useMemo(() => {
		if (data) {
			const cloned = clone(data) as Omit<CampaignType, 'expired_time'> & {
				expired_time: Dayjs;
			};

			cloned.expired_time = dayjs(data.expired_time);

			return cloned;
		}
		return;
	}, [data]);

	const { mutateAsync: updateCampaignHandle } = useUpdateCampaign();

	const handleUpdateCampaign = async (values: CampaignType) => {
		values.id = Number(id);

		try {
			await updateCampaignHandle(values);
			setRegistrationSuccess(true);
			form.resetFields();
		} catch (error) {
			console.error('Registration failed:', error);
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (registrationSuccess) {
			setTimeout(() => {
				navigate('/campaign');
			}, 10);
		}
	}, [navigate, registrationSuccess]);

	if (loadCampaign) {
		return (
			<div>
				<Spin tip="Loading" size="large">
					<div className="content" />
				</Spin>
			</div>
		);
	}
	return (
		<>
			<div className="register_workspace">
				<SoundFilled />
				&nbsp;
				<span> Update Campaign</span>
			</div>
			<hr />
			<div>
				<Form
					style={{ marginRight: 65 }}
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
							style={{ height: 150 }}
						/>
					</Form.Item>

					<Form.Item
						style={{ marginTop: 70 }}
						className="timestampInitial"
						label="Expired time"
						name={'expired_time'}
					>
						<DatePicker showTime />
					</Form.Item>
					<Form.Item label=" " colon={false}>
						<Button
							className="updateCampaign1"
							type="primary"
							htmlType="submit"
						>
							<PlusCircleOutlined /> Update Campaign
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};
