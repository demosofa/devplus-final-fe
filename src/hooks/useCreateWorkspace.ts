import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

import { CreateWorkspaceType } from '@types';
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
			navigate('/workspace');
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Create workspace failed',
			});
		},
	});
};
