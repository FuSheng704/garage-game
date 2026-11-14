import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import GasStationList from './GasStationList';

import Home from "./pages/Home";
import Login from "./pages/Login";
import PolicyPage from "./pages/PolicyPage";
import { lazy, Suspense } from "react";

const CandyPage = lazy(() => import("./pages/CandyPage"));

function App() {
  return (
    <Routes>
      {/* 登录 */}
      <Route
        path="/login"
        element={<Login />}
      />
      <Route path="/terms" element={<PolicyPage kind="terms" />} />
      <Route path="/privacy" element={<PolicyPage kind="privacy" />} />
      <Route path="/pit-signal" element={<GasStationList />} />

      <Route path="/candy" element={<Suspense fallback={null}><CandyPage /></Suspense>} />

      {/* 登录后主页 */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route path="/home" element={<Home />} />

      {/* 未匹配路由 */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;