import { useState } from "react";
import { useGetWordsQuery } from "../../shared/redux/slices/wordsApi/wordsApiSlice";
import s from "./Words.module.css";

const options = [5, 10, 20, 30];

export const Words = () => {
	const [numberOfQuotes, setNumberOfQuotes] = useState(10);
	const { data, isError, isLoading, isSuccess } =
		useGetWordsQuery(numberOfQuotes);

	if (isError) {
		return (
			<div>
				<h1>There was an error!!!</h1>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	if (isSuccess) {
		return (
			<div className={s.container}>
				<h3>Select the Quantity of Quotes to Fetch:</h3>
				<select
					className={s.select}
					value={numberOfQuotes}
					onChange={(e) => {
						setNumberOfQuotes(Number(e.target.value));
					}}
				>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				{data.words.map(({ author, quote, id }) => (
					<blockquote key={id}>
						&ldquo;{quote}&rdquo;
						<footer>
							<cite>{author}</cite>
						</footer>
					</blockquote>
				))}
			</div>
		);
	}

	return null;
};
