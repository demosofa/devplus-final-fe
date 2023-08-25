import { LoadingOutlined, SoundFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { DatePicker, Form, Input } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import { CampaignType } from '@types';
import { clone } from '@utils';
import { useFindOneCampaign } from '@hooks';
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
			<div className="register_workspace">
				<SoundFilled />
				&nbsp;
				<span> Detail Campaign</span>
			</div>
			<hr />
			<Form
				initialValues={detailCampaign}
				labelCol={{ span: 10 }}
				wrapperCol={{ span: 20 }}
			>
				<Form.Item label="Name" name="name">
					<Input placeholder="Input name" />
				</Form.Item>

				<Form.Item label="Description" name="description">
					<ReactQuill
						value={description}
						onChange={handleDescriptionChange}
						style={{ width: '275px' }}
					/>
				</Form.Item>

				<Form.Item
					className="timestampInitial"
					label="Expired time"
					name="expired_time"
				>
					<DatePicker showTime />
				</Form.Item>
			</Form>
		</div>
	);
};
