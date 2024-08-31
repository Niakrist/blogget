import { Layout } from "../Layout/Layout";
import Auth from "./Auth";
import style from "./Header.module.css";
import Logo from "./Logo";
import Search from "./Search";

export const Header = () => {
  return (
    <header className={style.header}>
      <Layout>
        <div className={style.gridContainer}>
          <Logo />
          <h1>Заголовок</h1>
          <Search />
          <Auth auth="Maxim" />
        </div>
      </Layout>
    </header>
  );
};
