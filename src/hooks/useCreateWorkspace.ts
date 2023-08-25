import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';

import { CreateWorkspaceType } from '@types';
import { QUERY_KEY } from '@constants';
import { createWorkSpace } from 'services/createWorkspace';
import { NOTIFICATION } from '@enums';

export const useCreateWorkSpace = () => {
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
		},
		onError: () => {
			notification.error({
				message: NOTIFICATION.ERROR,
				description: 'Create workspace failed',
			});
		},
	});
};
