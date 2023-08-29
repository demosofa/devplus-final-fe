import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { QUERY_KEY } from '@constants';
import { deleteCampaign } from '@services';
import { NOTIFICATION } from '@enums';

export function useDeleteCampaign() {
	return useMutation({
		mutationKey: [QUERY_KEY.LIST_WORKSPACE],
		mutationFn: async (id: number) => {
			const { data } = await deleteCampaign(id);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Delete campaign successfully.',
			});
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Delete campaign failed',
			});
		},
	});
}
