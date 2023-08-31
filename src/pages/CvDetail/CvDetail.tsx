import { Link, useParams } from 'react-router-dom';
import { Card, Col, Form, Input, Row, Select, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { CvType } from '@types';
import { clone } from '@utils';
import './CvDetail.css';
import { useGetDetailCv } from 'hooks/useGetDetailCv';

export const CvDetail = () => {
	const { id } = useParams();

	const { data, isLoading: detailCampaignLoading } = useGetDetailCv(+id!);

	const { Option } = Select;

	const [displayType, setDisplayType] = useState('link');

	const detailCampaign = useMemo(() => {
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
		<Card>
			<Row>
				<Col span={24}>
					<div className="main-container">
						<Form
							initialValues={detailCampaign}
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

							<Form.Item label="Status ">
								<Form.Item name="status">
									<Input readOnly />
								</Form.Item>
							</Form.Item>

							<Form.Item label="File">
								<Form.Item name="file">
									<Select value={displayType} onChange={setDisplayType}>
										<Option value="link">Link</Option>
										<Option value="image">Image</Option>
									</Select>
								</Form.Item>
								<Form.Item noStyle>
									{displayType === 'link' ? (
										detailCampaign?.file.startsWith(
											'https://drive.google.com/'
										) ? (
											<Link
												to={detailCampaign?.file}
												target="_blank"
												rel="noopener noreferrer"
											>
												{detailCampaign?.file}
											</Link>
										) : (
											<Link
												to={`http://localhost:3000/${detailCampaign?.file}`}
												target="_blank"
											>
												{detailCampaign?.file}
											</Link>
										)
									) : detailCampaign?.file.startsWith(
											'https://drive.google.com/'
									  ) ? (
										<Link
											to={detailCampaign?.file}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src={detailCampaign?.file}
												alt="Image"
												style={{ width: '300px', height: '300px' }}
											/>
										</Link>
									) : (
										<img
											src={`http://localhost:3000/${detailCampaign?.file}`}
											alt="Image"
											style={{ width: '300px', height: '300px' }}
										/>
									)}
								</Form.Item>
							</Form.Item>
						</Form>
					</div>
				</Col>
			</Row>
		</Card>
	);
};
