export const date = new Date();
export const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
	.toString()
	.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
export const formattedTime = `${date
	.getHours()
	.toString()
	.padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
	.getSeconds()
	.toString()
	.padStart(2, '0')}`;
