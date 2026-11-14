import { useLocation, useNavigate } from "react-router-dom";
import ArchivePage from "../../osborn-archive/src/ArchivePage";
import { configureCandyApi } from "../../osborn-archive/src/candy-runtime";
import { getAccessToken, clearAuthToken, AUTH_UNAUTHORIZED_EVENT } from "../api/client";
import { buildLoginPath } from "../auth/navigation";

configureCandyApi({ getToken: getAccessToken, baseUrl: "/api" });

export default function CandyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  function login() {
    if (getAccessToken()) {
      clearAuthToken();
      window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
    }
    navigate(buildLoginPath({ pathname: location.pathname, search: "?archive=1", hash: location.hash }));
  }
  return <div className="garage-candy"><ArchivePage initialOpen={new URLSearchParams(location.search).get("archive") === "1"} onBack={() => navigate("/home")} onLoginRequired={login} /></div>;
}
