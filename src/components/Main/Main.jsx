import Layout from "../Layout";
import List from "./List";
import Tabs from "./Tabs";
import style from "./Main.module.css";
import { Route, Routes } from "react-router-dom";
import Modal from "../Modal";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { AuthUser } from "./AuthUser";

export const Main = () => {
  return (
    <main className={style.main}>
      <Layout>
        <Tabs />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth"} element={<AuthUser />} />

          <Route path={`/category/:page`} element={<List />}>
            <Route path={`/category/:page/post/:id`} element={<Modal />} />
          </Route>
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </Layout>
    </main>
  );
};
