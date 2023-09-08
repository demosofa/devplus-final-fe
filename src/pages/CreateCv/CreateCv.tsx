import {
	Button,
	Card,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Typography,
	Upload,
} from 'antd';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { CampaignType, CreateCvType } from '@types';
import { useCreateCv, useGetFindCvWithCampaign } from '@hooks';
import { clone } from '@utils';
import './CreateCv.css';

const { Option } = Select;
const { Title, Paragraph } = Typography;

export const CreateCv = () => {
	const [uploadOption, setUploadOption] = useState('');

	const handleUploadOptionChange = (value: any) => {
		setUploadOption(value);
	};

	const { id } = useParams();

	const [form] = Form.useForm();

	const { mutate: CreateCv, isLoading } = useCreateCv();
	const { data, isLoading: detailCampaignLoading } = useGetFindCvWithCampaign(
		+id!
	);

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

	const onFinish = (values: CreateCvType) => {
		values.campaignId = id!;

		const formData = new FormData();

		const { file, fileString, ...formValues }: { [key: string]: any } = values;

		if (file) {
			const uploadFile = file.file as File;
			formData.append('file', uploadFile);
		} else if (fileString) {
			formData.append('file', fileString);
		}

		for (const name in formValues) {
			const value: string = formValues[name].toString();
			formData.append(name, value);
		}

		CreateCv(formData);
		form.resetFields();
	};

	if (detailCampaignLoading || !detailCampaign) {
		return (
			<div className="isLoading">
				<LoadingOutlined /> &nbsp; Loading...
			</div>
		);
	}

	return (
		<div className="cv-wrap-container">
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
									<Title className="create-cv-title">
										{detailCampaign?.name}
									</Title>
									<Paragraph>
										<div
											dangerouslySetInnerHTML={{
												__html: detailCampaign.description,
											}}
										></div>
									</Paragraph>
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

								<Form.Item
									label="File"
									name="uploadOption"
									rules={[
										{
											required: true,
											message: 'Please select upload option',
										},
									]}
								>
									<Select
										onChange={handleUploadOptionChange}
										placeholder="Select upload option"
									>
										<Option value="upload">Upload</Option>
										<Option value="input">Input</Option>
									</Select>
								</Form.Item>

								{uploadOption === 'upload' ? (
									<Form.Item
										name="file"
										rules={[
											{
												required: true,
												message: 'Please upload your file',
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
								) : null}

								{uploadOption === 'input' ? (
									<Form.Item
										name="fileString"
										rules={[
											{
												required: true,
												message: 'Please enter your file content',
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
								) : null}
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
