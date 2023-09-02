import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { createHR } from '@services';
import { NestError, UserCreate } from '@types';
import { NOTIFICATION } from '@enums';
import { AxiosError } from 'axios';

export function useCreateHR() {
	return useMutation({
		mutationFn: async (values: UserCreate) => {
			const { data } = await createHR(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Success Create HR',
			});
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
}
