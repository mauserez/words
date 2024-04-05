import { ComponentProps, useState } from "react";
import {
	removeWord,
	Word,
} from "../../../shared/redux/slices/words/wordsSlice";
import { useAppDispatch } from "../../../shared/redux/hooks";
import { Star } from "../../../shared/icons";
import { VscListSelection } from "react-icons/vsc";

import clsx from "clsx";
import s from "./StarredItem.module.css";

type StarredItemProps = {
	item: Word;
	innerRef?: React.MutableRefObject<HTMLDivElement | null>;
} & ComponentProps<"div">;

export const StarredItem = (props: StarredItemProps) => {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const { item, ...containerProps } = props;
	const firstMeaning = item.meanings[0];

	return (
		<div className={s.itemContainer} {...containerProps}>
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
					<span className={s.type}>{firstMeaning.type}</span>
					<span className={s.infoText}>{firstMeaning.text}</span>
				</div>

				<Star
					active
					size={30}
					onClick={() => {
						dispatch(removeWord(item.name));
					}}
				/>
			</div>
			<div className={clsx({ [s.accord]: true, [s.accordOpen]: isOpen })}>
				{item.meanings.map((meaning, i) => {
					return (
						<div className="flex p-4" key={Math.random() + i}>
							<div className={s.type}>{meaning.type}</div>
							<div>{meaning.text}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
