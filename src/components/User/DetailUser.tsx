import { useParams } from 'react-router-dom';
import { Card, Form, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useDetailUser } from 'hooks/useDetailUser';
export const DetailUser = () => {
	const { id } = useParams();

	const { data, isLoading: detailUserLoading } = useDetailUser(+id!);

	if (detailUserLoading) {
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
					<span> Detail User</span>
				</div>
			</Card>
			<Card>
				<div className="container-detail">
					<Form
						initialValues={data}
						labelCol={{ span: 3 }}
						wrapperCol={{ span: 16 }}
					>
						<Form.Item label="Name" name="name">
							<Input style={{ width: '800px' }} disabled />
						</Form.Item>
						<Form.Item label="Email" name="email">
							<Input style={{ width: '800px' }} disabled />
						</Form.Item>
						<Form.Item label="Phone number" name="phone_number">
							<Input style={{ width: '800px' }} disabled />
						</Form.Item>
						<Form.Item label="Status" name="status">
							<Input style={{ width: '800px' }} disabled />
						</Form.Item>
					</Form>
				</div>
			</Card>
		</div>
	);
};
