import { useContext } from 'react';

import { Auth } from '@contexts';

export function useAuth() {
	return useContext(Auth);
}
