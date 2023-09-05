import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { NOTIFICATION } from '@enums';
import { createCv } from '@services';

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
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Create cv failed',
			});
		},
	});
};
