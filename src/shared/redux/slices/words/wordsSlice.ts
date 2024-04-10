import { RootState } from "./../../store";
import { PayloadAction, current, createSelector } from "@reduxjs/toolkit";
import { createAppSlice } from "../../createAppSlice";

export type SearchWordPayload = {
	text?: string;
	partsOfSpeech: string[];
};

export type Word = {
	name: string;
	meanings: WordMeaning[];
};

export type WordMeaning = {
	id: string;
	partOfSpeech: string;
	text: string;
};

export type WordMeaningAddPayload = WordMeaning & { word: string };
export type WordMeaningRemovePayload = { id: WordMeaning["id"]; word: string };

export interface WordsSliceState {
	words: Word[];
	status: "idle" | "loading" | "failed";
}

export const initialState: WordsSliceState = {
	words: [],
	status: "idle",
};

export const wordsSlice = createAppSlice({
	name: "words",
	initialState,
	reducers: (create) => ({
		addMeaning: create.reducer(
			(state, action: PayloadAction<WordMeaningAddPayload>) => {
				const { word, ...meaning } = action.payload;
				const currentWords = [...current(state.words)];

				if (!currentWords.length) {
					state.words.push({ name: word, meanings: [meaning] });
					return;
				}

				const idx = currentWords.findIndex((starred) => {
					return starred.name.toLowerCase().trim() === word.toLowerCase();
				});

				if (idx < 0) {
					state.words.push({ name: word, meanings: [meaning] });
				} else {
					const obj = currentWords[idx];
					const meaningIdx = obj.meanings?.findIndex(
						(m) => m.id === meaning.id
					);
					const newMeanings = [...obj.meanings];

					if (meaningIdx < 0) {
						newMeanings.push(meaning);
					} else {
						newMeanings[meaningIdx] = meaning;
					}

					currentWords[idx] = { ...obj, meanings: newMeanings };
					state.words = currentWords;
				}
			}
		),
		removeMeaning: create.reducer(
			(state, action: PayloadAction<WordMeaningRemovePayload>) => {
				const { word, id: meaningId } = action.payload;
				const currentWords = [...current(state.words)];

				const idx = currentWords.findIndex(
					(starred) => starred.name.toLowerCase().trim() === word
				);

				if (idx < 0) {
					return;
				}

				let obj = { ...currentWords[idx] };

				if (obj.meanings.length > 1) {
					const newMeanings = obj.meanings.filter((m) => m.id !== meaningId);
					obj = { ...obj, meanings: newMeanings };
					currentWords[idx] = obj;
				} else {
					currentWords.splice(idx, 1);
				}

				state.words =
					currentWords === null || !currentWords[0] ? [] : currentWords;
			}
		),
		removeWord: create.reducer((state, action: PayloadAction<Word["name"]>) => {
			state.words = state.words.filter((word) => word.name !== action.payload);
		}),
		reOrderWords: create.reducer(
			(state, action: PayloadAction<{ nameFrom: string; nameTo: string }>) => {
				const words = [...current(state.words)];

				const { nameFrom, nameTo } = action.payload;
				const fromIdx = words.findIndex((word) => word.name === nameFrom);
				const toIdx = words.findIndex((word) => word.name === nameTo);

				const wordFrom = words[fromIdx];
				const wordTo = words[toIdx];

				//swap words
				words[toIdx] = wordFrom;
				words[fromIdx] = wordTo;

				state.words = words;
			}
		),
	}),
});

export const { addMeaning, removeMeaning, removeWord, reOrderWords } =
	wordsSlice.actions;

export const memoSelectWords = createSelector(
	/* br */ [
		(state: RootState) => state.words,
		(state: RootState, search) => search,
	],
	(state, search: SearchWordPayload) => {
		const { text = "", partsOfSpeech = [] } = search;
		let searched = [...state.words];

		if (text.trim()) {
			searched = searched.filter(
				(word) => word.name.toLowerCase() === text.toLowerCase()
			);
		}

		if (partsOfSpeech.length > 0) {
			searched = searched
				.map((word) => {
					return {
						...word,
						meanings: word.meanings.filter((m) =>
							partsOfSpeech.includes(m.partOfSpeech)
						),
					};
				})
				.filter((w) => w.meanings.length !== 0);
		}

		return searched;
	}
);

export const memoSelectWordTypes = createSelector(
	[(state: RootState) => state.words.words],
	(words): string[] => {
		const types = words.map((word) => {
			if (!word) {
				return;
			}

			return word.meanings.map((meaning) => {
				return meaning.partOfSpeech;
			});
		});

		if (types.length === 0) {
			return [];
		}

		const flatten = types.flat(1);
		return flatten
			.filter((value, idx) => flatten.indexOf(value) === idx)
			.sort() as string[];
	}
);
