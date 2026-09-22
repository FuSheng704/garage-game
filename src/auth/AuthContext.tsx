import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  getCurrentUserApi,
  loginApi,
  logoutApi,
  registerApi,
} from "../api/auth";

import {
  AUTH_UNAUTHORIZED_EVENT,
  clearAuthToken,
  hasAuthToken,
} from "../api/client";

import type {
  CurrentUser,
  LoginParams,
  RegisterParams,
} from "../types/auth";

interface AuthContextValue {
  /**
   * 当前用户信息
   */
  user: CurrentUser | null;

  /**
   * 是否已经登录
   */
  isAuthenticated: boolean;

  /**
   * 应用是否正在恢复登录状态
   */
  initializing: boolean;

  /**
   * 登录
   */
  login: (
    params: LoginParams
  ) => Promise<void>;

  /**
   * 注册
   */
  register: (
    params: RegisterParams
  ) => Promise<string>;

  /**
   * 退出
   */
  logout: () => Promise<void>;

  /**
   * 重新读取当前用户
   */
  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<CurrentUser | null>(
      null
    );

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(
    hasAuthToken()
  );

  const [
    initializing,
    setInitializing,
  ] = useState(true);

  /**
   * 获取当前用户
   */
  const refreshUser =
    useCallback(async () => {
      if (!hasAuthToken()) {
        setUser(null);

        setIsAuthenticated(false);

        return;
      }

      try {
        const currentUser =
          await getCurrentUserApi();

        setUser(currentUser);

        setIsAuthenticated(true);
      } catch (error) {
        /**
         * 如果是 401，
         * client.ts 已经自动清除 Token。
         */
        if (!hasAuthToken()) {
          setUser(null);

          setIsAuthenticated(false);
        }

        throw error;
      }
    }, []);

  /**
   * 登录
   */
  const login =
    useCallback(
      async (
        params: LoginParams
      ) => {
        await loginApi(params);

        setIsAuthenticated(true);

        /**
         * 登录完成之后尝试取得当前用户信息。
         *
         * 如果 /user/info 暂时异常，
         * 但 Token 仍然存在，
         * 不把已经成功的登录直接判定失败。
         */
        try {
          const currentUser =
            await getCurrentUserApi();

          setUser(currentUser);
        } catch (error) {
          if (!hasAuthToken()) {
            setIsAuthenticated(false);

            setUser(null);

            throw error;
          }

          setUser(null);
        }
      },
      []
    );

  /**
   * 注册
   */
  const register =
    useCallback(
      async (
        params: RegisterParams
      ) => {
        return registerApi(params);
      },
      []
    );

  /**
   * 退出登录
   */
  const logout =
    useCallback(async () => {
      try {
        await logoutApi();
      } finally {
        clearAuthToken();

        setUser(null);

        setIsAuthenticated(false);
      }
    }, []);

  /**
   * 首次加载应用：
   *
   * 如果之前有 Token，
   * 自动恢复登录状态。
   */
  useEffect(() => {
    let cancelled = false;

    async function initializeAuth() {
      if (!hasAuthToken()) {
        if (!cancelled) {
          setUser(null);

          setIsAuthenticated(false);

          setInitializing(false);
        }

        return;
      }

      try {
        const currentUser =
          await getCurrentUserApi();

        if (cancelled) {
          return;
        }

        setUser(currentUser);

        setIsAuthenticated(true);
      } catch {
        if (cancelled) {
          return;
        }

        /**
         * 网络错误不一定代表 Token 失效。
         *
         * 只有 401 时 client.ts
         * 才会真正清除 Token。
         */
        setIsAuthenticated(
          hasAuthToken()
        );

        setUser(null);
      } finally {
        if (!cancelled) {
          setInitializing(false);
        }
      }
    }

    initializeAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * 监听全局 401
   */
  useEffect(() => {
    function handleUnauthorized() {
      setUser(null);

      setIsAuthenticated(false);
    }

    window.addEventListener(
      AUTH_UNAUTHORIZED_EVENT,
      handleUnauthorized
    );

    return () => {
      window.removeEventListener(
        AUTH_UNAUTHORIZED_EVENT,
        handleUnauthorized
      );
    };
  }, []);

  const value =
    useMemo<AuthContextValue>(
      () => ({
        user,
        isAuthenticated,
        initializing,
        login,
        register,
        logout,
        refreshUser,
      }),
      [
        user,
        isAuthenticated,
        initializing,
        login,
        register,
        logout,
        refreshUser,
      ]
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 其他页面统一通过这个 Hook
 * 获取用户登录状态。
 */
export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth 必须在 AuthProvider 内使用"
    );
  }

  return context;
}