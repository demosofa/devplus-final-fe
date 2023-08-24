import { useMutation } from '@tanstack/react-query';
import { updateCampaign } from 'services/campaign.service';
import { CampaignType } from '@types';

export const useUpdateCampaign = () => {
	return useMutation({
		mutationFn: async (values: CampaignType) => {
			const { data } = await updateCampaign(values);
			return data;
		},
	});
};
