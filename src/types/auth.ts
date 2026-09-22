/**
 * 注册参数
 */
export interface RegisterParams {
  username: string;
  password: string;
}

/**
 * 登录参数
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 登录成功返回
 */
export interface TokenResponse {
  access_token: string;
  token_type: string;
}

/**
 * FastAPI 参数校验错误
 */
export interface ValidationErrorItem {
  loc: Array<
    string | number
  >;

  msg: string;

  type: string;

  input?: unknown;

  ctx?: Record<
    string,
    unknown
  >;
}

/**
 * FastAPI 422
 */
export interface HTTPValidationError {
  detail?:
    | string
    | ValidationErrorItem[];
}

/**
 * 当前用户
 *
 * 由于当前接口文档没有明确给出
 * /user/info 的完整用户对象结构，
 * 这里暂时使用兼容类型。
 */
export type CurrentUser =
  | string
  | {
      username?: string;

      [key: string]:
        unknown;
    };