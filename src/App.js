import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { PostsContextProvider } from "./context/postsContext";
import { useDispatch } from "react-redux";
import { actionUpdateToken } from "./store/tokenReducer";
import { getToken } from "./api/token";

function App() {
  const dispatch = useDispatch();
  dispatch(actionUpdateToken(getToken()));

  return (
    <PostsContextProvider>
      <Header />
      <Main />
    </PostsContextProvider>
  );
}

export default App;
