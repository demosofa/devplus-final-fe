import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { AxiosError } from 'axios';

import { CreateWorkspaceType, NestError } from '@types';
import { QUERY_KEY } from '@constants';
import { createWorkSpace } from '@services';
import { NOTIFICATION } from '@enums';

export const useCreateWorkSpace = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationKey: [QUERY_KEY.CREATE_WORKSPACE],
		mutationFn: async (values: CreateWorkspaceType) => {
			const { data } = await createWorkSpace(values);
			return data;
		},
		onSuccess: () => {
			notification.success({
				message: NOTIFICATION.SUCCESS,
				description: 'Create workspace successfully.',
			});
			navigate('/login');
		},
		onError: (data: AxiosError<NestError>) => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: data.response?.data.message,
			});
		},
	});
};
