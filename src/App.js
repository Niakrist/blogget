import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { useToken } from "./api/hooks/useToken";

function App() {
  const [token] = useToken();

  if (!token) {
    return <div>Ждем</div>;
  }

  return (
    <>
      <Header token={token} />
      <Main />
    </>
  );
}

export default App;
