import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';

import { NOTIFICATION } from '../enums';
import { updateUser } from '../services/user.services';
import { UserType } from '../types';

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
			queryClient.refetchQueries();
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Update user failed',
			});
		},
	});
};
