export type UserType = {
	id: number;
	name: string;
	email?: string;
	status?: string;
	phone_number?: string;
	password?: string;
};

export type UserCountType = {
	currentYearCount?: any;
	oldYearCount?: any;
	totalUserCount?: any;
};
