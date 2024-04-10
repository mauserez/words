import { WordFromApi } from "../../../shared/api/words";
import { SearchItem } from "../search-item/SearchItem";

import s from "./SearchList.module.css";

type SearchListProps = { items: WordFromApi[] };
export const SearchList = (props: SearchListProps) => {
	const { items } = props;

	return (
		<div className={s.list}>
			{items.map((word, idx) => (
				<SearchItem key={idx} item={word} />
			))}
		</div>
	);
};
