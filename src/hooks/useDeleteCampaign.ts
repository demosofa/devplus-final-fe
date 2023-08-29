import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { deleteCampaign } from '@services';
import { NOTIFICATION } from '@enums';

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
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Delete campaign failed',
			});
		},
	});
}
