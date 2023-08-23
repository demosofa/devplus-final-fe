export type WorkspaceType = {
	id: number;
	title_workspace: string;
	status: string;
};

export type CREATEWORKSPACE = {
	id: number;
	title_workspace: string;
	email: string;
	password: string;
	phoneNumber: string;
	status: string;
};