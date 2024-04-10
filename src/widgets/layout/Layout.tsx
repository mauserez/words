import { Header } from "../header/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<div className="App fadeIn">
			<Header />
			<Outlet />
		</div>
	);
};
