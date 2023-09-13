import { Col, Row, Select, Card } from 'antd';
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js/auto';
import { Line, Pie } from 'react-chartjs-2';
import { useChartCampaign, useChartUser } from '@hooks';
import { useMemo, useState } from 'react';
import { FILTER_TIME } from '@enums';
import { TotalStatistics } from 'pages/CampaignStatistics/TotalStatistics';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const DashboardSuperAdmin = () => {
	const [select, setSelect] = useState<FILTER_TIME>(FILTER_TIME.YEAR);

	const { data: CampaignData, isLoading: loadChartCampaign } =
		useChartCampaign(select);

	const { data: UserData, isLoading: loadChartUser } = useChartUser(select);

	const lineOptions = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Campaign Chart',
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
				},
			},
		},
	};

	const pieOptions = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'User Chart',
			},
		},
	};

	const uniqueDates = useMemo(() => {
		if (!CampaignData) return [];

		const dates = CampaignData.map((item) => item.date);
		const result = Array.from(new Set(dates));

		return result.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
	}, [CampaignData]);

	const dateToIndexMap: Record<string, number> = {};
	uniqueDates.forEach((date, index) => {
		dateToIndexMap[date] = index;
	});

	const workspaceIds = Array.from(
		new Set(CampaignData?.map((item) => item.workspace_id))
	);

	const lineDatasets: any[] = [];

	workspaceIds.forEach((campaignId) => {
		const dataForCampaign = new Array(uniqueDates.length).fill(0);

		CampaignData?.filter((item) => item.workspace_id === campaignId).forEach(
			(item) => {
				const index = dateToIndexMap[item.date];

				dataForCampaign[index] += parseInt(item.campaign_counts);
			}
		);

		const workspaceName = CampaignData?.find(
			(item) => item.workspace_id == campaignId
		)?.workspace_title;

		lineDatasets.push({
			label: workspaceName,
			data: dataForCampaign,
			borderColor: `rgb(${Math.random() * 255},${Math.random() * 255},${
				Math.random() * 255
			})`,
			backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${
				Math.random() * 255
			},0.5)`,
		});
	});

	const lineData = {
		labels: uniqueDates,
		datasets: lineDatasets,
	};

	const workspaceNames = Array.from(
		new Set(UserData?.map((item) => item.workspace_title))
	);

	const pieDatasets = workspaceNames.map((name) => {
		return UserData?.filter((item) => item.workspace_title === name).reduce(
			(prev, curr) => (prev += parseInt(curr.user_counts)),
			0
		);
	});

	const pieData = {
		labels: workspaceNames,
		datasets: [
			{
				label: 'User count',
				data: pieDatasets,
				backgroundColor: Array.from(
					{ length: workspaceIds.length },
					() =>
						`rgba(${Math.random() * 255},${Math.random() * 255},${
							Math.random() * 255
						},0.5)`
				),
			},
		],
	};

	const handleChange = (value: FILTER_TIME) => {
		setSelect(value);
	};

	return (
		<>
			<TotalStatistics />
			<Row justify={'end'}>
				<Select
					defaultValue={FILTER_TIME.YEAR}
					style={{ width: 120, marginBottom: 12, marginTop: 12 }}
					onChange={handleChange}
					options={[
						{ value: FILTER_TIME.YEAR, label: 'Year' },
						{ value: FILTER_TIME.MONTH, label: 'Month' },
						{ value: FILTER_TIME.WEEK, label: 'Week' },
					]}
				/>
			</Row>

			<section style={{ overflowX: 'hidden' }}>
				<Row gutter={[12, 12]}>
					<Col span={24} md={10}>
						<Card loading={loadChartUser} style={{ height: '600px' }}>
							<Pie
								options={pieOptions}
								data={pieData}
								style={{ height: '500px' }}
							/>
						</Card>
					</Col>
					<Col span={24} md={14}>
						<Card loading={loadChartCampaign} style={{ height: '600px' }}>
							<Line
								options={lineOptions}
								data={lineData}
								style={{ height: '500px' }}
							/>
						</Card>
					</Col>
				</Row>
			</section>
		</>
	);
};
