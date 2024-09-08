import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { TokenContextProvider } from "./context/tokenContext";
import { AuthContextProvider } from "./context/authContext";
import { useBestPosts } from "./api/hooks/useBestPosts";

function App() {
  const bestPosts = useBestPosts();
  console.log("bestPostsAPP: ", bestPosts);

  return (
    <TokenContextProvider>
      <AuthContextProvider>
        <Header />
        <Main />
      </AuthContextProvider>
    </TokenContextProvider>
  );
}

export default App;
