// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Word = {
  id: number;
  quote: string;
  author: string;
};

type WordsApiResponse = {
  words: Word[];
  total: number;
  skip: number;
  limit: number;
};
/*
type WordsApiRequest = {
  word: string;
  partOfSpeech: string;
}; */

export const wordsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wordsapiv1.p.rapidapi.com/words",
    headers: {
      "X-RapidAPI-Key": "c519f954f2msh46cfd45adaff4f5p162ed6jsn34b7e02760ec",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  }),
  reducerPath: "wordsApi",
  tagTypes: ["Words"],
  endpoints: (build) => ({
    getWords: build.query<WordsApiResponse, number>({
      query: (limit = 10, word = "") => {
        const letterPattern = !word ? `^${word}.{4}$` : "";
        return `?limit=${limit}&letterPattern=${letterPattern}`;
      },
      providesTags: (result, error, id) => [{ type: "Words", id }],
    }),
  }),
});

export const { useGetWordsQuery } = wordsApiSlice;
