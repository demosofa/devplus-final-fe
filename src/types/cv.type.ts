import { UploadFile } from 'antd';

export type CvType = {
	id: number;
	name: string;
	phone_number: string;
	apply_position: string;
	file: string;
	create_at: Date;
	status: string;
	campaign: [];
};

export type CreateCvType = {
	name: string;
	phone_number: string;
	apply_position: string;
	file: UploadFile;
	create_at: Date;
	status: string;
	campaignId: string;
};
