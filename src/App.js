import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { TokenContextProvider } from "./context/delete_tokenContext";
import { AuthContextProvider } from "./context/authContext";
import { PostsContextProvider } from "./context/postsContext";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <TokenContextProvider>
        <AuthContextProvider>
          <PostsContextProvider>
            <Header />
            <Main />
          </PostsContextProvider>
        </AuthContextProvider>
      </TokenContextProvider>
    </Provider>
  );
}

export default App;
