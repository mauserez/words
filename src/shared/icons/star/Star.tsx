import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { IconBaseProps } from "react-icons";
import s from "./Star.module.css";
import clsx from "clsx";

type StarProps = IconBaseProps & { active?: boolean };
export const Star = (props: StarProps) => {
	const {
		color = "81bef5",
		className = "",
		active = false,
		...otherProps
	} = props;
	const Components = { IoIosStar, IoIosStarOutline };
	const DynamicStar = active
		? Components["IoIosStar"]
		: Components["IoIosStarOutline"];

	return (
		<DynamicStar
			className={clsx(s.star, className)}
			color={color}
			{...otherProps}
		/>
	);
};
