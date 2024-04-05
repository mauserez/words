import { useState } from "react";

import { useAppSelector } from "../../../shared/redux/hooks";
import {
	SearchWordPayload,
	selectWordTypes,
	selectWords,
} from "../../../shared/redux/slices/words/wordsSlice";

import { Input } from "../../../shared/input/Input";
import { StarredList } from "../../../entities/starred-words";

import clsx from "clsx";
import style from "../style.module.css";
import s from "./StarredWords.module.css";

export const StarredWords = () => {
	const [search, setSearch] = useState<SearchWordPayload>({
		text: "",
		types: [],
	});

	const types = useAppSelector((state) => selectWordTypes(state));
	const words = useAppSelector((state) => selectWords(state, search));

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
						{types.map((type) => (
							<div className={s.checksItem} key={type}>
								<div
									onClick={() => {
										const newSearchTypes = search.types.includes(type)
											? search.types.filter((stype) => stype !== type)
											: [...search.types, type];

										setSearch({ ...search, types: newSearchTypes });
									}}
									className={clsx({
										[s.check]: true,
										[s.checkActive]: search.types.includes(type),
									})}
								></div>

								<div className={s.type}>{type}</div>
							</div>
						))}
					</div>
				</div>

				<StarredList items={words} />
			</div>
		</div>
	);
};
