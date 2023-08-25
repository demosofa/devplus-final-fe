import axios from 'axios';

import { API_URL } from '@constants';
import { CampaignType } from '@types';

export const getListCampaign = (page: number) =>
	axios.get<CampaignType[]>(API_URL.CAMPAIGN, {
		params: {
			page,
		},
	});

export const createCampaign = (data: CampaignType) =>
	axios.post(API_URL.CAMPAIGN, data);

export const updateCampaign = (data: CampaignType) =>
	axios.patch<CampaignType>(API_URL.CAMPAIGN + data.id, data);

export const getFindOneCampaign = (id: number) =>
	axios.get<CampaignType>(API_URL.CAMPAIGN + id);
