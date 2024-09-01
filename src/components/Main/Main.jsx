import Layout from "../Layout";
import List from "./List";
import Tabs from "./Tabs";
import style from "./Main.module.css";

export const Main = () => {
  return (
    <main className={style.main}>
      <Layout>
        <Tabs />
        <List />
      </Layout>
    </main>
  );
};
