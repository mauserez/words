//import { useAppSelector } from "../../../shared/redux/hooks";
import { WordFromApi, getWords } from "../../../shared/api/words";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { plural } from "../../../shared/helpers/number";

import {
	SearchList,
	SearchLoading,
	SearchNotFound,
	SearchStart,
} from "../../../entities/search-words";

import { Input, Select, Pagination } from "../../../shared/ui";
import s from "../style.module.css";

export const SearchWords = () => {
	const [search, setSearch] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [words, setWords] = useState<WordFromApi[]>([]);
	const [wordsByPage, setWordsByPage] = useState<WordFromApi[]>([]);
	const [limit, setLimit] = useState(10);

	const debouncedSearch = useDebounce(search, 500);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setLimit(Number(e.target.value));
	};

	const showWords = async () => {
		const values = await getWords(debouncedSearch);

		setWords([...values]);
		setWordsByPage(values.splice(0, limit));
		setIsLoading(false);
	};

	const handleWordsByPage = (page: number) => {
		const from = page <= 1 ? 0 : (page - 1) * limit;
		const pageWords = [...words].splice(from, limit);
		setWordsByPage(pageWords);
	};

	useEffect(() => {
		if (!debouncedSearch) {
			setWords([]);
			return;
		}

		setIsLoading(true);
		showWords();
	}, [debouncedSearch.trim()]);

	useEffect(() => {
		handleWordsByPage(1);
	}, [limit]);

	return (
		<div>
			<h1>Search Words</h1>
			<div className={s.container}>
				<div className={s.searchContainer}>
					<Input onChange={handleInputChange} />
					<div>
						<Select label="Лимит" onChange={handleLimitChange}>
							<option>10</option>
							<option>15</option>
							<option>20</option>
						</Select>
					</div>
				</div>
				<div>
					{!debouncedSearch ? (
						<SearchStart />
					) : isLoading ? (
						<SearchLoading />
					) : Array.isArray(words) && words.length > 0 ? (
						<div className={s.listWrap}>
							<div>
								Всего найдено {words.length} &nbsp;
								{plural(words.length, "значение", "значения", "значений")}
							</div>
							<SearchList items={wordsByPage} />
							<Pagination
								handlePage={handleWordsByPage}
								count={words.length || 0}
								limit={limit}
							/>
						</div>
					) : (
						<SearchNotFound />
					)}
				</div>
			</div>
		</div>
	);
};
