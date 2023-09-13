import { Col, Row, Select, Card } from 'antd';
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Tooltip,
	Title,
} from 'chart.js/auto';
import { useMemo, useState } from 'react';
import { FILTER_TIME } from '@enums';
import { Line, Pie } from 'react-chartjs-2';

import { useChartCV } from '@hooks';
import { TotalStatistics } from 'pages/CampaignStatistics/TotalStatistics';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	Title
);

export const DashboardAdmin = () => {
	const [select, setSelect] = useState<FILTER_TIME>(FILTER_TIME.YEAR);

	const { data: CVData, isLoading: loadChartCv } = useChartCV(select);

	const lineOptions = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'CV Chart',
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
				},
			},
			x: {
				beginAtZero: true,
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
				text: 'CV Chart',
			},
		},
	};

	const uniqueDates = useMemo(() => {
		if (!CVData) return [];

		const dates = CVData.map((item) => item.date);
		const result = Array.from(new Set(dates));

		return result.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
	}, [CVData]);

	const dateToIndexMap: Record<string, number> = {};
	uniqueDates.forEach((date, index) => {
		dateToIndexMap[date] = index;
	});

	const campaignIds = Array.from(
		new Set(CVData?.map((item) => item.campaign_id))
	);

	const lineDatasets: any[] = [];

	campaignIds.forEach((campaignId) => {
		const dataForCampaign = new Array(uniqueDates.length).fill(0);

		CVData?.filter((item) => item.campaign_id === campaignId).forEach(
			(item) => {
				const index = dateToIndexMap[item.date];

				dataForCampaign[index] += parseInt(item.cv_counts);
			}
		);

		const campaignName = CVData?.find((item) => item.campaign_id == campaignId)
			?.campaign_name;

		lineDatasets.push({
			label: campaignName,
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

	const campaignNames = Array.from(
		new Set(CVData?.map((item) => item.campaign_name))
	);

	const pieDatasets = campaignNames.map((name) => {
		return CVData?.filter((item) => item.campaign_name === name).reduce(
			(prev, curr) => (prev += parseInt(curr.cv_counts)),
			0
		);
	});

	const pieData = {
		labels: campaignNames,
		datasets: [
			{
				label: 'Cv count',
				data: pieDatasets,
				backgroundColor: Array.from(
					{ length: campaignIds.length },
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
						<Card loading={loadChartCv}>
							<Pie options={pieOptions} data={pieData} />
						</Card>
					</Col>
					<Col span={24} md={14}>
						<Card loading={loadChartCv}>
							<Line options={lineOptions} data={lineData} />
						</Card>
					</Col>
				</Row>
			</section>
		</>
	);
};
