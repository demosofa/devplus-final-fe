import React from 'react';
import { Input } from 'antd';

type SearchBarProps = {
	placeholder: string;
	onSearch: (value: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
	placeholder,
	onSearch,
}) => {
	return (
		<div className="search-container">
			<Input.Search
				placeholder={placeholder}
				allowClear
				onSearch={onSearch}
				className="search-input"
				enterButton
			/>
		</div>
	);
};
