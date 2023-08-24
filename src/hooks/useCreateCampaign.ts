import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';
import { CreateCampaignType } from '@types';
import { createCampaign } from 'services/campaign.services';

export const useCreateCampaign = () => {
	return useMutation({
		mutationKey: [QUERY_KEY.CREATE_CAMPAIGN],
		mutationFn: async (values: CreateCampaignType) => {
			const { data } = await createCampaign(values);
			return data;
		},
	});
};
