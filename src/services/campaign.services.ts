import { API_URL } from '@constants';
import axios from 'axios';
import { CreateCampaignType } from '@types';

export const createCampaign = (data: CreateCampaignType) =>
	axios.post(API_URL.CAMPAIGN, data);
