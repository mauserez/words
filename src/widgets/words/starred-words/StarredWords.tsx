import { useState } from "react";
import { useAppSelector } from "../../../shared/redux/hooks";
import {
	SearchWordPayload,
	memoSelectWords,
	memoSelectWordTypes,
} from "../../../shared/redux/slices/words/wordsSlice";

import { Input } from "../../../shared/ui";
import { StarredList } from "../../../entities/starred-words";

import clsx from "clsx";
import style from "../style.module.css";
import s from "./StarredWords.module.css";

export const StarredWords = () => {
	const [search, setSearch] = useState<SearchWordPayload>({
		text: "",
		partsOfSpeech: [],
	});

	const types = useAppSelector((state) => memoSelectWordTypes(state));
	const words = useAppSelector((state) => memoSelectWords(state, search));

	return (
		<div>
			<h1>Starred Words</h1>
			<div className={style.container}>
				<div className={style.searchContainer}>
					<Input
						onChange={(e) => {
							setSearch({ ...search, text: e.target.value });
						}}
					/>
					<div className={s.checks}>
						{types.map((partOfSpeech) => (
							<div className={s.checksItem} key={partOfSpeech}>
								<div
									onClick={() => {
										const newSearchTypes = search.partsOfSpeech.includes(
											partOfSpeech
										)
											? search.partsOfSpeech.filter(
													(stype) => stype !== partOfSpeech
												)
											: [...search.partsOfSpeech, partOfSpeech];

										setSearch({ ...search, partsOfSpeech: newSearchTypes });
									}}
									className={clsx({
										[s.check]: true,
										[s.checkActive]:
											search.partsOfSpeech.includes(partOfSpeech),
									})}
								></div>

								<div className={s.type}>{partOfSpeech}</div>
							</div>
						))}
					</div>
				</div>

				<StarredList items={words} />
			</div>
		</div>
	);
};
