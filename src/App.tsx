import "./App.css";
import { useQbSession } from "./Quickblox/useQbSession";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Containers/Login";
import Auth from "./Containers/Auth";
import { useAutoLogin } from "./Hooks/useAutoLogin";
const Hooks = () => {
  useQbSession();
  useAutoLogin();
  return <></>;
};
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<Auth />} />
        </Routes>
        <Hooks />
      </BrowserRouter>
    </div>
  );
}

export default App;
