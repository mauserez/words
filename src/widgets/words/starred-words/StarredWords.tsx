import { useAppSelector } from "../../../shared/redux/hooks";
import {
  SearchWordPayload,
  selectWords,
} from "../../../shared/redux/slices/words/wordsSlice";
import { useState } from "react";

import { Input } from "../../../shared/input/Input";
import { StarredList } from "../../../entities/starred-words/starred-list/StarredList";

import s from "../style.module.css";

export const StarredWords = () => {
  const [search, setSearch] = useState<SearchWordPayload>({
    text: "",
    type: "",
  });

  const words = useAppSelector((state) => selectWords(state, search));

  return (
    <div>
      <h1>Starred Words</h1>
      <div className={s.container}>
        <div className={s.searchContainer}>
          <Input
            onChange={(e) => {
              setSearch({ ...search, text: e.target.value });
            }}
          />
        </div>
        <StarredList items={words} />
      </div>
    </div>
  );
};
