import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { NOTIFICATION } from '@enums';
import { updateUser } from '@services';
import { NestError, UserType } from '@types';
import { QUERY_KEY } from '@constants';

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (values: UserType) => {
			const { data } = await updateUser(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Update user successfully.',
			});
			queryClient.refetchQueries([QUERY_KEY.LIST_USER]);
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
};
