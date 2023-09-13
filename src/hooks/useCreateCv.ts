import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { NOTIFICATION } from '@enums';
import { createCv } from '@services';
import { NestError } from '@types';

export const useCreateCv = () => {
	return useMutation({
		mutationFn: async (values: FormData) => {
			const { data } = await createCv(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Create cv successfully.',
			});
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
};
