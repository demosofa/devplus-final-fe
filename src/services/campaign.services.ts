import { API_URL } from '@constants';
import axios from 'axios';
import { CampaignType } from '@types';

export const createCampaign = (data: CampaignType) =>
	axios.post(API_URL.CAMPAIGN, data);
