import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { login } from '@services';
import { UserLogin } from '@types';
import { NOTIFICATION } from '@enums';

export function useLogin() {
	return useMutation({
		mutationFn: async (values: UserLogin) => {
			const { data } = await login(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Success Login',
			});
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Fail to Login',
			});
		},
	});
}
