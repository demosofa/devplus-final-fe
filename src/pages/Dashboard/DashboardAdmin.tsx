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
import { useChartCV } from '@hooks';
import { useMemo, useState } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const DashboardAdmin = () => {
	const [select, setSelect] = useState('year');

	const { data: CVData } = useChartCV(select);

	const lineOptions = {
		responsive: true,
		maintainAspectRatio: true,
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

	const lineData = {
		labels: uniqueDates,
		datasets: lineDatasets,
	};

	const handleChange = (value: string) => {
		setSelect(value);
	};

	return (
		<>
			<Row>
				<Select
					defaultValue="year"
					style={{ width: 120 }}
					onChange={handleChange}
					options={[
						{ value: 'year', label: 'Year' },
						{ value: 'month', label: 'Month' },
						{ value: 'week', label: 'Week' },
					]}
				/>
			</Row>
			<Row>
				<Col span={12}>
					<Card>
						<Pie data={pieData} />
					</Card>
				</Col>
				<Col span={12}>
					<Card>
						<Line options={lineOptions} data={lineData} />
					</Card>
				</Col>
			</Row>
		</>
	);
};
