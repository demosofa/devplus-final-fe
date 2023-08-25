import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';
import { notification } from 'antd';

import { createCampaign } from 'services/campaign.services';

import { CampaignType } from '@types';
import { NOTIFICATION } from '../enums/Notification';

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
