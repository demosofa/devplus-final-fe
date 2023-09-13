import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';

import {
	useGetCampaignStatistic,
	useGetCvStatistic,
	useGetUserStatistic,
} from '@hooks';
import './TotalStatistic.css';

const { Title } = Typography;

export const TotalStatistics = () => {
	const { data: campaign } = useGetCampaignStatistic();

	const { data: cv } = useGetCvStatistic();

	const { data: user } = useGetUserStatistic();

	const campaignCurrentYearCount = campaign?.currentYearCount;
	const campaignOldYearCount = campaign?.oldYearCount;
	const totalCampaignCount = campaign?.totalCampaignCount;

	const percentageIncrease =
		campaignOldYearCount !== 0
			? ((campaignCurrentYearCount - campaignOldYearCount) /
					campaignOldYearCount) *
			  100
			: 0;

	const isIncreased = percentageIncrease >= 0;

	const cvCurrentYearCount = cv?.currentYearCount;
	const cvOldYearCount = cv?.oldYearCount;
	const totalCvCount = cv?.totalCvCount;

	const percentageIncreaseCv =
		cvOldYearCount !== 0
			? ((cvCurrentYearCount - cvOldYearCount) / cvOldYearCount) * 100
			: 100;

	const isIncreasedCv = percentageIncreaseCv > 0;

	const userCurrentYearCount = user?.currentYearCount;
	const userOldYearCount = user?.oldYearCount;
	const totalUserCount = user?.totalUserCount;

	const percentageIncreaseUser =
		userOldYearCount !== 0
			? ((userCurrentYearCount - userOldYearCount) / userOldYearCount) * 100
			: 100;

	const isIncreasedUser = percentageIncreaseUser >= 0;

	return (
		<section style={{ overflowX: 'hidden' }}>
			<Row gutter={[12, 12]}>
				<Col span={24} md={8} className="total-dashboard-col">
					<Card className="total-card-dashboard">
						<Title level={4}>Total Campaign</Title>

						<Row>
							<div>
								{isIncreased ? (
									<ArrowUpOutlined style={{ color: 'green', marginRight: 8 }} />
								) : (
									<ArrowDownOutlined style={{ color: 'red', marginRight: 8 }} />
								)}
							</div>
							<p className="text-dashboard-p">{percentageIncrease || 0}%</p>
						</Row>

						<h1 className="text-card-dashboard">{totalCampaignCount || 0}</h1>
					</Card>
				</Col>
				<Col span={24} md={8} className="total-dashboard-col">
					<Card className="total-card-dashboard">
						<Title level={4}>Total Cv</Title>

						<Row>
							<div>
								{isIncreasedCv ? (
									<ArrowUpOutlined style={{ color: 'green', marginRight: 8 }} />
								) : (
									<ArrowDownOutlined style={{ color: 'red', marginRight: 8 }} />
								)}
							</div>
							<p className="text-dashboard-p">{percentageIncreaseCv || 0}%</p>
						</Row>

						<h1 className="text-card-dashboard">{totalCvCount || 0}</h1>
					</Card>
				</Col>
				<Col span={24} md={8} className="total-dashboard-col">
					<Card className="total-card-dashboard">
						<Title level={4}>Total User</Title>

						<Row>
							<div>
								{isIncreasedUser ? (
									<ArrowUpOutlined style={{ color: 'green', marginRight: 8 }} />
								) : (
									<ArrowDownOutlined style={{ color: 'red', marginRight: 8 }} />
								)}
							</div>
							<p className="text-dashboard-p">{percentageIncreaseUser || 0}%</p>
						</Row>

						<h1 className="text-card-dashboard">{totalUserCount || 0}</h1>
					</Card>
				</Col>
			</Row>
		</section>
	);
};
