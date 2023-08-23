import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants';
import { createWorkSpace } from 'services/createWorkspace';
import { CREATEWORKSPACE } from 'types';

export const useCreateWorkSpace = () => {
	return useMutation({
		mutationKey: [QUERY_KEY.CREATE_WORKSPACE],
		mutationFn: async (values: CREATEWORKSPACE) => {
			const { data } = await createWorkSpace(values);
			return data;
		},
	});
};