import { Star } from "../../../shared/icons";
import { Book } from "../../../shared/api/words";
import s from "./SearchItem.module.css";
import { useState } from "react";

type SearchItemProps = {
	item: Book;
};
export const SearchItem = (props: SearchItemProps) => {
	const { item } = props;
	const [starred, setStarred] = useState(false);
	return (
		<div className={s.itemContainer}>
			<div className={s.item} key={item.id}>
				<div className={s.info}>
					<div className={s.word}>{item.name}</div>
					<div className={s.type}>{item.currency.currency_name}</div>
					<div className={s.infoText}>{item.description}</div>
				</div>

				<div>
					<Star
						onClick={() => {
							setStarred(!starred);
						}}
						active={starred}
						size={24}
					/>
				</div>
			</div>
		</div>
	);
};
