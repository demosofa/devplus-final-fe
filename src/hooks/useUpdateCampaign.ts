import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';
import { notification } from 'antd';
import { updateCampaign } from 'services/campaign.service';
import { CampaignType } from '@types';

export const useUpdateCampaign = () => {
	const [api] = notification.useNotification();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: [QUERY_KEY.UPDATE_CAMPAIGN],
		mutationFn: async (values: CampaignType) => {
			const { data } = await updateCampaign(values);
			return data;
		},
		onSuccess(_, id) {
			queryClient.invalidateQueries([QUERY_KEY.UPDATE_CAMPAIGN, id]);
			api.success({ message: 'Success accept workspace' });
		},
		onError() {
			api.error({ message: 'Fail to accept workspace' });
		},
	});
};
