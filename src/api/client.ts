const API_BASE = import.meta.env.VITE_API_BASE_URL
  ?.trim()
  .replace(/\/$/, "");

const ACCESS_TOKEN_KEY = "access_token";
const TOKEN_TYPE_KEY = "token_type";

/**
 * 当任何接口返回 401 时，
 * 用这个事件通知 AuthContext 登录状态已经失效。
 */
export const AUTH_UNAUTHORIZED_EVENT =
  "auth:unauthorized";

/**
 * 统一接口错误类型
 */
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * 保存 Token
 */
export function setAuthToken(
  accessToken: string,
  tokenType = "Bearer"
) {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    accessToken
  );

  localStorage.setItem(
    TOKEN_TYPE_KEY,
    tokenType || "Bearer"
  );
}

/**
 * 获取 access_token
 */
export function getAccessToken():
  | string
  | null {
  return localStorage.getItem(
    ACCESS_TOKEN_KEY
  );
}

/**
 * 获取 token_type
 */
export function getTokenType(): string {
  return (
    localStorage.getItem(
      TOKEN_TYPE_KEY
    ) || "Bearer"
  );
}

/**
 * 判断本地是否存在 Token
 */
export function hasAuthToken(): boolean {
  return Boolean(
    getAccessToken()
  );
}

/**
 * 清除登录信息
 */
export function clearAuthToken() {
  localStorage.removeItem(
    ACCESS_TOKEN_KEY
  );

  localStorage.removeItem(
    TOKEN_TYPE_KEY
  );
}

/**
 * 获取 Authorization 请求头
 *
 * 例如：
 * Bearer eyJhbGciOi...
 */
export function getAuthorizationHeader():
  | string
  | null {
  const token =
    getAccessToken();

  if (!token) {
    return null;
  }

  return `${getTokenType()} ${token}`;
}

type ResponseType =
  | "json"
  | "text"
  | "auto";

export interface ApiRequestOptions
  extends RequestInit {
  /**
   * 是否携带 Token
   *
   * 默认 true
   */
  auth?: boolean;

  /**
   * 返回数据解析方式
   */
  responseType?: ResponseType;
}

/**
 * 从后端返回值中提取错误信息
 */
function extractErrorMessage(
  data: unknown
): string | null {
  if (typeof data === "string") {
    return data;
  }

  if (
    !data ||
    typeof data !== "object"
  ) {
    return null;
  }

  const object =
    data as Record<
      string,
      unknown
    >;

  /**
   * FastAPI 普通错误：
   *
   * {
   *   detail: "用户名或密码错误"
   * }
   */
  if (
    typeof object.detail ===
    "string"
  ) {
    return object.detail;
  }

  /**
   * FastAPI 422 校验错误：
   *
   * {
   *   detail: [
   *     {
   *       msg: "Field required"
   *     }
   *   ]
   * }
   */
  if (
    Array.isArray(
      object.detail
    )
  ) {
    const messages =
      object.detail
        .map((item) => {
          if (
            item &&
            typeof item ===
              "object" &&
            "msg" in item
          ) {
            const msg = (
              item as {
                msg?: unknown;
              }
            ).msg;

            return typeof msg ===
              "string"
              ? msg
              : "";
          }

          return "";
        })
        .filter(Boolean);

    if (
      messages.length > 0
    ) {
      return messages.join(
        "；"
      );
    }
  }

  /**
   * 兼容某些后端：
   *
   * {
   *   message: "..."
   * }
   */
  if (
    typeof object.message ===
    "string"
  ) {
    return object.message;
  }

  return null;
}

/**
 * 统一解析 Response
 */
async function parseResponse(
  response: Response,
  responseType: ResponseType
): Promise<unknown> {
  /**
   * 无返回内容
   */
  if (
    response.status === 204
  ) {
    return undefined;
  }

  const text =
    await response.text();

  if (!text) {
    return undefined;
  }

  /**
   * 明确要求文本
   */
  if (
    responseType === "text"
  ) {
    return text;
  }

  /**
   * 明确要求 JSON
   */
  if (
    responseType === "json"
  ) {
    try {
      return JSON.parse(text);
    } catch {
      throw new ApiError(
        "服务器返回的数据格式不正确。",
        response.status,
        text
      );
    }
  }

  /**
   * auto：
   * 自动判断 JSON / 文本
   */
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  /**
   * 有些后端虽然返回 JSON，
   * 但 Content-Type 设置不规范，
   * 所以这里再次尝试 JSON.parse。
   */
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * 全项目统一请求入口
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  /**
   * 没有配置服务器地址
   */
  if (!API_BASE) {
    throw new ApiError(
      "暂未配置后端接口地址，请检查 .env 中的 VITE_API_BASE_URL。",
      0
    );
  }

  const {
    auth = true,
    responseType = "auto",
    ...fetchOptions
  } = options;

  const headers =
    new Headers(
      fetchOptions.headers
    );

  /**
   * 自动携带 JWT
   */
  if (auth) {
    const authorization =
      getAuthorizationHeader();

    if (authorization) {
      headers.set(
        "Authorization",
        authorization
      );
    }
  }

  let response: Response;

  try {
    response = await fetch(
      `${API_BASE}${path}`,
      {
        ...fetchOptions,
        headers,
      }
    );
  } catch {
    /**
     * 常见原因：
     * 1. 后端没启动
     * 2. IP/端口错误
     * 3. CORS
     * 4. 网络无法访问
     */
    throw new ApiError(
      "无法连接服务器，请检查后端地址、网络连接或跨域配置。",
      0
    );
  }

  const data =
    await parseResponse(
      response,
      responseType
    );

  /**
   * Token 失效
   */
  if (
    response.status === 401
  ) {
    clearAuthToken();

    window.dispatchEvent(
      new Event(
        AUTH_UNAUTHORIZED_EVENT
      )
    );
  }

  /**
   * 其他非成功状态
   */
  if (!response.ok) {
    const message =
      extractErrorMessage(
        data
      ) ||
      `请求失败：${response.status}`;

    throw new ApiError(
      message,
      response.status,
      data
    );
  }

  return data as T;
}