import React from "react";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.home}>
      <h1 className={style.title}>Стартовая страница!</h1>
      <p className={style.text}>Добро пожаловать!</p>
      <p className={style.text}>Выберете категорию</p>
    </div>
  );
};

export default Home;
