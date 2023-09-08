import { useParams } from 'react-router-dom';
import { Card, Col, Form, Input, Row, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

import { CvType } from '@types';
import { clone } from '@utils';
import './CvDetail.css';
import { useGetDetailCv } from '@hooks';
import { BASE_URL } from '@constants';

const { Title } = Typography;

export const CvDetail = () => {
	const { id } = useParams();

	const [forms] = Form.useForm();

	const { data, isLoading: detailCvLoading } = useGetDetailCv(+id!);

	useEffect(() => {
		if (data && !detailCvLoading) {
			forms.resetFields();
		}
	}, [data, detailCvLoading, forms]);

	const detailCv = useMemo(() => {
		if (detailCvLoading || !data) {
			return undefined;
		}

		const cloned = clone(data) as Omit<CvType, 'create_at'> & {
			create_at: Dayjs;
		};
		cloned.create_at = dayjs(data.create_at);

		if (cloned.file.includes('https://drive.google.com/')) {
			cloned.file = cloned.file.replace('view', 'preview');
		} else {
			cloned.file = BASE_URL + cloned.file;
		}

		return cloned;
	}, [data, detailCvLoading]);

	return (
		<Row className="Cv-container">
			<Col span={24} md={12}>
				<Card loading={detailCvLoading} style={{ height: '100%' }}>
					<Typography>
						<Title className="title-cv-detail">Cv Information</Title>
					</Typography>
					<Form
						form={forms}
						initialValues={detailCv}
						name="complex-form"
						labelCol={{
							span: 6,
						}}
						wrapperCol={{
							span: 18,
						}}
						className="full-form"
					>
						<Form.Item label="Name" name="name">
							<Input readOnly />
						</Form.Item>

						<Form.Item label="Email " name="email">
							<Input readOnly />
						</Form.Item>

						<Form.Item label="Phone Number" name="phone_number">
							<Input readOnly />
						</Form.Item>

						<Form.Item label="Apply Position" name="apply_position">
							<Input readOnly />
						</Form.Item>

						<Form.Item label="Create At" name="create_at">
							<Input readOnly />
						</Form.Item>

						<Form.Item label="Status " name="status">
							<Input readOnly />
						</Form.Item>
					</Form>
				</Card>
			</Col>
			<Col span={24} md={12}>
				<Card loading={detailCvLoading}>
					<Typography>
						<Title className="title-cv-detail">Cv File</Title>
					</Typography>
					<iframe
						key={detailCv?.file}
						src={detailCv?.file}
						className="iframe-cv-detail"
					></iframe>
				</Card>
			</Col>
		</Row>
	);
};
