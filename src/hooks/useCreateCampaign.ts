import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { QUERY_KEY } from '@constants';
import { CampaignType, NestError } from '@types';
import { NOTIFICATION } from '@enums';
import { createCampaign } from '@services';
import { AxiosError } from 'axios';

export const useCreateCampaign = () => {
	return useMutation({
		mutationKey: [QUERY_KEY.CREATE_CAMPAIGN],
		mutationFn: async (values: CampaignType) => {
			const { data } = await createCampaign(values);
			return data;
		},
		onSuccess: (data) => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Create campaign successfully.',
			});

			window.open(`/apply-cv/${data.id}`, '_blank');
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
};
