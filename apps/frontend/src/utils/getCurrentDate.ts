export const getCurrentDate = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();

	const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
		day < 10 ? '0' + day : day
	}`;

	return formattedDate;
};
