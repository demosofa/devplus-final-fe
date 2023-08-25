export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ImPartial<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
