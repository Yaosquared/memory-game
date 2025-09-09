import Home from "./pages/Home";
import "./styles/app.scss";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
