import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { NOTIFICATION } from '@enums';
import { failCV } from '@services';
import { NestError } from '@types';

export function useFailCV() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) => {
			const { data } = await failCV(id);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'CV fail',
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
