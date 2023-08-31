import { ROLE } from '@enums';

export interface UserLogin {
	email: string;
	password: string;
}

export interface UserCreate extends UserLogin {
	name: string;
	phone_number: string;
}

export type AuthPayload = {
	id: string;
	name: string;
	email: string;
	role: ROLE;
	status: string;
	iat: number;
};

export type GetAuth = () => AuthPayload | void;

export type SetAuth = (newToken?: string) => void;

export type AuthType = { getAuth: GetAuth; setAuth: SetAuth };
