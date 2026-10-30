
/**
 * src/auth/AuthContext.tsx
 *
 * 全局登录状态管理
 *
 * 核心规则：
 * 1. 登录成功后保存 Token。
 * 2. 自动请求 /user/info 获取用户资料。
 * 3. profile_finished 仅用于完善资料提示。
 * 4. 未完善资料的用户与已完善资料的用户权限相同。
 * 5. 刷新页面时自动恢复登录状态。
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";

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

/**
 * 判断用户资料是否完善。
 *
 * 优先使用后端 profile_finished 字段。
 * 如果后端没有返回该字段，
 * 则根据 nickname 是否为空进行判断。
 *
 * 注意：
 * 这个结果不参与用户权限控制。
 */
function checkProfileFinished(
  user: CurrentUser | null
): boolean {
  if (!user) {
    return false;
  }

  if (typeof user === "string") {
    return false;
  }

  if (
    typeof user.profile_finished === "boolean"
  ) {
    return user.profile_finished;
  }

  if (
    typeof user.nickname === "string"
  ) {
    return user.nickname.trim().length > 0;
  }

  return false;
}

/**
 * AuthContext 对外提供的数据和方法
 */
interface AuthContextValue {
  /**
   * 当前用户信息
   */
  user: CurrentUser | null;

  /**
   * 是否已经登录。
   *
   * 只取决于登录 Token 是否有效，
   * 不取决于个人资料是否完善。
   */
  isAuthenticated: boolean;

  /**
   * 是否正在恢复登录状态
   */
  initializing: boolean;

  /**
   * 当前用户资料是否完善
   */
  profileFinished: boolean;

  /**
   * 登录
   */
  login: (
  params: LoginParams,
  remember?: boolean
) => Promise<CurrentUser | null>;

  /**
   * 注册
   *
   * 注册成功不自动登录。
   */
  register: (
    params: RegisterParams
  ) => Promise<string>;

  /**
   * 退出登录
   */
  logout: () => Promise<void>;

  /**
   * 重新获取当前用户资料
   */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  /**
   * 当前用户资料
   */
  const [user, setUser] =
    useState<CurrentUser | null>(null);

  /**
   * 是否已经登录
   *
   * 初始化时读取本地 Token，
   * 不检查 profile_finished。
   */
  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState<boolean>(() =>
    hasAuthToken()
  );

  /**
   * 是否正在恢复登录状态
   */
  const [
    initializing,
    setInitializing,
  ] = useState<boolean>(true);

  /**
   * 当前用户资料是否完善
   *
   * 只用于页面提示和导航，
   * 不参与权限判断。
   */
  const profileFinished = useMemo(
    () => checkProfileFinished(user),
    [user]
  );

  /**
   * 重新读取当前用户资料
   *
   * GET /user/info
   */
  const refreshUser = useCallback(
    async (): Promise<void> => {
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
         * 只有 Token 确实被清除时，
         * 才将用户标记为未登录。
         *
         * 普通网络错误不应直接退出登录。
         */
        if (!hasAuthToken()) {
          setUser(null);
          setIsAuthenticated(false);
        }

        throw error;
      }
    },
    []
  );

  /**
   * 用户登录
   *
   * 1. 调用 /login。
   * 2. 保存 Token。
   * 3. 调用 /user/info。
   * 4. 保存当前用户资料。
   *
   * 不根据 profile_finished 限制权限。
   */
  
const login = useCallback(
  async (
    params: LoginParams,
    remember = false
  ): Promise<CurrentUser | null> => {
    // 1. 登录并保存 Token
    await loginApi(params, remember);

    // 清除上一个账号可能残留的资料
    setUser(null);
    setIsAuthenticated(true);

    try {
      // 2. 获取本次登录用户的资料
      const currentUser = await getCurrentUserApi();

      // 3. 更新全局状态
      setUser(currentUser);
      setIsAuthenticated(true);

      // 4. 直接返回本次登录的用户资料
      return currentUser;
    } catch (error) {
      // Token 确实失效，登录不能视为成功
      if (!hasAuthToken()) {
        setUser(null);
        setIsAuthenticated(false);
        throw error;
      }

      // 仅用户资料请求失败，保留有效登录状态
      setUser(null);
      setIsAuthenticated(true);

      // null 表示资料暂时未知，而不是未完善
      return null;
    }
  },
  []
);


  /**
   * 用户注册
   *
   * 注册成功后不自动登录，
   * 也不调用 /user/info。
   *
   * 页面负责跳转回登录界面。
   */
  const register = useCallback(
    async (
      params: RegisterParams
    ): Promise<string> => {
      return registerApi(params);
    },
    []
  );

  /**
   * 退出登录
   */
  const logout = useCallback(
    async (): Promise<void> => {
      try {
        await logoutApi();
      } finally {
        clearAuthToken();
        setUser(null);
        setIsAuthenticated(false);
      }
    },
    []
  );

  /**
   * 应用首次加载：
   *
   * 如果本地存在 Token，
   * 自动获取用户资料并恢复登录状态。
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
         * 网络异常不等于登录失效。
         *
         * 只有 client.ts 清除 Token 后，
         * 才会认为用户已经退出登录。
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

    void initializeAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * 监听全局 401 未授权事件。
   *
   * Token 失效时同步清除登录状态。
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

  /**
   * 统一提供给其他页面使用
   */
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      initializing,
      profileFinished,
      login,
      register,
      logout,
      refreshUser,
    }),
    [
      user,
      isAuthenticated,
      initializing,
      profileFinished,
      login,
      register,
      logout,
      refreshUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * 其他页面统一使用此 Hook
 * 获取用户登录状态及资料。
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth 必须在 AuthProvider 内使用"
    );
  }

  return context;
}
