import { CAMPAIGN } from '@enums';

export type CampaignType = {
	id: number;
	name: string;
	description: string;
	expired_time: string;
	status: CAMPAIGN;
};

export type CampaignCountType = {
	currentYearCount?: any;
	oldYearCount?: any;
	totalCampaignCount?: any;
};
