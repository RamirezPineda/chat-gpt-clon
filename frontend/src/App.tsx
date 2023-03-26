import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";

import { store } from "./redux/store";
import { Loading } from "./pages";
import Authenticate from "./guards/Authenticate";

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat/Chat"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Authenticate />}>
              <Route element={<Dashboard />}>
                <Route path="/chat" element={<Chat />} />
              </Route>
            </Route>
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Suspense>
  );
}

export default App;
