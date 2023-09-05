import { useParams } from 'react-router-dom';
import { Card, Col, Form, Input, Row } from 'antd';
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
					<span> Detail</span>
				</div>
			</Card>
			<Card>
				<div className="container-detail">
					<Form
						initialValues={data}
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 20 }}
					>
						<Row>
							<Col span={24} md={16}>
								<Form.Item label="Name" name="name">
									<Input readOnly={true} />
								</Form.Item>
							</Col>
							<Col span={24} md={16}>
								<Form.Item label="Email" name="email">
									<Input readOnly={true} />
								</Form.Item>
							</Col>
							<Col span={24} md={16}>
								<Form.Item label="Phone number" name="phone_number">
									<Input readOnly={true} />
								</Form.Item>
							</Col>
							<Col span={24} md={16}>
								<Form.Item label="Status" name="status">
									<Input readOnly={true} />
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
			</Card>
		</div>
	);
};
