// export type CvByMonth = {
// 	month: string;
// 	count: number;
// };

// export type ChartCv = {
// 	campaign_name: string;
// 	date: Date;
// 	cvByMonth: CvByMonth[];
// };

export type ChartCv = {
	campaign_id: number;
	campaign_name: string;
	date: string;
	cv_counts: string;
};
