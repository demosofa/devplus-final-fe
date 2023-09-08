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
				<div className="container-detail">
					<Form
						initialValues={detailCampaign}
						form={form}
						onFinish={handleUpdateCampaign}
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
								<Input style={{ maxWidth: '800px' }} placeholder="Input name" />
							</Form.Item>
						</div>

						<div className="form-row">
							<Form.Item
								className="fontWeight"
								label="Description"
								name={'description'}
								rules={[
									{ required: true, message: 'Please input new description!' },
								]}
							>
								<ReactQuill
									value={description}
									onChange={handleDescriptionChange}
									style={{ maxWidth: 800, height: 150 }}
									className="quill-editor"
								/>
							</Form.Item>
						</div>

						<div className="form-row">
							<Form.Item
								style={{ marginTop: 70 }}
								className="timestampInitial fontWeight"
								label="Expired time"
								name={'expired_time'}
							>
								<DatePicker showTime />
							</Form.Item>
						</div>
						<Form.Item colon={false}>
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
