import { wordsApi } from "../../axios/wordsApi";

type GetWordsParams = {
	term: string;
};
drop error
export const getWords = async (params: GetWordsParams) => {
	return await wordsApi.get("", { params: params }).then((res) => {
		console.log(res.data);
	});
};
