import { wordsApi } from "../../axios/wordsApi";

export type WordFromApi = {
	id: string;
	word: string;
	text: string;
	partOfSpeech: string;
};

export const getWords = async (word: string) => {
	return wordsApi
		.get<WordFromApi[]>(`/${word.toLowerCase()}/definitions?limit=50`)
		.then((res) => {
			const words = res.data.filter(
				(word) => !!word.id && !!word.text && word.partOfSpeech
			);

			return words;
		})
		.catch((e) => {
			console.log(e);
			return [];
		});
};
