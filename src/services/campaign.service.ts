import { API_URL } from '@constants';
import { CampaignType } from '@types';
import axios, { AxiosResponse } from 'axios';

export const getListCampaign = (
	page: number
): Promise<AxiosResponse<CampaignType[]>> =>
	axios.get<CampaignType[]>(API_URL.CAMPAIGN, {
		params: {
			page,
		},
	});

export const updateCampaign = (data: CampaignType) =>
	axios.patch<CampaignType>(API_URL.CAMPAIGN + data.id, data);

export const getFindOneCampaign = (id: number) =>
	axios.get(API_URL.CAMPAIGN + id);
