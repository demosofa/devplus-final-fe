import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { updateCampaign } from '@services';
import { CampaignType } from '@types';
import { NOTIFICATION } from '@enums';

export const useUpdateCampaign = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (values: CampaignType) => {
			const { data } = await updateCampaign(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Update campaign successfully.',
			});
			navigate('/campaign');

			queryClient.refetchQueries();
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Update campaign failed',
			});
		},
	});
};
