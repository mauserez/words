//import { useAppSelector } from "../../../shared/redux/hooks";
import {
	Book,
	getBooks /* , getWords, Word */,
} from "../../../shared/api/words";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../../../shared/input/Input";
import {
	SearchList,
	SearchLoading,
	SearchNotFound,
	SearchStart,
} from "../../../entities/search-words";

import s from "../style.module.css";
import { useDebounce } from "../../../shared/hooks/useDebounce";

type SearchWord = { term: string };

export const SearchWords = () => {
	const [search, setSearch] = useState<SearchWord>({
		term: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const debouncedSearch = useDebounce(search, 500);
	const [books, setBooks] = useState<Book[]>([]);

	//const [words, setWords] = useState<Word[]>([]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch({ ...search, term: e.target.value });
	};
	const controller = new AbortController();

	useEffect(() => {
		if (!debouncedSearch.term) {
			setBooks([]);
			return;
		}

		console.log(debouncedSearch);
		/* getWords("books", { term: debouncedSearch.term }, controller.signal).then(
			(words) => {
				console.log(words);
			}
		); */
		setIsLoading(true);

		getBooks(`books?priceTo=${debouncedSearch.term}`, controller.signal).then(
			(data) => {
				if (data) {
					setBooks(data.result.books);
					setIsLoading(false);
				}
			}
		);

		return () => {
			controller.abort();
		};
	}, [debouncedSearch]);

	return (
		<div>
			<h1>Search Words</h1>
			<div className={s.container}>
				<div className={s.searchContainer}>
					<Input onChange={handleInputChange} />
				</div>
				<div>
					{!debouncedSearch.term ? (
						<SearchStart />
					) : isLoading ? (
						<SearchLoading />
					) : Array.isArray(books) && books.length > 0 ? (
						<SearchList items={books} />
					) : (
						<SearchNotFound />
					)}
				</div>
			</div>
		</div>
	);
};
