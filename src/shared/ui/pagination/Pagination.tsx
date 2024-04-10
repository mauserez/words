import { useState } from "react";
import { chunkByLimit } from "../../helpers/pagination";
import clsx from "clsx";
import s from "./Pagination.module.css";

type PaginationProps = {
	count: number;
	limit: number;
	handlePage?: (pageNumber: number) => void;
};
export const Pagination = (props: PaginationProps) => {
	const { count, limit, handlePage } = props;
	const pages = chunkByLimit(limit, count);
	const [currentPage, setCurentPage] = useState(1);

	return (
		<div className={s.pagination}>
			{pages?.map((pageNumber) => (
				<div
					onClick={() => {
						setCurentPage(pageNumber);

						if (handlePage) {
							handlePage(pageNumber);
						}
					}}
					className={clsx({
						[s.pageBtn]: true,
						[s.active]: pageNumber === currentPage,
					})}
					key={pageNumber}
				>
					{pageNumber}
				</div>
			))}
		</div>
	);
};
