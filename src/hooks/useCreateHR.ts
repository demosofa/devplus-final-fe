import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { createHR } from '@services';
import { NestError, UserCreate } from '@types';
import { NOTIFICATION } from '@enums';

export function useCreateHR() {
	const navigate = useNavigate();

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
			navigate('/user');
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
}
