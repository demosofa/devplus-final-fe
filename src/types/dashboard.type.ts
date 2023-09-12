export type ChartCv = {
	campaign_id: number;
	campaign_name: string;
	date: string;
	cv_counts: string;
};

export type ChartCampaign = {
	workspace_id: number;
	workspace_title: string;
	date: string;
	campaign_counts: string;
};

export type ChartUser = {
	workspace_id: number;
	workspace_title: string;
	date: string;
	user_counts: string;
};
