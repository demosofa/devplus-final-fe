import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export function Forbidden() {
	return (
		<Result
			status="403"
			title="403"
			subTitle="Sorry, you are not authorized to access this page."
			extra={
				<Button type="primary">
					<Link to="/profile">Back Home</Link>
				</Button>
			}
		/>
	);
}
