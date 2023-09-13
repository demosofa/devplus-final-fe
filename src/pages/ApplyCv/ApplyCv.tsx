import {
	Button,
	Card,
	Col,
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
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { CampaignType, CreateCvType } from '@types';
import { useCreateCv, useGetFindCvWithCampaign } from '@hooks';
import { clone } from '@utils';
import './ApplyCv.css';
import { CampaignCountdown, Container } from '@components';
import { QUERY_KEY } from '@constants';
import { CAMPAIGN } from '@enums';

const { Option } = Select;
const { Title } = Typography;

const { useForm } = Form;

dayjs.extend(customParseFormat);

export const ApplyCv = () => {
	const [uploadOption, setUploadOption] = useState('');

	const handleUploadOptionChange = (value: any) => {
		setUploadOption(value);
	};

	const { id } = useParams();

	const [form] = useForm();

	const { mutate: createCv, isLoading } = useCreateCv();
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

		createCv(formData);
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
		<div className="apply-cv-background">
			<Container>
				<section style={{ overflowX: 'hidden' }}>
					<Row justify={'center'}>
						<CampaignCountdown
							queryKey={[QUERY_KEY.FIND_CV_WITH_CAMPAIGN, Number(id)]}
							campaign={{
								status: detailCampaign.status,
								expired_time: data!.expired_time,
							}}
							className="apply-cv-expire-time"
						/>
					</Row>
					<Row gutter={[12, 12]}>
						<Col span={24} md={15}>
							<Card style={{ height: '100%' }}>
								<Title level={3} className="create-cv-title">
									{detailCampaign.name}
								</Title>

								<div
									dangerouslySetInnerHTML={{
										__html: detailCampaign.description,
									}}
								/>
							</Card>
						</Col>

						<Col
							span={24}
							md={9}
							className="apply-cv-form"
							style={{ height: 'fit-content' }}
						>
							<Card>
								<Title level={3} className="create-cv-title">
									Apply CV
								</Title>

								<Form
									form={form}
									onFinish={onFinish}
									labelCol={{ span: 24 }}
									wrapperCol={{ span: 24 }}
									disabled={detailCampaign.status === CAMPAIGN.INACTIVE}
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
										<Input type="input" placeholder="Input your name" />
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
										<Input type="input" placeholder="Input your email" />
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
										<Input type="input" placeholder="Input your phone number" />
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
												placeholder="Input your apply position"
											/>
										</Form.Item>
									) : null}

									<Form.Item colon={false} className="row-btn-summit">
										<Button
											type="primary"
											htmlType="submit"
											loading={isLoading}
										>
											<PlusCircleOutlined /> Apply Cv
										</Button>
									</Form.Item>
								</Form>
							</Card>
						</Col>
					</Row>
				</section>
			</Container>
		</div>
	);
};
