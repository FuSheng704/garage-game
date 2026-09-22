import {
  useState,
} from "react";

import type {
  SyntheticEvent,
} from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

type Mode =
  | "login"
  | "register";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export default function Login() {
  const {
    login,
    register,
    isAuthenticated,
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [mode, setMode] =
    useState<Mode>("login");

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    isError,
    setIsError,
  ] = useState(false);

  /**
   * 已经登录时，
   * 不需要继续停留在登录页面。
   */
  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");

    setIsError(false);

    const cleanUsername =
      username.trim();

    if (!cleanUsername) {
      setMessage(
        "请输入用户名"
      );

      setIsError(true);

      return;
    }

    if (!password.trim()) {
      setMessage(
        "请输入密码"
      );

      setIsError(true);

      return;
    }

    setLoading(true);

    try {
      /**
       * 登录
       */
      if (mode === "login") {
        await login({
          username:
            cleanUsername,

          password,
        });

        const state =
          location.state as
            | LocationState
            | null;

        const target =
          state?.from?.pathname ||
          "/";

        navigate(
          target,
          {
            replace: true,
          }
        );

        return;
      }

      /**
       * 注册
       */
      await register({
        username:
          cleanUsername,

        password,
      });

      setMode("login");

      setPassword("");

      setMessage(
        "注册成功，请使用新账号登录"
      );

      setIsError(false);
    } catch (error) {
      setIsError(true);

      if (
        error instanceof Error
      ) {
        setMessage(
          error.message
        );
      } else {
        setMessage(
          "请求失败，请稍后再试"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (
    nextMode: Mode
  ) => {
    setMode(nextMode);

    setMessage("");

    setIsError(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-200">
            萧
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            萧与逸之恋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {mode === "login"
              ? "欢迎回来，请登录你的账户"
              : "创建一个新的账户"}
          </p>
        </div>

        {/* 登录卡片 */}
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
          {/* 登录 / 注册 */}
          <div className="mb-7 flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() =>
                changeMode(
                  "login"
                )
              }
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                mode === "login"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              登录
            </button>

            <button
              type="button"
              onClick={() =>
                changeMode(
                  "register"
                )
              }
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                mode ===
                "register"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              注册
            </button>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            {/* 用户名 */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                用户名
              </label>

              <input
                id="username"
                type="text"
                value={
                  username
                }
                onChange={(
                  event
                ) =>
                  setUsername(
                    event.target
                      .value
                  )
                }
                disabled={
                  loading
                }
                autoComplete="username"
                placeholder="请输入用户名"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* 密码 */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                密码
              </label>

              <input
                id="password"
                type="password"
                value={
                  password
                }
                onChange={(
                  event
                ) =>
                  setPassword(
                    event.target
                      .value
                  )
                }
                disabled={
                  loading
                }
                autoComplete={
                  mode ===
                  "login"
                    ? "current-password"
                    : "new-password"
                }
                placeholder="请输入密码"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* 状态提示 */}
            {message && (
              <div
                className={`rounded-xl px-4 py-3 text-sm ${
                  isError
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {
                  message
                }
              </div>
            )}

            {/* 提交 */}
            <button
              type="submit"
              disabled={
                loading
              }
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? mode ===
                  "login"
                  ? "正在登录..."
                  : "正在注册..."
                : mode ===
                    "login"
                  ? "登录"
                  : "注册"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          OAuth2 · JWT Authentication
        </p>
      </div>
    </div>
  );
}