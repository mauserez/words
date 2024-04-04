import { useAppSelector } from "../../../shared/redux/hooks";
import { getWords } from "../../../shared/api/words";

import { useEffect, useState } from "react";
import { Input } from "../../../shared/input/Input";
import { SearchList } from "../../../entities/search-words/search-list/SearchList";

import s from "../style.module.css";

type SearchWord = { term: string };

export const SearchWords = () => {
	const [search, setSearch] = useState<SearchWord>({
		term: "",
	});
	console.log(123);

	useEffect(() => {
		getWords({ term: search.term });
	}, [search.term]);

	return (
		<div>
			<h1>Search Words</h1>
			<div className={s.container}>
				<div className={s.searchContainer}>
					<Input
						onChange={(e) => {
							setSearch({ ...search, term: e.target.value });
						}}
					/>
				</div>
				<SearchList />
			</div>
		</div>
	);
};
