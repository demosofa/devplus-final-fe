import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { QUERY_KEY } from '@constants';
import { CampaignType } from '@types';
import { NOTIFICATION } from '@enums';
import { createCampaign } from '@services';

export const useCreateCampaign = () => {
	return useMutation({
		mutationKey: [QUERY_KEY.CREATE_CAMPAIGN],
		mutationFn: async (values: CampaignType) => {
			const { data } = await createCampaign(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Create campaign successfully.',
			});
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Create campaign failed',
			});
		},
	});
};
