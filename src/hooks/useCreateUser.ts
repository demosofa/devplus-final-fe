import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { createUser } from '@services';
import { UserCreate } from '@types';
import { NOTIFICATION } from '@enums';

export function useCreateUser() {
	return useMutation({
		mutationFn: async (values: UserCreate) => {
			const { data } = await createUser(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Success Create User',
			});
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Fail to Create User',
			});
		},
	});
}
