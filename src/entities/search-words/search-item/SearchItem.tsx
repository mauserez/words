import { useAppSelector, useAppDispatch } from "../../../shared/redux/hooks";
import {
	addMeaning,
	removeMeaning,
} from "../../../shared/redux/slices/words/wordsSlice";

import { Star } from "../../../shared/ui/icons";
import { WordFromApi } from "../../../shared/api/words";

import s from "./SearchItem.module.css";

type SearchItemProps = {
	item: WordFromApi;
};

export const SearchItem = (props: SearchItemProps) => {
	const { item } = props;
	const dispatch = useAppDispatch();

	const meaningExists = useAppSelector((state) =>
		state.words.words.some((word) => {
			if (!word) {
				return false;
			}

			return word.meanings.some((meaning) => meaning.id === item.id);
		})
	);

	return (
		<div className={s.itemContainer}>
			<div className={s.item}>
				<div className={s.info}>
					<div className={s.word}>{item.word}</div>
					<div className={s.type}>{item.partOfSpeech}</div>
					<div className={s.infoText}>{item.text}</div>
				</div>

				<div>
					<Star
						onClick={() => {
							!meaningExists
								? dispatch(addMeaning(item))
								: dispatch(removeMeaning(item));
						}}
						active={meaningExists}
						size={24}
					/>
				</div>
			</div>
		</div>
	);
};
