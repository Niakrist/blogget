import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { PostsContextProvider } from "./context/postsContext";
import { useDispatch } from "react-redux";
import { actionUpdateToken } from "./store/tokenReducer";
import { getToken } from "./api/token";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Main/Home";

function App() {
  const dispatch = useDispatch();
  dispatch(actionUpdateToken(getToken()));

  return (
    <PostsContextProvider>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />
      </Routes>
    </PostsContextProvider>
  );
}

export default App;
