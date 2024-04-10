import { ComponentProps, useState } from "react";
import {
	removeWord,
	Word,
} from "../../../shared/redux/slices/words/wordsSlice";
import { useAppDispatch } from "../../../shared/redux/hooks";
import { Star } from "../../../shared/ui/icons";
import { VscListSelection } from "react-icons/vsc";

import { StarredMeanings } from "..";

import clsx from "clsx";
import s from "./StarredItem.module.css";

type StarredItemProps = {
	item: Word;
} & ComponentProps<"div">;

export const StarredItem = (props: StarredItemProps) => {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const { item, ...divProps } = props;
	const firstMeaning = item.meanings[0];

	return (
		<div className={s.container} {...divProps}>
			<div className={s.item}>
				<div className={s.info}>
					<div
						onClick={() => {
							setIsOpen(!isOpen);
						}}
						className="flex items-center gap-4 cursor-pointer"
					>
						<VscListSelection size={20} />
						<span className={s.word}>{item.name}</span>
					</div>
					<span className={s.type}>{firstMeaning.partOfSpeech}</span>
					<span className={s.infoText}>{firstMeaning.text}</span>
				</div>
				<div className={s.star}>
					<Star
						active
						size={24}
						onClick={() => {
							dispatch(removeWord(item.name));
						}}
					/>
				</div>
			</div>
			<div className={clsx({ [s.accord]: true, [s.accordOpen]: isOpen })}>
				<StarredMeanings wordName={item.name} meanings={item.meanings} />
			</div>
		</div>
	);
};
