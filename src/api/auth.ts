
/**
 * src/api/auth.ts
 *
 * 登录、注册、验证码、密保、用户资料相关接口
 */

import {
  apiRequest,
  setAuthToken,
  ApiError,
} from "./client";

import type {
  BirthdayValue,
  CaptchaData,
  CurrentUser,
  LoginParams,
  ProfileSetupParams,
  RegisterParams,
  ResetPasswordParams,
  SecurityQuestionTexts,
  TokenResponse,
  VerifySecurityParams,
  VerifySecurityResponse,
} from "../types/auth";

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

/**
 * UID 必须是 7 位数字
 */
function validateUID(uid: string): void {
  if (!/^\d{7}$/.test(uid)) {
    throw new Error("游戏 UID 必须为 7 位数字");
  }
}

/**
 * 密码至少 8 位，同时包含字母和数字
 */
function validatePassword(password: string): void {
  if (
    password.length < 8 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    throw new Error(
      "密码至少 8 位，且必须同时包含英文字母和数字"
    );
  }
}

/**
 * 用户注册
 *
 * POST /register
 *
 * 后端要求提交完整密保问题文字及答案，
 * 不使用 question_id。
 *
 * 注册成功不会自动登录，也不返回 Token。
 */
export async function registerApi(
  params: RegisterParams
): Promise<string> {
  validateUID(params.username);
  validatePassword(params.password);

  const [first, second, third] =
    params.securityQuestions;

  for (const item of [first, second, third]) {
    if (
      !item.question.trim() ||
      !item.answer.trim()
    ) {
      throw new Error(
        "请完善三道密保问题及答案"
      );
    }
  }

  return apiRequest<string>("/register", {
    method: "POST",
    auth: false,
    headers: JSON_HEADERS,
    body: JSON.stringify({
      uid: params.username,
      password: params.password,

      q1: first.question.trim(),
      a1: first.answer.trim(),

      q2: second.question.trim(),
      a2: second.answer.trim(),

      q3: third.question.trim(),
      a3: third.answer.trim(),
    }),
    responseType: "auto",
  });
}

/**
 * 用户登录
 *
 * POST /login
 *
 * 登录成功后保存 Token。
 * /user/info 由 AuthContext 负责获取。
 */
export async function loginApi(
  params: LoginParams,
  remember = false,
  isCurrent: () => boolean = () => true
): Promise<TokenResponse> {
  validateUID(params.username);

  if (!params.password) {
    throw new Error("请输入密码");
  }

  if (
    !params.captcha_key.trim() ||
    !params.captcha_code.trim()
  ) {
    throw new Error("请填写图形验证码");
  }

  const data = await apiRequest<TokenResponse>(
    "/login",
    {
      method: "POST",
      auth: false,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        uid: params.username,
        password: params.password,
        captcha_key: params.captcha_key,
        captcha_code: params.captcha_code,
      }),
      responseType: "json",
    }
  );

  if (!data?.access_token) {
    throw new Error(
      "登录成功，但服务器未返回 Token"
    );
  }

  if (!isCurrent()) throw new Error("登录请求已失效");
  setAuthToken(
    data.access_token,
    data.token_type || "Bearer",
    remember
  );

  return data;
}

/**
 * 获取图形验证码
 *
 * GET /captcha/image
 *
 * 后端返回：
 * Body：image/png 图片二进制流
 * Header：X-CaptchaKey
 *
 * 注意：
 * 跨域时，后端需要配置：
 * Access-Control-Expose-Headers: X-CaptchaKey
 */
export async function getCaptchaApi():
  Promise<CaptchaData> {
  const base = import.meta.env
    .VITE_API_BASE_URL
    ?.trim()
    .replace(/\/$/, "");

  if (!base) {
    throw new ApiError(
      "未配置后端接口地址 VITE_API_BASE_URL",
      0
    );
  }

  let response: Response;

  try {
    response = await fetch(
      `${base}/captcha/image`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
  } catch {
    throw new ApiError(
      "验证码加载失败，请检查网络连接",
      0
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `验证码加载失败：${response.status}`,
      response.status
    );
  }

  const captchaKey =
    response.headers.get("X-CaptchaKey") ??
    response.headers.get("Xcaptchakey");

  if (!captchaKey?.trim()) {
    throw new Error(
      "验证码图片已返回，但无法读取 X-CaptchaKey。请检查后端响应头及 CORS 暴露配置。"
    );
  }

  const contentType =
    response.headers.get("Content-Type") ||
    "";

  if (
    !contentType.toLowerCase()
      .startsWith("image/png")
  ) {
    throw new Error(
      "验证码接口未返回 PNG 图片流"
    );
  }

  const blob = await response.blob();

  if (blob.size === 0) {
    throw new Error("验证码图片内容为空");
  }

  return {
    captcha_key: captchaKey.trim(),
    imageUrl: URL.createObjectURL(blob),
  };
}

/**
 * 获取当前用户信息
 *
 * GET /user/info
 *
 * 后端 data 中包含：
 * nickname
 * birthday
 * profile_finished
 *
 * profile_finished 只用于判断是否提醒完善资料，
 * 不用于权限控制。
 */
export async function getCurrentUserApi(): Promise<CurrentUser> {
  const response = await apiRequest<unknown>("/user/info", {
    method: "GET",
    responseType: "json",
  });

  if (
    !response ||
    typeof response !== "object" ||
    Array.isArray(response)
  ) {
    throw new Error("用户信息接口返回格式不正确");
  }

  const result = response as Record<string, unknown>;

  const data =
    result.data !== undefined
      ? result.data
      : result;

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    throw new Error("用户信息数据格式不正确");
  }

  const user = data as Record<string, unknown>;

  // Older/admin responses may omit profile_finished; do not discard valid user data.
  if (user.profile_finished !== undefined && typeof user.profile_finished !== "boolean") {
    throw new Error("用户信息 profile_finished 字段类型不正确");
  }
  if (user.is_admin !== undefined && typeof user.is_admin !== "boolean") {
    throw new Error("用户信息 is_admin 字段类型不正确");
  }

  return user as unknown as CurrentUser;
}
/**
 * 设置网站昵称
 *
 * POST /user/set_nickname
 */
export async function setNicknameApi(
  nickname: string
): Promise<string> {
  const value = nickname.trim();

  if (!value) {
    throw new Error("请输入网站昵称");
  }

  return apiRequest<string>(
    "/user/set_nickname",
    {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        nickname: value,
      }),
      responseType: "auto",
    }
  );
}

/**
 * 校验月份和日期
 *
 * 因为 UI 不选择年份，
 * 使用闰年 2000 年作为日期校验基准。
 */
export function validateBirthday(
  birthday: BirthdayValue
): void {
  const { month, day } = birthday;

  if (
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    throw new Error(
      "请选择有效的月份和日期"
    );
  }

  const maxDays = [
    31, 29, 31, 30,
    31, 30, 31, 31,
    30, 31, 30, 31,
  ];

  if (day > maxDays[month - 1]) {
    throw new Error(
      "该月份不存在所选日期"
    );
  }
}

/**
 * 将月日转换为后端要求的日期格式
 *
 * 例如：
 * { month: 8, day: 15 }
 * 转换为：
 * 2000-08-15
 *
 * 2000 年为闰年，可以支持 2 月 29 日。
 */
export function formatBirthday(
  birthday: BirthdayValue
): string {
  validateBirthday(birthday);

  const month = String(
    birthday.month
  ).padStart(2, "0");

  const day = String(
    birthday.day
  ).padStart(2, "0");

  return `2000-${month}-${day}`;
}

/**
 * 校验 YYYY-MM-DD 日期是否合法
 */
function validateFullDate(
  birthday: string
): void {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(birthday)
  ) {
    throw new Error(
      "生日必须为 YYYY-MM-DD 格式"
    );
  }

  const [year, month, day] =
    birthday.split("-").map(Number);

  if (year < 1 || year > 9999) {
    throw new Error("生日年份无效");
  }

  const date = new Date(0);

  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(
    year,
    month - 1,
    day
  );

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    throw new Error("生日日期无效");
  }
}

/**
 * 设置生日
 *
 * POST /user/set_birthday
 *
 * 支持完整 YYYY-MM-DD 日期。
 */
export async function setBirthdayApi(
  birthday: string
): Promise<string> {
  validateFullDate(birthday);

  return apiRequest<string>(
    "/user/set_birthday",
    {
      method: "POST",
      headers: JSON_HEADERS,
      body: JSON.stringify({
        birthday,
      }),
      responseType: "auto",
    }
  );
}

/**
 * 完善个人资料
 *
 * 昵称和生日分别调用后端接口。
 *
 * 注意：
 * 后端没有提供统一的资料提交事务接口，
 * 因此两次请求不能保证原子性。
 * 如果生日保存失败，昵称可能已经保存成功。
 */
export async function setupProfileApi(
  params: ProfileSetupParams
): Promise<void> {
  const nickname = params.nickname.trim();

  if (!nickname) {
    throw new Error("请输入网站昵称");
  }

  const birthday = formatBirthday(
    params.birthday
  );

  // 先完成所有前端校验，再发送请求。
  await setNicknameApi(nickname);

  await setBirthdayApi(birthday);
}

/**
 * 查询用户的三道密保问题
 *
 * GET /user/security_questions?uid=xxx
 *
 * 后端只返回问题文本，不返回答案。
 *
 * 由于目前没有提供精确 JSON 示例，
 * 这里兼容数组和常见对象结构。
 */
export async function getSecurityQuestionsApi(
  uid: string
): Promise<SecurityQuestionTexts> {
  validateUID(uid);

  const response = await apiRequest<unknown>(
    `/user/security_questions?uid=${encodeURIComponent(uid)}`,
    {
      method: "GET",
      auth: false,
      responseType: "json",
    }
  );

  return normalizeSecurityQuestions(response);
}

/**
 * 将后端密保问题响应统一转换为三个字符串。
 */
function normalizeSecurityQuestions(
  response: unknown
): SecurityQuestionTexts {
  let value: unknown = response;

  if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    const object = value as Record<
      string,
      unknown
    >;

    if (
      object.data !== undefined &&
      object.data !== null
    ) {
      value = object.data;
    }
  }

  let questions: unknown[];

  if (Array.isArray(value)) {
    questions = value;
  } else if (
    value !== null &&
    typeof value === "object"
  ) {
    const object = value as Record<
      string,
      unknown
    >;

    if (
      Array.isArray(object.questions)
    ) {
      questions = object.questions;
    } else if (
      Array.isArray(object.security_questions)
    ) {
      questions = object.security_questions;
    } else {
      questions = [
        object.q1 ?? object.question1,
        object.q2 ?? object.question2,
        object.q3 ?? object.question3,
      ];
    }
  } else {
    throw new Error(
      "密保问题接口返回格式不正确"
    );
  }

  if (questions.length !== 3) {
    throw new Error(
      "后端未返回完整的三道密保问题"
    );
  }

  const normalized = questions.map(
    (item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      if (
        item !== null &&
        typeof item === "object"
      ) {
        const object = item as Record<
          string,
          unknown
        >;

        const question =
          object.question ??
          object.text;

        if (
          typeof question === "string"
        ) {
          return question.trim();
        }
      }

      return "";
    }
  );

  if (
    normalized.some(
      (question) => !question
    )
  ) {
    throw new Error(
      "密保问题内容不完整"
    );
  }

  return normalized as SecurityQuestionTexts;
}

/**
 * 使用三道密保答案重置密码
 *
 * POST /user/reset_pwd_by_security
 *
 * 后端重置密码接口只要求答案，
 * 不需要再次提交问题文本。
 */

/**
 * 第一步：验证密保答案
 */
export async function verifySecurityAnswerApi(
  params: VerifySecurityParams
): Promise<VerifySecurityResponse> {
  validateUID(params.uid);

  if (
    !params.q1_ans.trim() ||
    !params.q2_ans.trim() ||
    !params.q3_ans.trim()
  ) {
    throw new Error("请填写全部三道密保答案");
  }

  const result = await apiRequest<VerifySecurityResponse>(
    "/user/verify_security_answer",
    {
      method: "POST",
      auth: false,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        uid: params.uid,
        q1_ans: params.q1_ans.trim(),
        q2_ans: params.q2_ans.trim(),
        q3_ans: params.q3_ans.trim(),
      }),
      responseType: "auto",
    }
  );

  if (
    !result ||
    typeof result.reset_token !== "string" ||
    !result.reset_token.trim()
  ) {
    throw new Error("服务器未返回有效的重置凭证");
  }

  return result;
}

/**
 * 第二步：使用临时凭证重置密码
 */
export async function resetPasswordApi(
  params: ResetPasswordParams
): Promise<string> {
  if (!params.reset_token.trim()) {
    throw new Error("重置凭证不存在，请重新验证密保");
  }

  validatePassword(params.new_password);

  return apiRequest<string>(
    "/user/reset_pwd_by_security",
    {
      method: "POST",
      auth: false,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        reset_token: params.reset_token,
        new_password: params.new_password,
      }),
      responseType: "auto",
    }
  );
}


/**
 * 退出登录
 *
 * POST /logout
 *
 * 本地会话由 AuthContext 在发起请求后立即清理。
 */
export async function logoutApi(): Promise<void> {
  await apiRequest<unknown>("/logout", {
    method: "POST",
    responseType: "auto",
  });
}
