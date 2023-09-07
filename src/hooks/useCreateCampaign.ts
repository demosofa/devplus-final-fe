import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { QUERY_KEY } from '@constants';
import { CampaignType, NestError } from '@types';
import { NOTIFICATION } from '@enums';
import { createCampaign } from '@services';
import { AxiosError } from 'axios';

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
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
};
