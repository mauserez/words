import { ComponentProps } from "react";
import clsx from "clsx";
import s from "./Select.module.css";

type SelectProps = ComponentProps<"select"> & {
	label?: string;
	width?: string;
};

export const Select = (props: SelectProps) => {
	const { className, children, width = "", label = "", ...selectProps } = props;

	return (
		<div>
			{label ? <label className={s.label}>{label}</label> : null}
			<select
				style={{ width: width }}
				className={clsx(s.select, className)}
				{...selectProps}
			>
				{children}
			</select>
		</div>
	);
};
