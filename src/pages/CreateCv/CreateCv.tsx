import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Typography,
	Upload,
} from 'antd';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { CampaignType, CreateCvType } from '@types';
import { useCreateCv, useFindOneCampaign } from '@hooks';
import { clone } from '@utils';
import './CreateCv.css';

const CreateCv = () => {
	const { Title, Paragraph } = Typography;

	const { id } = useParams();

	const [form] = Form.useForm();

	const { mutate: CreateCv, isLoading } = useCreateCv();
	const { data, isLoading: detailCampaignLoading } = useFindOneCampaign(+id!);

	const detailCampaign = useMemo(() => {
		if (detailCampaignLoading || !data) {
			return undefined;
		}

		const cloned = clone(data) as Omit<CampaignType, 'expired_time'> & {
			expired_time: Dayjs;
		};

		cloned.expired_time = dayjs(data.expired_time);

		return cloned;
	}, [data, detailCampaignLoading]);

	if (detailCampaignLoading) {
		return (
			<div className="isLoading">
				<LoadingOutlined /> &nbsp; Loading...
			</div>
		);
	}

	const onFinish = (values: CreateCvType) => {
		values.campaignId = id!;

		const { file, ...formValues }: { [key: string]: any } = values;
		const uploadFile = file.file as File;

		const formData = new FormData();
		formData.append('file', uploadFile);
		for (const name in formValues) {
			const value: string = formValues[name].toString();
			formData.append(name, value);
		}

		CreateCv(formData);
		form.resetFields();
	};

	return (
		<div>
			<Row gutter={[12, 12]}>
				<Col span={24} md={16} style={{ height: '100%' }}>
					<div className="container-detail">
						<Form
							initialValues={detailCampaign}
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
						>
							<div className="form-row">
								<Typography>
									<Title>{detailCampaign?.name}</Title>
									<Paragraph>{detailCampaign?.description}</Paragraph>
								</Typography>
							</div>

							<div className="form-row">
								<Form.Item
									style={{ marginTop: 70 }}
									className="timestampInitial"
									label="Expired time"
									name="expired_time"
								>
									<DatePicker showTime disabled />
								</Form.Item>
							</div>
						</Form>
					</div>
				</Col>

				<Col span={24} md={7}>
					<Card>
						<div className="register_workspace">
							<span> Apply CV</span>
						</div>
						<div className="main-container">
							<Form
								form={form}
								onFinish={onFinish}
								name="complex-form"
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
								className="full-form"
							>
								<div className="form-row">
									<Form.Item
										name="name"
										label="Name"
										rules={[
											{
												required: true,
												message: 'Please enter your name',
											},
										]}
									>
										<Input
											type="input"
											style={{
												maxWidth: '800px',
											}}
											placeholder="Input your name"
										/>
									</Form.Item>
								</div>
								<div className="form-row">
									<Form.Item
										name="email"
										label="Email"
										rules={[
											{
												required: true,
												message: 'Please enter your email',
											},
										]}
									>
										<Input
											type="input"
											style={{
												maxWidth: '800px',
											}}
											placeholder="Input your email"
										/>
									</Form.Item>
								</div>
								<div className="form-row">
									<Form.Item
										name="phone_number"
										label="Phone Number"
										rules={[
											{
												required: true,
												message: 'Please enter your phone',
											},
										]}
									>
										<Input
											type="input"
											style={{
												maxWidth: '800px',
											}}
											placeholder="Input your phone number"
										/>
									</Form.Item>
								</div>
								<div className="form-row">
									<Form.Item
										name="apply_position"
										label="Position"
										rules={[
											{
												required: true,
												message: 'Please enter your position',
											},
										]}
									>
										<Input
											type="input"
											style={{
												maxWidth: '800px',
											}}
											placeholder="Input your apply position"
										/>
									</Form.Item>
								</div>
								<div className="form-row">
									<Form.Item
										name="file"
										rules={[
											{
												required: true,
												message: 'Please enter your file',
											},
										]}
									>
										<Upload
											accept="application/pdf"
											maxCount={1}
											beforeUpload={() => false}
										>
											<Button icon={<PlusCircleOutlined />} type="default">
												Upload File
											</Button>
										</Upload>
									</Form.Item>
								</div>
								<Row className="row-btn-summit">
									<Button type="primary" htmlType="submit" loading={isLoading}>
										<PlusCircleOutlined /> Apply Cv
									</Button>
								</Row>
								<Form.Item colon={false} className="full-btn"></Form.Item>
							</Form>
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default CreateCv;
