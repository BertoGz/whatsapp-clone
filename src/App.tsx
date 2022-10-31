import "./App.css";
import { useQbSession } from "./Quickblox/useQbSession";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Containers/Login";
import Auth from "./Containers/Auth";
import { useFirebaseAutoLogin } from "./Hooks/useFirebaseAutoLogin";
import { useQbChat } from "./Quickblox/useQbChat";
import DebugMenu from "./Containers/DebugMenu";
const Hooks = () => {
  useFirebaseAutoLogin();
  useQbSession();
  useQbChat()
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
        <DebugMenu/>
        <Hooks />
      </BrowserRouter>
    </div>
  );
}

export default App;
