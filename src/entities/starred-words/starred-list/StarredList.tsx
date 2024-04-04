import { useRef } from "react";
import { useAppDispatch } from "../../../shared/redux/hooks";
import {
	type Word,
	setWords,
} from "../../../shared/redux/slices/words/wordsSlice";
import { StarredItem } from "../starred-item/StarredItem";

import s from "./StarredList.module.css";

type StarredListProps = {
	items: Word[];
};

export const StarredList = (props: StarredListProps) => {
	const { items } = props;
	const dispatch = useAppDispatch();
	const dragItem = useRef<any>(null);
	const dragOverItem = useRef<any>(null);

	const handleSort = () => {
		let _items = [...items];
		const draggedItemContent = _items.splice(dragItem.current, 1)[0];
		//switch the position
		_items.splice(dragOverItem.current, 0, draggedItemContent);
		//reset the position ref
		dragItem.current = null;
		dragOverItem.current = null;
		//update original
		dispatch(setWords(_items));
	};

	return (
		<div className={s.list}>
			{items.map((item, idx) => {
				return (
					<StarredItem
						draggable
						onDragStart={(e) => {
							dragItem.current = idx;
						}}
						onDragEnter={(e) => {
							dragOverItem.current = idx;
						}}
						onDragEnd={handleSort}
						onDragOver={(e) => {
							e.dataTransfer.dropEffect = "move";
							e.preventDefault();
						}}
						key={idx}
						item={item}
					/>
				);
			})}
		</div>
	);
};
