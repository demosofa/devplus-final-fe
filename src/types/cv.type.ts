import { UploadFile } from 'antd';
import { CampaignType } from './campaign.type';

export type CvType = {
	id: number;
	name: string;
	phone_number: string;
	apply_position: string;
	file: string;
	create_at: Date;
	status: string;
	campaign: CampaignType;
};

export type AntdUpload = {
	file: UploadFile;
	fileList: UploadFile[];
};

export type CreateCvType = {
	name: string;
	phone_number: string;
	apply_position: string;
	file?: AntdUpload;
	fileString?: string;
	create_at: Date;
	status: string;
	campaignId: string;
};

export type CvCountType = {
	currentYearCount?: any;
	oldYearCount?: any;
	totalCvCount?: any;
};
