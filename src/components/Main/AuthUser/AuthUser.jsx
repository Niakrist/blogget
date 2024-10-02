import React from "react";

import style from "./AuthUser.module.css";
import { useAuth } from "../../../api/hooks/useAuth";
import { Preloader } from "../../../ui/Preloader";

const AuthUser = () => {
  const [auth, loading] = useAuth();
  return (
    <div className={style.authUser}>
      {loading ? (
        <Preloader size="100px" />
      ) : (
        <h1>Добро пожаловать {auth.name}</h1>
      )}
    </div>
  );
};

export default AuthUser;
