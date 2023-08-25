import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCampaign } from 'services/campaign.service';
import { CampaignType } from '@types';
import { QUERY_KEY } from '@constants';

export const useUpdateCampaign = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (values: CampaignType) => {
			const { data } = await updateCampaign(values);
			return data;
		},
		onSuccess(data) {
			queryClient.setQueryData<CampaignType[]>(
				[QUERY_KEY.LIST_CAMPAIGN],
				(listCampaign) => {
					if (listCampaign) {
						const idx = listCampaign.findIndex((item) => item.id == data.id);
						const cloned = listCampaign.concat();
						cloned[idx] = data;
						return cloned;
					}
				}
			);
		},
	});
};
