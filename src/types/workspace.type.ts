export type WorkspaceType = {
	id: number;
	title_workspace: string;
	status: string;
	campaign: [];
	user: [];
};

export type CreateWorkspaceType = {
	id: number;
	title_workspace: string;
	email: string;
	password: string;
	phoneNumber: string;
	status: string;
};
