import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { login } from '@services';
import { NestError, UserLogin } from '@types';
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
		onError: (error: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: error.response?.data.message,
			});
		},
	});
}
