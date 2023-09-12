import { useParams } from 'react-router-dom';
import { Card, Col, Form, Input, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useAuth, useDetailUser } from '@hooks';
export const DetailUser = () => {
	const { id } = useParams();

	const { getAuth } = useAuth();
	const auth = getAuth()!;

	const { data, isLoading: detailUserLoading } = useDetailUser(
		Number(id) || auth.id
	);

	if (detailUserLoading) {
		return (
			<div className="isLoading">
				<LoadingOutlined /> &nbsp; Loading...
			</div>
		);
	}
	return (
		<Card>
			<Row>
				<Col span={24} sm={23} md={16} lg={12}>
					<Form
						initialValues={data}
						labelCol={{ span: 8, xl: 6 }}
						labelAlign="left"
						wrapperCol={{ span: 16, xl: 18 }}
					>
						<Form.Item className="fontWeight" label="Name" name="name">
							<Input readOnly={true} />
						</Form.Item>
						<Form.Item className="fontWeight" label="Email" name="email">
							<Input readOnly={true} />
						</Form.Item>
						<Form.Item
							className="fontWeight"
							label="Phone number"
							name="phone_number"
						>
							<Input readOnly={true} />
						</Form.Item>
						<Form.Item className="fontWeight" label="Status" name="status">
							<Input readOnly={true} />
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</Card>
	);
};
