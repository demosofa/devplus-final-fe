import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { QUERY_KEY } from '@constants';
import { CampaignType } from '@types';
import { NOTIFICATION } from '@enums';
import { createCampaign } from '@services';

export const useCreateCampaign = () => {
	const navigate = useNavigate();

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
			navigate(`/create-cv/${data.id}`);
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Create campaign failed',
			});
		},
	});
};
