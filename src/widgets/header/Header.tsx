import { Star } from "../../shared/icons";
import { Link } from "react-router-dom";

import s from "./Header.module.css";

export const Header = () => {
	return (
		<header className={s.header}>
			<Link to={""}>
				<span>Word Keeper</span>
			</Link>
			<Link to={"/starred"}>
				<span>
					<Star active color="#fff" /> Starred Word
				</span>
			</Link>
		</header>
	);
};
