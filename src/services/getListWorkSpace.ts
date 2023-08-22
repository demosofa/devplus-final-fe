import { API_URL } from '@constants';
import axios, { AxiosResponse } from 'axios';

interface Product {}

export const getListWorkSpace = (): Promise<AxiosResponse<Product>> =>
	axios.get<Product>(API_URL.WORKSPACE);
