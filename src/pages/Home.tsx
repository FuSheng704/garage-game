import {
  useState,
} from "react";

import { useAuth } from "../auth/AuthContext";

function getUsername(
  user: ReturnType<
    typeof useAuth
  >["user"]
) {
  if (!user) {
    return "已登录用户";
  }

  if (
    typeof user === "string"
  ) {
    return user;
  }

  if (
    typeof user.username ===
    "string"
  ) {
    return user.username;
  }

  return "已登录用户";
}

export default function Home() {
  const {
    user,
    logout,
    refreshUser,
  } = useAuth();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const username =
    getUsername(user);

  const handleRefreshUser =
    async () => {
      setLoading(true);

      setMessage("");

      try {
        await refreshUser();

        setMessage(
          "用户信息已更新"
        );
      } catch (error) {
        if (
          error instanceof Error
        ) {
          setMessage(
            error.message
          );
        }
      } finally {
        setLoading(false);
      }
    };

  const handleLogout =
    async () => {
      setLoading(true);

      try {
        await logout();
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              萧与逸之恋
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              项目主页
            </p>
          </div>

          <button
            type="button"
            disabled={
              loading
            }
            onClick={
              handleLogout
            }
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            退出登录
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-slate-500">
            当前用户
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {username}
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            当前用户信息由统一的
            AuthContext 管理，来源于
            /user/info 接口。
          </p>

          <button
            type="button"
            disabled={
              loading
            }
            onClick={
              handleRefreshUser
            }
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            刷新当前用户
          </button>

          {message && (
            <p className="mt-4 text-sm text-slate-600">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}