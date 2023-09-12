import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Row, Spin } from 'antd';
import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';

import './UpdateCampaign.css';
import { useFindOneCampaign, useUpdateCampaign } from '@hooks';
import { CampaignType } from '@types';
import { clone } from '@utils';

const { useForm } = Form;

export const UpdateCampaign = () => {
	const [form] = useForm();

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
		<Card>
			<Row>
				<Col span={24} sm={23} md={16} lg={12}>
					<Form
						initialValues={detailCampaign}
						form={form}
						onFinish={handleUpdateCampaign}
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
							name={'description'}
							rules={[
								{ required: true, message: 'Please input new description!' },
							]}
						>
							<ReactQuill
								className="quill-editor override"
								value={description}
								onChange={handleDescriptionChange}
							/>
						</Form.Item>

						<Form.Item
							className="timestampInitial fontWeight"
							label="Expired time"
							name={'expired_time'}
						>
							<DatePicker showTime />
						</Form.Item>

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
				</Col>
			</Row>
		</Card>
	);
};
