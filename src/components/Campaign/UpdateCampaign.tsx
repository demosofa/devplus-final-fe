import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Spin } from 'antd';
import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';

import './UpdateCampaign.css';
import { useFindOneCampaign, useUpdateCampaign } from '@hooks';
import { CampaignType } from '@types';
import { clone } from '@utils';

export const UpdateCampaign = () => {
	const [form] = Form.useForm();

	const { id } = useParams();

	const { data, isLoading: loadCampaign } = useFindOneCampaign(+id!);

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

	const { mutateAsync: updateCampaignHandle, isLoading } = useUpdateCampaign();

	const handleUpdateCampaign = async (values: CampaignType) => {
		values.id = Number(id);

		await updateCampaignHandle(values);
		form.resetFields();
	};

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
		<div>
			<Card style={{ marginBottom: 15 }}>
				<div className="register_workspace">
					<span> Update Campaign</span>
				</div>
			</Card>
			<Card>
				<div>
					<Form
						style={{ marginRight: 65 }}
						initialValues={detailCampaign}
						form={form}
						onFinish={handleUpdateCampaign}
						labelCol={{ span: 3 }}
						wrapperCol={{ span: 16 }}
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
								loading={isLoading}
								className="updateCampaign1"
								type="primary"
								htmlType="submit"
							>
								<PlusCircleOutlined /> Update Campaign
							</Button>
						</Form.Item>
					</Form>
				</div>
			</Card>
		</div>
	);
};
