import axios from 'axios';

import { API_URL } from '@constants';
import { UserLogin } from '@types';

export const login = (data: UserLogin) =>
	axios.post<string>(API_URL.AUTH + 'login', data);
