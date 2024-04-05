import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";

export type SearchWordPayload = {
	text?: string;
	types: string[];
};

export type Word = {
	name: string;
	meanings: WordMeaning[];
};

export type WordMeaning = {
	type: string;
	text: string;
};

export interface WordsSliceState {
	words: Word[];
	status: "idle" | "loading" | "failed";
}

export const initialState: WordsSliceState = {
	words: [
		{
			name: "Freedom",
			meanings: [
				{
					type: "noun",
					text: "Best text aksd asldjk klasd laksjd lkasjdlka sjd lkasjd lka jd lkajselk jasldk jaslkdl jask odjaosdjo asjd",
				},
			],
		},
		{
			name: "Come",
			meanings: [
				{
					type: "verb",
					text: "Best text aksd asldjk klasd laksjd lkasjdlka sjd lkasjd lka jd lkajselk jasldk jaslkdl jask odjaosdjo asjd",
				},
			],
		},
		{
			name: "Go",
			meanings: [
				{
					type: "verb",
					text: "Best text aksd asldjk klasd laksjd lkasjdlka sjd lkasjd lka jd lkajselk jasldk jaslkdl jask odjaosdjo asjd",
				},
			],
		},
		{
			name: "Beautiful",
			meanings: [
				{
					type: "adjective",
					text: "Best text aksd asldjk klasd laksjd lkasjdlka sjd lkasjd lka jd lkajselk jasldk jaslkdl jask odjaosdjo asjd",
				},
			],
		},
	],
	status: "idle",
};

export const wordsSlice = createAppSlice({
	name: "words",
	initialState,
	reducers: (create) => ({
		addWord: create.reducer((state, action: PayloadAction<Word>) => {
			state.words = [...state.words, action.payload];
		}),
		removeWord: create.reducer((state, action: PayloadAction<Word["name"]>) => {
			state.words = state.words.filter((word) => word.name !== action.payload);
		}),
		setWords: create.reducer((state, action: PayloadAction<Word[]>) => {
			state.words = action.payload;
		}),
	}),
	selectors: {
		selectWordTypes: (state) => {
			const types = state.words.map((word) => {
				return word.meanings.map((meaning) => {
					return meaning.type;
				});
			});

			const flatten = types.flat(1);
			return flatten
				.filter((value, idx) => flatten.indexOf(value) === idx)
				.sort();
		},

		selectWords: (state, filters: SearchWordPayload) => {
			const { text, types } = filters;
			let searched = state.words;

			if (text) {
				searched = searched.filter(
					(word) => word.name.toLowerCase().indexOf(text.toLowerCase()) > -1
				);
			}

			if (types.length > 0) {
				searched = searched.filter((word) => {
					const val = word.meanings.filter((meaning) => {
						return types.includes(meaning.type);
					});
					return !!val.length;
				});
			}

			return searched;
		},
	},
});

export const { addWord, removeWord, setWords } = wordsSlice.actions;

export const { selectWords, selectWordTypes } = wordsSlice.selectors;
