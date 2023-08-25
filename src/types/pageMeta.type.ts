export interface PageMeta<T> {
	data: T[];
	meta: Meta;
}

export type Meta = {
	page: number;
	take: number;
	itemCount: number;
	pageCount: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
};
