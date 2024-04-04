import { IoIosStar } from "react-icons/io";
import { IconBaseProps } from "react-icons";
import s from "./Star.module.css";
import clsx from "clsx";

export const Star = (props: IconBaseProps) => {
  const { color = "81bef5", className = "", ...otherProps } = props;
  return (
    <IoIosStar
      className={clsx(s.star, className)}
      color={color}
      {...otherProps}
    />
  );
};
