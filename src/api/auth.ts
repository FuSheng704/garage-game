import {
  apiRequest,
  clearAuthToken,
  setAuthToken,
} from "./client";

import type {
  CurrentUser,
  LoginParams,
  RegisterParams,
  TokenResponse,
} from "../types/auth";

/**
 * ================================
 * 用户注册
 * POST /baseUrl/register
 * ================================
 */
export async function registerApi(
  params: RegisterParams
): Promise<string> {
  return apiRequest<string>(
    "/register",
    {
      method: "POST",

      /**
       * 注册不需要登录 Token
       */
      auth: false,

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        username:
          params.username,

        password:
          params.password,
      }),

      responseType: "auto",
    }
  );
}

/**
 * ================================
 * 用户登录
 * POST /baseUrl/login
 * ================================
 */
export async function loginApi(
  params: LoginParams
): Promise<TokenResponse> {
  /**
   * FastAPI OAuth2PasswordRequestForm
   * 要求使用
   * application/x-www-form-urlencoded
   */
  const body =
    new URLSearchParams();

  body.append(
    "grant_type",
    "password"
  );

  body.append(
    "username",
    params.username
  );

  body.append(
    "password",
    params.password
  );

  body.append(
    "scope",
    ""
  );

  body.append(
    "client_id",
    ""
  );

  body.append(
    "client_secret",
    ""
  );

  const data =
    await apiRequest<TokenResponse>(
      "/login",
      {
        method: "POST",

        /**
         * 登录时还没有 Token
         */
        auth: false,

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body,

        responseType: "json",
      }
    );

  /**
   * 登录成功：
   * 保存 JWT
   */
  setAuthToken(
    data.access_token,
    data.token_type ||
      "Bearer"
  );

  return data;
}

/**
 * ================================
 * 获取当前用户
 * GET /baseUrl/user/info
 * ================================
 */
export async function getCurrentUserApi():
  Promise<CurrentUser> {
  return apiRequest<CurrentUser>(
    "/user/info",
    {
      method: "GET",

      /**
       * 默认 auth = true，
       * client.ts 会自动添加：
       *
       * Authorization:
       * Bearer xxxxx
       */
      responseType: "auto",
    }
  );
}

/**
 * ================================
 * 用户退出
 * POST /baseUrl/logout
 * ================================
 */
export async function logoutApi():
  Promise<void> {
  try {
    await apiRequest<unknown>(
      "/logout",
      {
        method: "POST",

        /**
         * 自动携带当前 Token
         */
        responseType: "auto",
      }
    );
  } finally {
    /**
     * 无论服务器返回什么，
     * 用户主动点击退出后，
     * 前端本地登录状态都清除。
     */
    clearAuthToken();
  }
}