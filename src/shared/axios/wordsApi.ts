import axios from "axios";
err;
export const wordsApi = axios.create({
	baseURL: "https://wordsapiv1.p.rapidapi.com/words?letterPattern=^a.{4}$",
	headers: {
		"X-RapidAPI-Key": "c519f954f2msh46cfd45adaff4f5p162ed6jsn34b7e02760ec",
		"X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
	},
});
