import axios from "axios";

export const wordsApi = axios.create({
	//baseURL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
	baseURL: "https://api.wordnik.com/v4/word.json/",
	params: {
		api_key: "zueb79ue7x77h4082rf4wxbm2c622wjaup8x0z9k8850j6r7o",
	},
});
