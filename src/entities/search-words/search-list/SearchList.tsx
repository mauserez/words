import { Book } from "../../../shared/api/words";
import { SearchItem } from "../search-item/SearchItem";

import s from "./SearchList.module.css";

type SearchListProps = { items: Book[] };
export const SearchList = (props: SearchListProps) => {
	const { items } = props;

	return (
		<div className={s.list}>
			{items.map((book) => (
				<SearchItem key={book.id} item={book} />
			))}
		</div>
	);
};
