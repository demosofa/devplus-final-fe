import { LoadingOutlined } from '@ant-design/icons';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

import { useFindOneCampaign } from '@hooks';
import { CampaignType } from '@types';
import { clone } from '@utils';
import './DetailCampaign.css';

export const DetailCampaign = () => {
	const [description, setDescription] = useState('');
	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};
	const { id } = useParams();

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

	return (
		<Row>
			<Col span={24} sm={23} md={16}>
				<Form
					initialValues={detailCampaign}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					className="full-form"
					disabled
				>
					<Form.Item className="fontWeight" label="Name" name="name">
						<Input readOnly={true} />
					</Form.Item>

					<Form.Item
						className="timestampInitial fontWeight"
						label="Expired time"
						name="expired_time"
					>
						<DatePicker showTime style={{ display: 'block' }} />
					</Form.Item>

					<Form.Item
						className="fontWeight"
						label="Description"
						name="description"
					>
						<ReactQuill
							theme="bubble"
							value={description}
							onChange={handleDescriptionChange}
							readOnly={true}
							className="quill-editor"
						/>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};
