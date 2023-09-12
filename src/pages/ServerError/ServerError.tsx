import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export function ServerError() {
	return (
		<Result
			status="500"
			title="500"
			subTitle="Sorry, something went wrong."
			extra={
				<Button type="primary">
					<Link to="/profile">Back Home</Link>
				</Button>
			}
		/>
	);
}
