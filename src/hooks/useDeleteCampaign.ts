import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { deleteCampaign } from '@services';
import { NOTIFICATION } from '@enums';
import { NestError } from '@types';

export function useDeleteCampaign() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number) => {
			const { data } = await deleteCampaign(id);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Delete campaign successfully.',
			});
			queryClient.refetchQueries();
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
}
