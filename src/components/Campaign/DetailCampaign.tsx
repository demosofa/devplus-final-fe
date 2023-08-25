import { SoundFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

import './DetailCampaign.css';
import { useFindOneCampaign } from '@hooks';
import { DatePicker, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';

export const DetailCampaign = () => {
	const { id } = useParams();
	const { data: detailCampaign, isLoading: detailCampaignLoading } =
		useFindOneCampaign(+id!);
	if (detailCampaignLoading) {
		return null;
	}
	return (
		<div>
			<div className="register_workspace">
				<SoundFilled />
				&nbsp;
				<span> Update Campaign</span>
			</div>
			<hr />
			<Form labelCol={{ span: 10 }} wrapperCol={{ span: 20 }}>
				<Form.Item label="Name" name={'name'}>
					<Input
						disabled
						placeholder="Input name"
						defaultValue={detailCampaign.name}
					/>
				</Form.Item>

				<Form.Item label="Description" name={'description'}>
					<TextArea
						disabled
						placeholder="Input description"
						defaultValue={detailCampaign.description}
					/>
				</Form.Item>

				<Form.Item
					className="timestampInitial"
					label="Expired time"
					name={'expired_time'}
				>
					<DatePicker
						disabled
						defaultValue={dayjs(detailCampaign.expired_time)}
						showTime
					/>
				</Form.Item>
			</Form>
		</div>
	);
};
