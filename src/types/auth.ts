
/**
 * src/types/auth.ts
 * 登录、注册、密保、用户资料相关类型定义
 */

export type GameUID = string;

export interface LoginParams {
  username: GameUID;
  password: string;
  captcha_key: string;
  captcha_code: string;
}

export interface SecurityQuestionAnswer {
  question: string;
  answer: string;
}

export type SecurityQuestions = [
  SecurityQuestionAnswer,
  SecurityQuestionAnswer,
  SecurityQuestionAnswer
];


/**
 * 验证密保答案的请求参数
 * POST /user/verify_security_answer
 */
export interface VerifySecurityParams {
  uid: GameUID;
  q1_ans: string;
  q2_ans: string;
  q3_ans: string;
}

/**
 * 密保验证成功后返回的临时凭证
 * 有效期 5 分钟，仅能使用一次
 */
export interface VerifySecurityResponse {
  reset_token: string;
}

/**
 * 凭临时凭证重置密码
 * POST /user/reset_pwd_by_security
 */
 export interface ResetPasswordParams {
  reset_token: string;
  new_password: string;
}


export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface CaptchaData {
  captcha_key: string;
  imageUrl: string;
}

export interface BirthdayValue {
  month: number;
  day: number;
}

export interface ProfileSetupParams {
  nickname: string;
  birthday: BirthdayValue;
}

export type CurrentUser =
  | string
  | {
      username?: string;
      uid?: string;
      nickname?: string;
      birthday?: string | null;
      profile_finished?: boolean;
      profile_completed?: boolean;
      [key: string]: unknown;
    };

export type SecurityQuestionTexts = [
  string,
  string,
  string
];

export type AuthMode =
  | "login"
  | "register"
  | "guest";

export type RegisterStep = 1 | 2;

export type AuthDialogType =
  | "login-success"
  | "login-error"
  | "register-step-success"
  | "register-step-error"
  | "register-success"
  | "register-error"
  | "profile-success"
  | "profile-error"
  | "guest-success";

export interface ValidationErrorItem {
  loc: Array<string | number>;
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface HTTPValidationError {
  detail?: string | ValidationErrorItem[];
}
/**
 * 找回密码时，后端返回的三道密保问题原文。
 * 不包含密保答案。
 */

/**
 * 注册参数
 * 包含 UID、密码及三道密保问题
 */
export interface RegisterParams {
  username: GameUID;
  password: string;
  securityQuestions: SecurityQuestions;
}
