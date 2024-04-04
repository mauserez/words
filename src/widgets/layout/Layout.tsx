import { ReactNode } from "react";
import { Header } from "../header/Header";
import { Outlet } from "react-router-dom";

export type LayoutProps = {
  children?: ReactNode;
};
export const Layout = (props: LayoutProps) => {
  console.log(props);
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};
