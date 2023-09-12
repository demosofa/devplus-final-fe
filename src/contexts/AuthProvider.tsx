import {
	createContext,
	useEffect,
	useState,
	PropsWithChildren,
	useMemo,
} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { getStorage, removeStorage, setStorage } from '@utils';
import { AuthType, GetAuth, SetAuth } from '@types';
import { NOTIFICATION, ROLE } from '@enums';
import { notification } from 'antd';

export const Auth = createContext<AuthType>({
	getAuth: () => ({
		id: NaN,
		name: '',
		email: '',
		role: ROLE.HR,
		status: '',
		iat: NaN,
	}),
	setAuth: () => null,
});

export function AuthProvider({ children }: PropsWithChildren) {
	const [token, setToken] = useState<string | null>(getStorage('token'));

	if (token) {
		if (!axios.defaults.headers.common['Authorization']) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		}
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}

	const authValue = useMemo(() => {
		const setAuth: SetAuth = (newToken) => {
			if (newToken) {
				setStorage('token', newToken);
				setToken(newToken);
			} else {
				removeStorage('token');
				setToken(null);
			}
		};

		const getAuth: GetAuth = () => {
			try {
				if (token) return jwtDecode(token);
			} catch (error) {
				return setAuth();
			}
		};

		return { getAuth, setAuth };
	}, [token]);

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			(response) => response,
			(error) => {
				switch (error?.response?.status) {
					case 401:
						if (
							window.location.pathname != '/login' &&
							error.response?.data.message.includes('Your account is disabled')
						) {
							authValue.setAuth();
							notification.error({
								message: NOTIFICATION.ERROR,
								description: error.response?.data.message,
							});
						}
						break;
					case 403:
						notification.error({
							message: NOTIFICATION.ERROR,
							description: error.response?.data.message,
						});
						window.location.href = '/403';
						break;
					default:
				}
				return Promise.reject(error);
			}
		);

		return () => axios.interceptors.response.eject(interceptor);
	}, [authValue]);

	return <Auth.Provider value={authValue}>{children}</Auth.Provider>;
}
