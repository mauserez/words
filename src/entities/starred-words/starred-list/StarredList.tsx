import { useRef } from "react";
import { useAppDispatch } from "../../../shared/redux/hooks";
import {
	type Word,
	reOrderWords,
} from "../../../shared/redux/slices/words/wordsSlice";
import { StarredItem } from "..";

import s from "./StarredList.module.css";

type StarredListProps = {
	items: Word[];
};

export const StarredList = (props: StarredListProps) => {
	const { items = [] } = props;
	const dispatch = useAppDispatch();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dragItem = useRef<any>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dragOverItem = useRef<any>(null);

	const handleSort = () => {
		const draggedItemContent = items[dragItem.current];
		const dragOverItemContent = items[dragOverItem.current];

		if (dragItem.current !== dragOverItem.current) {
			dispatch(
				reOrderWords({
					nameFrom: draggedItemContent.name,
					nameTo: dragOverItemContent.name,
				})
			);
		}

		//reset the position ref
		dragItem.current = null;
		dragOverItem.current = null;
	};

	return (
		<div className={s.list}>
			{items.length >= 0 &&
				items.map((item, idx) => {
					return (
						<StarredItem
							draggable
							onDragStart={() => {
								dragItem.current = idx;
							}}
							onDragEnter={() => {
								dragOverItem.current = idx;
							}}
							onDragEnd={handleSort}
							onDragOver={(e) => {
								e.dataTransfer.dropEffect = "move";
								e.preventDefault();
							}}
							key={item.name}
							item={item}
						/>
					);
				})}
		</div>
	);
};
