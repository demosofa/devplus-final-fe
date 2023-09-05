import { Link, useParams } from 'react-router-dom';
import { Card, Col, Form, Input, Row, Select, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { CvType } from '@types';
import { clone } from '@utils';
import './CvDetail.css';
import { useGetDetailCv } from 'hooks/useGetDetailCv';
import { BASE_URL } from '@constants';

export const CvDetail = () => {
	const { id } = useParams();

	const { data, isLoading: detailCampaignLoading } = useGetDetailCv(+id!);

	const { Option } = Select;

	const [displayType, setDisplayType] = useState('link');

	const detailCv = useMemo(() => {
		if (detailCampaignLoading || !data) {
			return undefined;
		}

		const cloned = clone(data) as Omit<CvType, 'expired_time'> & {
			expired_time: Dayjs;
		};

		cloned.expired_time = dayjs(data.expired_time);

		return cloned;
	}, [data, detailCampaignLoading]);

	if (detailCampaignLoading) {
		return (
			<div className="isLoading">
				<Spin />
			</div>
		);
	}

	return (
		<Card className="card-wrap-container">
			<Row>
				<Col span={24}>
					<div className="main-container">
						<Form
							initialValues={detailCv}
							name="complex-form"
							labelCol={{
								span: 3,
							}}
							wrapperCol={{
								span: 16,
							}}
							className="full-form"
						>
							<Form.Item label="Name">
								<Form.Item name="name">
									<Input readOnly />
								</Form.Item>
							</Form.Item>
							<Form.Item label="Email ">
								<Form.Item name="email">
									<Input readOnly />
								</Form.Item>
							</Form.Item>
							<Form.Item label="Phone Number">
								<Form.Item name="phone_number">
									<Input readOnly />
								</Form.Item>
							</Form.Item>
							<Form.Item label="Apply Position">
								<Form.Item name="apply_position">
									<Input readOnly />
								</Form.Item>
							</Form.Item>
							<Form.Item label="Create At">
								<Form.Item name="create_at">
									<Input readOnly />
								</Form.Item>
							</Form.Item>
							<Form.Item label="File" className="scrollable-card__form-item">
								<Form.Item name="file">
									<Select value={displayType} onChange={setDisplayType}>
										<Option value="link">Link</Option>
										<Option value="image">Image</Option>
									</Select>
								</Form.Item>
								<Form.Item noStyle>
									{displayType === 'link' ? (
										detailCv?.file.startsWith('https://drive.google.com/') ? (
											<Link
												to={detailCv?.file}
												target="_blank"
												rel="noopener noreferrer"
											>
												{detailCv?.file}
											</Link>
										) : (
											<Link to={`${BASE_URL}${detailCv?.file}`} target="_blank">
												{detailCv?.file}
											</Link>
										)
									) : detailCv?.file.startsWith('https://drive.google.com/') ? (
										<object
											data={`${BASE_URL}${detailCv?.file}`}
											type="application/pdf"
											width="100%"
											height="500px"
										>
											<p>
												Unable to display PDF file.{' '}
												<Link
													to={`${BASE_URL}${detailCv?.file}`}
													target="_blank"
												>
													Download
												</Link>
												instead.
											</p>
										</object>
									) : (
										<object
											data={`${BASE_URL}${detailCv?.file}`}
											type="application/pdf"
											width="100%"
											height="500px"
										>
											<p>
												Unable to display PDF file.{' '}
												<Link
													to={`${BASE_URL}${detailCv?.file}`}
													target="_blank"
												>
													Download
												</Link>
												instead.
											</p>
										</object>
									)}
								</Form.Item>
							</Form.Item>
							<Form.Item label="Status ">
								<Form.Item name="status">
									<Input readOnly />
								</Form.Item>
							</Form.Item>
						</Form>
					</div>
				</Col>
			</Row>
		</Card>
	);
};