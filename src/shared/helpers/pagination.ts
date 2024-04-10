export const chunkByLimit = (limit: number = 10, total: number = 0) => {
	if (!total) {
		return;
	}
	const pageArray = [];
	let pageNumber = 1;

	while (total > 0) {
		pageArray.push(pageNumber);
		total = total - limit;
		pageNumber++;
	}

	return pageArray;
};
