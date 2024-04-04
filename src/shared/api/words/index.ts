import { wordsApi } from "../../axios/wordsApi";

type GetWordsParams = {
	term: string;
};
err;

export const getWords = async (params: GetWordsParams) => {
	return await wordsApi.get("", { params: params }).then((res) => {
		console.log(res.data);
	});
};
