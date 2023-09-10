import { useParams } from 'react-router-dom';
import { Col, Form, Input, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useDetailUser } from '@hooks';
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
		<Row>
			<Col span={24} sm={23} md={16}>
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
	);
};
