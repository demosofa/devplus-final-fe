import { Col, Row } from 'antd';
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { useChartCampaign } from '@hooks';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const DashboardCV = () => {
	const { id } = useParams();
	const { data: campaignData } = useChartCampaign(Number(id));
	console.log(campaignData);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart',
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

	const labels = campaignData?.map((item: any) => {
		const date = new Date(item.month);
		return `${date.getMonth() + 1}/${date.getFullYear()}`;
	});

	const counts = campaignData?.map((item: any) => parseInt(item.count, 10));

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: counts,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	return (
		<Row>
			<Col span={4}></Col>
			<Col span={12}>
				<Line options={options} data={data} />
			</Col>
		</Row>
	);
};
