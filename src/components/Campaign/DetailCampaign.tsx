import { LoadingOutlined } from '@ant-design/icons';
import { Card, DatePicker, Form, Input } from 'antd';
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
		<div>
			<Card style={{ marginBottom: 15 }}>
				<div className="register_workspace">
					<span> Detail Campaign</span>
				</div>
			</Card>
			<Card>
				<div className="container-detail">
					<Form
						initialValues={detailCampaign}
						labelCol={{ span: 24 }}
						wrapperCol={{ span: 24 }}
					>
						<div className="form-row">
							<Form.Item label="Name" name="name">
								<Input
									placeholder="Input name"
									style={{ maxWidth: '800px' }}
									readOnly={true}
								/>
							</Form.Item>
						</div>
						<div className="form-row">
							<Form.Item label="Description" name="description">
								<ReactQuill
									value={description}
									onChange={handleDescriptionChange}
									style={{ maxWidth: '800px', height: 150 }}
									readOnly={true}
								/>
							</Form.Item>
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
			</Card>
		</div>
	);
};
