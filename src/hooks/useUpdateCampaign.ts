import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { updateCampaign } from '@services';
import { CampaignType } from '@types';
import { QUERY_KEY } from '@constants';
import { NOTIFICATION } from '@enums';

export const useUpdateCampaign = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (values: CampaignType) => {
			const { data } = await updateCampaign(values);
			return data;
		},
		onSuccess: (data) => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Update campaign successfully.',
			});
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
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Update campaign failed',
			});
		},
	});
};
