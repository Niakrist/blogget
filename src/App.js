import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { AuthContextProvider } from "./context/authContext";
import { PostsContextProvider } from "./context/postsContext";
import { useDispatch } from "react-redux";
import { actionUpdateToken } from "./store/tokenReducer";
import { getToken } from "./api/token";

function App() {
  const dispatch = useDispatch();
  dispatch(actionUpdateToken(getToken()));
  return (
    <AuthContextProvider>
      <PostsContextProvider>
        <Header />
        <Main />
      </PostsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
