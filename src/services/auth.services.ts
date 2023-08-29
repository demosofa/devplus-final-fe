import { API_URL } from '@constants';
import { UserLogin } from '@types';
import axios from 'axios';

export const login = (data: UserLogin) =>
	axios.post<string>(API_URL.AUTH + '/login', data);
