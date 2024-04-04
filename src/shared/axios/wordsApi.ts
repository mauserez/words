import axios from "axios";

export const wordsApi = axios.create({
	//baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
	baseURL: "https://book-backend-api.vercel.app/api/v1/",
});
