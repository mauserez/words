import { ComponentProps } from "react";

import clsx from "clsx";
import s from "./Input.module.css";

type InputProps = ComponentProps<"input">;
export const Input = (props: InputProps) => {
	const { className = "", placeholder = "Поиск" } = props;

	return (
		<input
			style={{ fontFamily: "Arial, FontAwesome" }}
			placeholder={placeholder}
			className={clsx(s.input, className)}
			{...props}
		/>
	);
};
