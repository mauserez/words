import { useAppDispatch } from "../../../shared/redux/hooks";
import { removeMeaning } from "../../../shared/redux/slices/words/wordsSlice";

import { Star } from "../../../shared/ui/icons";
import { Word } from "../../../shared/redux/slices/words/wordsSlice";
import s from "./StarredMeanings.module.css";

export type StarredMeaningsProps = {
	meanings: Word["meanings"];
	wordName: string;
};
export const StarredMeanings = (props: StarredMeaningsProps) => {
	const dispatch = useAppDispatch();
	const { meanings, wordName } = props;
	return (
		Array.isArray(meanings) &&
		meanings.map((meaning, i) => {
			return (
				<div className={s.meaningWrap} key={meaning.id + i + Math.random()}>
					<div className={s.meaning}>
						<div className={s.type}>{meaning.partOfSpeech}</div>
						<div>{meaning.text}</div>
					</div>
					<div className={s.star}>
						<Star
							active
							size={24}
							onClick={() => {
								dispatch(removeMeaning({ word: wordName, id: meaning.id }));
							}}
						/>
					</div>
				</div>
			);
		})
	);
};
