export interface UserLogin {
	email: string;
	password: string;
}

export interface UserCreate extends UserLogin {
	name: string;
	phone_number: string;
}
