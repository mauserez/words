import { GenericAbortSignal } from "axios";
import { wordsApi } from "../../axios/wordsApi";

type GetWordsParams = {
	term: string;
};

export type Word = {
	name: string;
	meanings: Meaning[];
};

type Meaning = {
	type: string;
	text: string;
};

export const getWords = async (
	endpoint: string,
	params: GetWordsParams,
	signal?: GenericAbortSignal
) => {
	const { term } = params;
	console.log(term);
	return await wordsApi
		.get<Word[]>(`/${endpoint}`, { signal: signal })
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			console.log(e);
		});
};

export type BooksResult = {
	success: boolean;
	result: { bookCount: number; books: Book[] };
};

export type Book = {
	id: string;
	description: string;
	name: string;
	price: string;
	currency: {
		currency_name: string;
	};
};

export const getBooks = async (
	endpoint: string,
	signal?: GenericAbortSignal
) => {
	return await wordsApi
		.get<BooksResult>(`/${endpoint}`, { signal: signal })
		.then((res) => {
			return res.data;
		})
		.catch((e) => {
			console.log(e);
		});
};
