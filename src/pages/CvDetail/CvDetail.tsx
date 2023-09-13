import { useParams } from 'react-router-dom';
import { Card, Col, Form, Input, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

import { CvType } from '@types';
import { clone } from '@utils';
import './CvDetail.css';
import { useGetDetailCv } from '@hooks';
import { BASE_URL } from '@constants';

const { Title } = Typography;

const { useForm } = Form;

export const CvDetail = () => {
	const { id } = useParams();

	const [forms] = useForm();

	const { data, isLoading: detailCvLoading } = useGetDetailCv(+id!);

	useEffect(() => {
		if (data && !detailCvLoading) {
			forms.resetFields();
		}
	}, [data, detailCvLoading, forms]);

	const isValidUrl = (urlString: string) => {
		try {
			const url = new URL(urlString);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} catch (e) {
			return false;
		}
	};

	const detailCv = useMemo(() => {
		if (detailCvLoading || !data) {
			return undefined;
		}

		const cloned = clone(data) as Omit<CvType, 'created_at'> & {
			created_at: string;
		};
		cloned.created_at = dayjs(data.created_at).format('YYYY-MM-DD, HH:mm:ss');

		if (cloned.file.includes('https://drive.google.com/')) {
			cloned.file = cloned.file.replace('view', 'preview');
		} else if (!isValidUrl(cloned.file)) {
			cloned.file = BASE_URL + cloned.file;
		}

		return cloned;
	}, [data, detailCvLoading]);

	return (
		<section style={{ overflowX: 'hidden' }}>
			<Row gutter={[12, 12]} className="cv-container">
				<Col span={24} xl={12}>
					<Card loading={detailCvLoading} style={{ height: '100%' }}>
						<Typography>
							<Title level={3} className="title-cv-detail">
								Cv Information
							</Title>
						</Typography>

						<Form
							form={forms}
							initialValues={detailCv}
							name="complex-form"
							labelCol={{
								span: 6,
							}}
							labelAlign="left"
							wrapperCol={{
								span: 18,
							}}
							className="full-form"
						>
							<Form.Item className="fontWeight" label="Name" name="name">
								<Input readOnly />
							</Form.Item>

							<Form.Item className="fontWeight" label="Email " name="email">
								<Input readOnly />
							</Form.Item>

							<Form.Item
								className="fontWeight"
								label="Phone Number"
								name="phone_number"
							>
								<Input readOnly />
							</Form.Item>

							<Form.Item
								className="fontWeight"
								label="Apply Position"
								name="apply_position"
							>
								<Input readOnly />
							</Form.Item>

							<Form.Item
								className="fontWeight"
								label="Create At"
								name="created_at"
							>
								<Input readOnly />
							</Form.Item>

							<Form.Item className="fontWeight" label="Status " name="status">
								<Input readOnly />
							</Form.Item>
						</Form>
					</Card>
				</Col>

				<Col span={24} xl={12}>
					<Card loading={detailCvLoading}>
						<Typography>
							<Title level={3} className="title-cv-detail">
								Cv File
							</Title>
						</Typography>

						<iframe
							key={detailCv?.file}
							src={detailCv?.file}
							className="iframe-cv-detail"
						></iframe>
					</Card>
				</Col>
			</Row>
		</section>
	);
};
