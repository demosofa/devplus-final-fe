import axios from 'axios';

import { API_URL } from '@constants';
import { UserLogin, UserCreate } from '@types';

export const login = (data: UserLogin) =>
	axios.post<string>(API_URL.AUTH + 'login', data);

export const createUser = (data: UserCreate) =>
	axios.post(API_URL.AUTH + 'register', data);
