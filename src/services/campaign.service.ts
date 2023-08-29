import { API_URL } from '@constants';
import { CampaignType } from '@types';
import axios from 'axios';

export const updateCampaign = (data: CampaignType) =>
	axios.patch<CampaignType>(API_URL.CAMPAIGN + data.id, data);

export const getFindOneCampaign = (id: number) =>
	axios.get(API_URL.CAMPAIGN + id);
