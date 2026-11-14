import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type CSSProperties,
} from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";
import { getSafeRedirect } from "../auth/navigation"

import {
  getCaptchaApi,
  getSecurityQuestionsApi,
  verifySecurityAnswerApi,
  resetPasswordApi,
  setupProfileApi,
  validateBirthday,
} from "../api/auth";


import type {
  AuthDialogType,
  BirthdayValue,
  SecurityQuestions,
  SecurityQuestionTexts,
} from "../types/auth";

import "./Login.css";

/* ============================================================
   类型定义
   ============================================================ */

type PageMode =
  | "login"
  | "register"
  | "profile"
  | "forgot";

type RegisterStep = 1 | 2;
type ForgotStep = 1 | 2;

type PickerType =
  | "month"
  | "day"
  | "q1"
  | "q2"
  | "q3"
  | null;

interface DialogState {
  kind: AuthDialogType;
  title: string;
  description: string;
  buttonText: string;
  footer: string;
  autoClose: boolean;
}

interface InputFieldProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: "user" | "lock";
  type?: string;
  maxLength?: number;
  disabled?: boolean;
  hint?: string;
  autoComplete?: string;
}

/* ============================================================
   基础配置
   ============================================================ */

const asset = (name: string) => `/figma-auth/${name}`;

const QUESTION_OPTIONS: [string[], string[], string[]] = [
  [
    "母亲的名字（不含姓氏）？",
    "你第一位兄弟姐妹的名字？",
    "你出生的城市？",
    "你童年长期居住的街道或小区名称？",
  ],
  [
    "你小学就读的学校名称？",
    "你幼儿园所在的城市？",
    "你高中班主任教授的学科？",
    "你大学所在的城市？",
  ],
  [
    "你第一只宠物的名字？",
    "你童年最要好的朋友名字？",
    "你童年最喜欢吃的食物？",
    "你的出生年份？",
  ],
];
const SECURITY_QUESTION_POOL = QUESTION_OPTIONS.flat();

const MONTH_DAYS = [
  31, 29, 31, 30, 31, 30,
  31, 31, 30, 31, 30, 31,
];

function createEmptyQuestions(): SecurityQuestions {
  return [
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ];
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "操作失败，请稍后重试";
}

function isValidUID(value: string): boolean {
  return /^\d{7}$/.test(value.trim());
}

function isValidPassword(value: string): boolean {
  return (
    value.length >= 8 &&
    /[A-Za-z]/.test(value) &&
    /\d/.test(value)
  );
}

/* ============================================================
   通用输入框
   ============================================================ */

function InputField({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = "text",
  maxLength,
  disabled = false,
  hint,
  autoComplete,
}: InputFieldProps) {
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="figma-auth-input-group">
      {label && (
        <label className="figma-auth-label">
          {label}
        </label>
      )}

      <div className="figma-auth-field">
        {icon && (
          <span className="figma-auth-field-icon">
            <img
              src={asset(
                icon === "user"
                  ? "login-user.svg"
                  : "login-lock.svg"
              )}
              alt=""
            />
          </span>
        )}

        <input
          type={
            isPassword && visible
              ? "text"
              : type
          }
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          autoComplete={
            autoComplete ??
            (isPassword
              ? "new-password"
              : undefined)
          }
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />

        
{isPassword && (
  <button
    type="button"
    className="figma-auth-eye"
    onClick={() => setVisible((prev) => !prev)}
    aria-label={visible ? "隐藏密码" : "显示密码"}
    aria-pressed={visible}
  >
    {visible ? (
      // 密码可见：睁眼图标
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) : (
      // 密码隐藏：保留原有的闭眼图标
      <img
        src={asset("login-eye.svg")}
        alt=""
      />
    )}
  </button>
)}


      </div>

      {hint && (
        <p className="figma-auth-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   页面装饰
   保留原有 figma-auth 素材
   ============================================================ */

function Decorations({
  mode,
}: {
  mode: "login" | "register";
}) {
  return (
    <div
      className="figma-auth-decor"
      aria-hidden="true"
    >
      <img
        className="figma-auth-paper"
        src={asset(`${mode}-paper.svg`)}
        alt=""
      />

      <img
        className={`figma-auth-${mode}-top-left`}
        src={asset(`${mode}-top-left.png`)}
        alt=""
      />

      <img
        className={`figma-auth-${mode}-flower`}
        src={asset(`${mode}-flower.png`)}
        alt=""
      />

      <img
        className={`figma-auth-${mode}-bottom-right`}
        src={asset(`${mode}-bottom-right.png`)}
        alt=""
      />

      <img
        className={`figma-auth-${mode}-bottom-left`}
        src={asset(`${mode}-bottom-left.png`)}
        alt=""
      />

      <img
        className={`figma-auth-${mode}-arc`}
        src={asset(`${mode}-left-arc.svg`)}
        alt=""
      />

      <img
        className={`figma-auth-${mode}-right-small`}
        src={asset(`${mode}-right-small.png`)}
        alt=""
      />

      {mode === "login" ? (
        <img
          className="figma-auth-login-stars"
          src={asset("login-stars.svg")}
          alt=""
        />
      ) : (
        <>
          <img
            className="figma-auth-register-star1"
            src={asset("register-star1.svg")}
            alt=""
          />

          <img
            className="figma-auth-register-star2"
            src={asset("register-star2.svg")}
            alt=""
          />

          <img
            className="figma-auth-register-star3"
            src={asset("register-star3.svg")}
            alt=""
          />
        </>
      )}
    </div>
  );
}

/* ============================================================
   注册步骤条
   ============================================================ */

function RegisterSteps({
  step,
}: {
  step: RegisterStep;
}) {
  return (
    <div className="figma-auth-steps">
      <div
        className={
          step === 1
            ? "active"
            : "finished"
        }
      >
        <span className="figma-auth-step-circle">
          {step === 1 ? "1" : "✓"}
        </span>

        账号信息
      </div>

      <span className="figma-auth-step-line" />

      <div
        className={
          step === 2 ? "active" : ""
        }
      >
        <span className="figma-auth-step-circle">
          2
        </span>

        密保设置
      </div>
    </div>
  );
}

/* ============================================================
   忘记密码步骤条
   ============================================================ */

function ForgotSteps({
  step,
}: {
  step: ForgotStep;
}) {
  return (
    <div className="figma-auth-forgot-steps">
      <div
        className={`figma-auth-forgot-step ${
          step === 1
            ? "is-active"
            : "is-completed"
        }`}
      >
        <span className="figma-auth-forgot-step-number">
          {step === 1 ? "1" : "✓"}
        </span>

        <span>身份验证</span>
      </div>

      <span className="figma-auth-forgot-step-line" />

      <div
        className={`figma-auth-forgot-step ${
          step === 2
            ? "is-active"
            : ""
        }`}
      >
        <span className="figma-auth-forgot-step-number">
          2
        </span>

        <span>重置密码</span>
      </div>
    </div>
  );
}

/* ============================================================
   通用结果弹窗
   登录、注册、完善资料使用
   ============================================================ */

function ResultDialog({
  dialog,
  onConfirm,
}: {
  dialog: DialogState;
  onConfirm: () => void;
}) {
  const isFailure =
    dialog.kind.endsWith("-error");

  return (
    <div className="figma-auth-result-overlay">
      <section
        className={`figma-auth-result-card ${
          isFailure
            ? "figma-auth-result-card--failure"
            : "figma-auth-result-card--success"
        }`}
        style={{
          width: 420,
          height: 324,
          minHeight: 324,
          boxSizing: "border-box",
          borderRadius: 24,
          padding: "24px 28px",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
      >
        <div className="figma-auth-result-icon">
          {isFailure ? (
            <span className="figma-auth-result-exclamation">
              !
            </span>
          ) : (
            <span className="figma-auth-result-check" />
          )}
        </div>

        <h2
          id="auth-dialog-title"
          className="figma-auth-result-title"
        >
          {dialog.title}
        </h2>

        <p className="figma-auth-result-description">
          {dialog.description}
        </p>

        <button
          type="button"
          className="figma-auth-result-button"
          onClick={onConfirm}
          autoFocus
        >
          {dialog.buttonText}
          <img
            className="figma-auth-result-shine"
            src={asset("login-button-shine.svg")}
            alt=""
          />
        </button>

        <p className="figma-auth-result-footer">
          {dialog.footer}
        </p>
      </section>
    </div>
  );
}

/* ============================================================
   密码重置成功弹窗
   Figma: 480 × 360
   ============================================================ */

function ForgotSuccessDialog({
  onBackToLogin,
}: {
  onBackToLogin: () => void;
}) {
  return (
    <div className="figma-auth-forgot-success-overlay">
      <section
        className="figma-auth-forgot-success-dialog"
        style={{
          width: 480,
          height: 360,
          maxWidth: "calc(100vw - 32px)",
          borderRadius: 24,
          border: "1px solid #C2CBE0",
          background: "#F4F6FB",
          boxSizing: "border-box",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-success-title"
      >
        <button
          type="button"
          className="figma-auth-forgot-success-close"
          aria-label="关闭并返回登录"
          onClick={onBackToLogin}
        >
          ×
        </button>

        <div className="figma-auth-forgot-success-icon">
          ✓
        </div>

        <h2 id="forgot-success-title">
          密码重置成功
        </h2>

        <p className="figma-auth-forgot-success-description">
          请使用游戏 UID 和新密码重新登录。
        </p>

        <button
          type="button"
          className="figma-auth-forgot-success-button"
          onClick={onBackToLogin}
        >
          返回登录

          <img
            src={asset("login-button-shine.svg")}
            alt=""
          />
        </button>
      </section>
    </div>
  );
}

/* ============================================================
   月份、日期、密保问题选择弹窗
   ============================================================ */

function Picker({
  type,
  month,
  onChoose,
  onClose,
}: {
  type: Exclude<PickerType, null>;
  month: number | null;
  onChoose: (value: string) => void;
  onClose: () => void;
}) {
  const questionIndex =
    type === "q1"
      ? 0
      : type === "q2"
        ? 1
        : 2;

  const title =
    type === "month"
      ? "选择月份"
      : type === "day"
        ? "选择日期"
        : `选择密保问题${
            ["一", "二", "三"][questionIndex]
          }`;

  let options: string[];

  if (type === "month") {
    options = Array.from(
      { length: 12 },
      (_, index) => `${index + 1}月`
    );
  } else if (type === "day") {
    const daysInMonth = month
      ? MONTH_DAYS[month - 1]
      : 31;

    options = Array.from(
      { length: daysInMonth },
      (_, index) => String(index + 1)
    );
  } else {
    options = QUESTION_OPTIONS[questionIndex];
  }

  return (
    <div
      className="figma-auth-picker-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <section
        className={`figma-auth-picker ${
          type === "month" || type === "day"
            ? "figma-auth-picker--date"
            : "figma-auth-picker--question"
        }`}
        style={
          type === "month" || type === "day"
            ? {
                width: 448,
                height:
                  type === "month"
                    ? 286
                    : 318,
                boxSizing: "border-box",
              }
            : undefined
        }
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="figma-auth-picker-heading">
          <span>{title}</span>

          <button
            type="button"
            onClick={onClose}
            aria-label="关闭选择弹窗"
          >
            ×
          </button>
        </div>

        <div
          className={
            type === "month"
              ? "figma-auth-picker-months"
              : type === "day"
                ? "figma-auth-picker-days"
                : "figma-auth-picker-questions"
          }
        >
          {options.map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => {
                onChoose(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   主组件
   ============================================================ */

function PolicyLinks() {
  return (
    <span>
      <a className="figma-auth-link" href="/terms" target="_blank" rel="noopener noreferrer">《用户服务协议》</a>
      <a className="figma-auth-link" href="/privacy" target="_blank" rel="noopener noreferrer">《隐私政策》</a>
    </span>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    register,
    isAuthenticated,
    initializing,
    refreshUser,
  } = useAuth();

  /* ---------------- 页面模式 ---------------- */

  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

  const [mode, setMode] =
    useState<PageMode>("login");

  const [
    registerStep,
    setRegisterStep,
  ] = useState<RegisterStep>(1);

  const [
    forgotStep,
    setForgotStep,
  ] = useState<ForgotStep>(1);

// 密保验证成功后获得的临时凭证
const [resetToken, setResetToken] = useState("");

// 凭证的前端预计过期时间
const [resetTokenExpiresAt, setResetTokenExpiresAt] =
  useState(0);

// 防止旧请求在 UID 变化或退出后继续更新状态
const forgotRequestVersionRef = useRef(0);


  /* ---------------- 登录与注册 ---------------- */

  const [uid, setUID] = useState("");
  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    captchaCode,
    setCaptchaCode,
  ] = useState("");

  const [
    captchaKey,
    setCaptchaKey,
  ] = useState("");

  const [
    captchaImage,
    setCaptchaImage,
  ] = useState("");

  const [
    captchaLoading,
    setCaptchaLoading,
  ] = useState(false);

  const [
    keepLoggedIn,
    setKeepLoggedIn,
  ] = useState(false);

  const [
    privacyAgreed,
    setPrivacyAgreed,
  ] = useState(false);

  /* ---------------- 注册密保 ---------------- */

  const [
    questions,
    setQuestions,
  ] = useState<SecurityQuestions>(
    createEmptyQuestions
  );

  /* ---------------- 完善资料 ---------------- */

  const [
    nickname,
    setNickname,
  ] = useState("");

  const [
    birthday,
    setBirthday,
  ] = useState<BirthdayValue>({
    month: 0,
    day: 0,
  });

  /* ---------------- 忘记密码 ---------------- */

  const [
    forgotUID,
    setForgotUID,
  ] = useState("");

  const [
    forgotQuestions,
    setForgotQuestions,
  ] = useState<SecurityQuestionTexts | null>(
    null
  );

  const [
    forgotQuestionsUID,
    setForgotQuestionsUID,
  ] = useState("");

  const [
    forgotAnswers,
    setForgotAnswers,
  ] = useState<
    [string, string, string]
  >(["", "", ""]);

  const [
    forgotNewPassword,
    setForgotNewPassword,
  ] = useState("");

  const [
    forgotConfirmPassword,
    setForgotConfirmPassword,
  ] = useState("");

  const [
    forgotQuestionsLoading,
    setForgotQuestionsLoading,
  ] = useState(false);

  const [
    forgotSuccess,
    setForgotSuccess,
  ] = useState(false);

  const [
    forgotError,
    setForgotError,
  ] = useState("");

  /* ---------------- 公共状态 ---------------- */

  const [
    picker,
    setPicker,
  ] = useState<PickerType>(null);

  const [
    dialog,
    setDialog,
  ] = useState<DialogState | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    inlineError,
    setInlineError,
  ] = useState("");

  const [
    guestEntered,
    setGuestEntered,
  ] = useState(false);

  const [
    viewportWidth,
    setViewportWidth,
  ] = useState(
    () => window.innerWidth
  );

  const captchaUrlRef = useRef("");
  const loginAttemptRef = useRef(false);
  const [enteredAuthenticated] = useState(() => isAuthenticated);
  const captchaRequestVersion = useRef(0);
  // 保存本次登录返回的用户资料，避免成功弹窗读取到上一轮的 React 状态。
  const loginResultRef = useRef<Awaited<ReturnType<typeof login>> | null>(null);

  const redirectPath = getSafeRedirect(new URLSearchParams(location.search).get("redirect"));

  /* ==========================================================
     响应式画布
     ========================================================== */

  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 375
  );

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const windowHeight =
    mode === "register"
      ? registerStep === 1
        ? 820
        : 1000
      : mode === "profile"
        ? 900
        : mode === "forgot"
          ? forgotStep === 1
            ? 1080
            : 720
          : 800;

  // Figma 移动端设计画布 667 × 375：六个主窗口统一为 426 × 284。
  // 仅在视口容纳不下设计尺寸时等比缩小，不改变内部布局或字体比例。
  const isMobileLayout = viewportWidth < 1024;
  const MOBILE_FIGMA_WIDTH = 426;
  const MOBILE_FIGMA_HEIGHT = 284;
  const MOBILE_NATIVE_WIDTH = 294;
  const MOBILE_NATIVE_HEIGHT = 196;
  const mobileScale = Math.min(
    1,
    Math.max(0.1, (viewportWidth - 16) / MOBILE_FIGMA_WIDTH),
    Math.max(0.1, (viewportHeight - 16) / MOBILE_FIGMA_HEIGHT)
  );

  // 原移动端内部布局以 294 × 196 坐标编写；只统一等比放大至
  // 新 Figma 的 426 × 284。独立弹窗采用各自的 Figma 尺寸。
  const mobileMainTransformScale =
    mobileScale * (MOBILE_FIGMA_WIDTH / MOBILE_NATIVE_WIDTH);
  const mobileResultTransformScale =
    mobileScale * (344.86 / 294);
  const mobileSuccessTransformScale =
    mobileScale * (365.14 / 252);
  const mobilePickerTransformScale =
    mobileScale * (365.14 / 310);

  // 桌面端以 Figma 原始尺寸为基准，同时受视口宽度和高度约束。
  // 长页面（如忘记密码 600 × 1080）在较矮窗口中整体等比缩小，
  // 不裁切内容，也不单独压缩字体、输入框或装饰。
  const scale = Math.min(
    1,
    Math.max(0.1, (viewportWidth - 24) / 600),
    Math.max(0.1, (viewportHeight - 48) / windowHeight)
  );

  /* ==========================================================
     验证码
     ========================================================== */

  const refreshCaptcha =
    useCallback(async () => {
      const version = ++captchaRequestVersion.current;
      setCaptchaLoading(true);
      setCaptchaCode("");
      setCaptchaKey("");

      try {
        const result =
          await getCaptchaApi();

        if (version !== captchaRequestVersion.current) {
          URL.revokeObjectURL(result.imageUrl);
          return;
        }
        if (captchaUrlRef.current) {
          URL.revokeObjectURL(
            captchaUrlRef.current
          );
        }

        captchaUrlRef.current =
          result.imageUrl;

        setCaptchaImage(
          result.imageUrl
        );

        setCaptchaKey(
          result.captcha_key
        );

        setInlineError("");
      } catch (error) {
        if (version !== captchaRequestVersion.current) return;
        setCaptchaImage("");

        setInlineError(
          getErrorMessage(error)
        );
      } finally {
        if (version === captchaRequestVersion.current) setCaptchaLoading(false);
      }
    }, []);

  useEffect(() => {
    if (mode !== "login" || initializing || (enteredAuthenticated && isAuthenticated)) {
      return;
    }

    // 推迟至 Effect 完成后加载验证码，避免同步触发状态更新。
    // 页面模式切换或组件卸载时取消尚未执行的任务。
    const timer = window.setTimeout(() => {
      void refreshCaptcha();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [mode, refreshCaptcha, initializing, enteredAuthenticated, isAuthenticated]);

  useEffect(() => {
    return () => {
      ++captchaRequestVersion.current;
      if (captchaUrlRef.current) {
        URL.revokeObjectURL(
          captchaUrlRef.current
        );
      }
    };
  }, []);

  /* ==========================================================
     页面模式切换
     ========================================================== */

  const switchMode = (
    nextMode: PageMode
  ) => {
    forgotRequestVersionRef.current += 1;
    setResetToken("");
    setResetTokenExpiresAt(0);
    setOpenQuestionIndex(null);
    setMode(nextMode);
    setInlineError("");
    setForgotError("");
    setDialog(null);
    setPicker(null);

    if (nextMode === "forgot") {
      setForgotStep(1);
      setForgotSuccess(false);

      setForgotQuestions(null);
      setForgotQuestionsUID("");
      setForgotAnswers(["", "", ""]);

      setForgotNewPassword("");
      setForgotConfirmPassword("");

      setForgotUID(uid.trim());
    }

    if (nextMode === "register") {
      setRegisterStep(1);
    }
  };

  const returnToLogin = () => {
    forgotRequestVersionRef.current += 1;
    setResetToken("");
    setResetTokenExpiresAt(0);
    setForgotSuccess(false);
    setForgotStep(1);
    setForgotError("");

    setForgotQuestions(null);
    setForgotQuestionsUID("");
    setForgotAnswers(["", "", ""]);

    setForgotNewPassword("");
    setForgotConfirmPassword("");

    switchMode("login");
  };

  /* ==========================================================
     登录后的导航
     ========================================================== */

  useEffect(() => {
    if (
      !initializing &&
      isAuthenticated &&
      !loginAttemptRef.current &&
      !dialog &&
      mode === "login"
    ) {
      navigate(redirectPath, { replace: true });
    }
  }, [
    initializing,
    isAuthenticated,
    dialog,
    mode,
    navigate,
    redirectPath,
  ]);

  /* ==========================================================
     弹窗
     ========================================================== */

  const showDialog = (
    value: DialogState
  ) => {
    setDialog(value);
  };

  const confirmDialog =
    useCallback(() => {
      if (!dialog) {
        return;
      }

      const kind = dialog.kind;

      setDialog(null);

      switch (kind) {
        case "login-success": {
          loginAttemptRef.current = false;

          /*
           * profile_finished 仅用于提醒完善资料。
           * 不影响登录权限。
           */

          const loggedInUser = loginResultRef.current;
          loginResultRef.current = null;

          // 只根据后端明确返回的 profile_finished 判断。
          // 获取用户资料失败（null）时允许直接进入主页。
          const needsProfile =
            loggedInUser !== null &&
            typeof loggedInUser === "object" &&
            "profile_finished" in loggedInUser &&
            loggedInUser.profile_finished === false;

          if (needsProfile) {
            setMode("profile");
          } else {
            navigate(redirectPath, {
              replace: true,
            });
          }

          break;
        }

        case "register-step-success":
          setRegisterStep(2);
          break;

        case "register-success":
          setMode("login");
          setRegisterStep(1);

          setPassword("");
          setConfirmPassword("");
          setQuestions(
            createEmptyQuestions()
          );
          break;

        case "profile-success":
          navigate(redirectPath, {
            replace: true,
          });
          break;

        case "guest-success":
          setGuestEntered(true);
          break;

        default:
          break;
      }
    }, [
      dialog,
      navigate,
      redirectPath,
    ]);

  useEffect(() => {
    if (!dialog?.autoClose) {
      return;
    }

    const timer = window.setTimeout(
      confirmDialog,
      2000
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    dialog,
    confirmDialog,
  ]);

  /* ==========================================================
     登录
     ========================================================== */

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!isValidUID(uid)) {
      showDialog({
        kind: "login-error",
        title: "登录失败",
        description:
          "请输入正确的 7 位游戏 UID。",
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
      return;
    }

    if (
      !password ||
      !captchaCode.trim() ||
      !captchaKey
    ) {
      showDialog({
        kind: "login-error",
        title: "登录失败",
        description:
          "请填写游戏 UID、密码及图片验证码。",
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
      return;
    }

    if (!privacyAgreed) {
      showDialog({
        kind: "login-error",
        title: "登录失败",
        description:
          "请先阅读并同意用户协议及隐私政策。",
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
      return;
    }

    setLoading(true);
    loginAttemptRef.current = true;

    try {
      loginResultRef.current = await login(
        {
          username: uid.trim(),
          password,
          captcha_key: captchaKey,
          captcha_code:
            captchaCode.trim(),
        },
        keepLoggedIn
      );

      showDialog({
        kind: "login-success",
        title: "登录成功",
        description:
          "欢迎回来，与你的故事继续。",
        buttonText: "知道了",
        footer: "2 秒后自动收起",
        autoClose: true,
      });
    } catch (error) {
      loginAttemptRef.current = false;
      loginResultRef.current = null;

      showDialog({
        kind: "login-error",
        title: "登录失败",
        description:
          getErrorMessage(error),
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });

      void refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     注册第一步
     ========================================================== */

  const handleRegisterStepOne = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!isValidUID(uid)) {
      showDialog({
        kind: "register-step-error",
        title: "账号信息有误",
        description:
          "请输入正确的 7 位游戏 UID。",
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
      return;
    }

    if (!isValidPassword(password)) {
      showDialog({
        kind: "register-step-error",
        title: "密码格式有误",
        description:
          "密码至少 8 位，必须同时包含英文字母和数字。",
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
      return;
    }

    if (
      password !== confirmPassword
    ) {
      showDialog({
        kind: "register-step-error",
        title: "两次密码不一致",
        description:
          "请确认两次输入的密码完全相同。",
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
      return;
    }

    showDialog({
      kind: "register-step-success",
      title: "账号信息已完成",
      description:
        "下一步：设置密保问题，完善账号保护。",
      buttonText: "知道了",
      footer: "2 秒后自动收起",
      autoClose: true,
    });
  };

  /* ==========================================================
     注册密保
     ========================================================== */

  const updateQuestion = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setQuestions((previous) => {
      const next = previous.map(
        (item) => ({ ...item })
      ) as SecurityQuestions;

      if (field === "question") {
        if (!SECURITY_QUESTION_POOL.includes(value) || previous.some((item, otherIndex) => otherIndex !== index && item.question === value)) return previous;
        if (next[index].question !== value) next[index].answer = "";
      }
      next[index][field] = value;

      return next;
    });
  };

  const handleRegisterStepTwo =
    async (
      event: FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      if (
        questions.some(
          (item) =>
            !item.question.trim() ||
            !item.answer.trim()
        )
      ) {
        showDialog({
          kind: "register-error",
          title: "请完善密保信息",
          description:
            "请选择三道密保问题，并填写对应答案。",
          buttonText: "返回修改",
          footer:
            "保留已填内容，可直接返回修改",
          autoClose: false,
        });
        return;
      }

      setLoading(true);

      try {
        await register({
          username: uid.trim(),
          password,
          securityQuestions:
            questions,
        });

        /*
         * 注册成功不自动登录。
         * 不读取 Token。
         * 返回登录页面。
         */

        showDialog({
          kind: "register-success",
          title: "注册成功",
          description:
            "密保问题已设置，请返回登录。",
          buttonText: "前往登录",
          footer: "2 秒后自动收起",
          autoClose: true,
        });
      } catch (error) {
        showDialog({
          kind: "register-error",
          title: "注册失败",
          description:
            getErrorMessage(error),
          buttonText: "返回修改",
          footer:
            "保留已填内容，可直接返回修改",
          autoClose: false,
        });
      } finally {
        setLoading(false);
      }
    };

  /* ==========================================================
     完善资料
     ========================================================== */

  const handleProfile = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (
      !nickname.trim() ||
      !birthday.month ||
      !birthday.day
    ) {
      showDialog({
        kind: "profile-error",
        title: "请完善资料",
        description:
          "请填写昵称，并选择生日月份和日期。",
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
      return;
    }

    try {
      validateBirthday(birthday);

      setLoading(true);

      await setupProfileApi({
        nickname:
          nickname.trim(),
        birthday,
      });

      try {
        await refreshUser();
      } catch (error) {
        console.warn(
          "资料保存成功，但刷新用户资料失败",
          error
        );
      }

      showDialog({
        kind: "profile-success",
        title: "资料设置完成",
        description:
          "昵称与生日已设置，愿每个特别的日子都有美好相伴。",
        buttonText: "知道了",
        footer: "2 秒后自动收起",
        autoClose: true,
      });
    } catch (error) {
      showDialog({
        kind: "profile-error",
        title: "资料设置失败",
        description:
          getErrorMessage(error),
        buttonText: "返回修改",
        footer:
          "保留已填内容，可直接返回修改",
        autoClose: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const skipProfile = () => {
    /*
     * 未完善资料和已完善资料的用户
     * 权限完全相同。
     *
     * 不修改 Token。
     * 不退出登录。
     * 不阻止进入主页。
     */

    navigate(redirectPath, {
      replace: true,
    });
  };

  /* ==========================================================
     忘记密码：第一步获取密保问题
     ========================================================== */

  
const resetForgotQuestions = () => {
  // 使此前发起的密保验证请求失效
  forgotRequestVersionRef.current += 1;

  setForgotQuestions(null);
  setForgotQuestionsUID("");
  setForgotAnswers(["", "", ""]);
  setForgotError("");

  // 清除临时凭证
  setResetToken("");
  setResetTokenExpiresAt(0);
};


  const handleForgotUIDChange = (
    value: string
  ) => {
    setForgotUID(value);
    resetForgotQuestions();
  };

  const fetchForgotQuestions =
    async () => {
      const normalizedUID =
        forgotUID.trim();

      if (!isValidUID(normalizedUID)) {
        setForgotError(
          "请输入正确的 7 位游戏 UID"
        );
        return;
      }

      if (forgotQuestionsLoading) {
        return;
      }

      setForgotQuestionsLoading(true);
      resetForgotQuestions();

      try {
        const result =
          await getSecurityQuestionsApi(
            normalizedUID
          );

        if (
          result.length !== 3 ||
          result.some(
            (question) =>
              !question.trim()
          )
        ) {
          throw new Error(
            "后端返回的密保问题不完整"
          );
        }

        setForgotQuestions(result);
        setForgotQuestionsUID(
          normalizedUID
        );
      } catch (error) {
        setForgotError(
          getErrorMessage(error)
        );
      } finally {
        setForgotQuestionsLoading(
          false
        );
      }
    };

  const updateForgotAnswer = (
    index: number,
    value: string
  ) => {
    setForgotAnswers((previous) => {
      const next: [
        string,
        string,
        string
      ] = [...previous];

      next[index] = value;

      return next;
    });
  };

  /* ==========================================================
     忘记密码：第一步进入第二步
     ========================================================== */

  
/**
 * 忘记密码第一步：
 * 验证密保答案，获取 reset_token
 */
const handleForgotStepOne = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (loading) {
    return;
  }

  setForgotError("");

  const normalizedUID = forgotUID.trim();

  if (!isValidUID(normalizedUID)) {
    setForgotError("请输入正确的 7 位游戏 UID");
    return;
  }

  if (
    !forgotQuestions ||
    forgotQuestionsUID !== normalizedUID
  ) {
    setForgotError(
      "请先查询当前 UID 对应的密保问题"
    );
    return;
  }

  if (
    forgotAnswers.some(
      (answer) => !answer.trim()
    )
  ) {
    setForgotError(
      "请填写全部三道密保问题的答案"
    );
    return;
  }

  const requestVersion =
    ++forgotRequestVersionRef.current;

  setLoading(true);
  setResetToken("");
  setResetTokenExpiresAt(0);

  try {
    const result = await verifySecurityAnswerApi({
      uid: normalizedUID,
      q1_ans: forgotAnswers[0].trim(),
      q2_ans: forgotAnswers[1].trim(),
      q3_ans: forgotAnswers[2].trim(),
    });

    // 用户已切换账号或退出流程，忽略旧响应
    if (
      requestVersion !==
      forgotRequestVersionRef.current
    ) {
      return;
    }

    if (!result.reset_token) {
      throw new Error(
        "密保验证失败，服务器未返回重置凭证"
      );
    }

    // 记录凭证与本地预计过期时间
    setResetToken(result.reset_token);

    setResetTokenExpiresAt(
      Date.now() + 5 * 60 * 1000
    );

    setForgotNewPassword("");
    setForgotConfirmPassword("");

    // 只有拿到后端凭证才进入下一步
    setForgotStep(2);
  } catch (error) {
    if (
      requestVersion !==
      forgotRequestVersionRef.current
    ) {
      return;
    }

    setResetToken("");
    setResetTokenExpiresAt(0);

    setForgotError(getErrorMessage(error));
  } finally {
    setLoading(false);
  }
};


  /* ==========================================================
     忘记密码：第二步重置密码
     ========================================================== */

  
/**
 * 忘记密码第二步：
 * 使用 reset_token 设置新密码
 */
const handleForgotStepTwo = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (loading) {
    return;
  }

  setForgotError("");

  // 没有凭证，禁止重置
  if (!resetToken) {
    setForgotStep(1);
    setForgotError(
      "验证凭证不存在，请重新验证密保"
    );
    return;
  }

  // 前端辅助检查 5 分钟有效期
  if (
    !resetTokenExpiresAt ||
    Date.now() >= resetTokenExpiresAt
  ) {
    setResetToken("");
    setResetTokenExpiresAt(0);
    setForgotStep(1);

    setForgotError(
      "密保验证已超过 5 分钟，请重新验证"
    );
    return;
  }

  if (!isValidPassword(forgotNewPassword)) {
    setForgotError(
      "新密码至少 8 位，且必须包含字母和数字"
    );
    return;
  }

  if (
    forgotNewPassword !==
    forgotConfirmPassword
  ) {
    setForgotError(
      "两次输入的新密码不一致"
    );
    return;
  }

  setLoading(true);

  // 本次提交使用的凭证
  const currentToken = resetToken;

  try {
    await resetPasswordApi({
      reset_token: currentToken,
      new_password: forgotNewPassword,
    });

    // 重置成功，凭证已使用
    setResetToken("");
    setResetTokenExpiresAt(0);

    setForgotNewPassword("");
    setForgotConfirmPassword("");
    setForgotAnswers(["", "", ""]);

    setForgotSuccess(true);
  } catch (error) {
    // 重置失败后保守处理：
    // 不复用可能已经消耗的凭证
    setResetToken("");
    setResetTokenExpiresAt(0);
    setForgotStep(1);

    setForgotError(
      `${getErrorMessage(error)}。请重新验证密保后再试`
    );
  } finally {
    setLoading(false);
  }
};


  /* ==========================================================
     选择器
     ========================================================== */

  const choosePickerValue = (
    value: string
  ) => {
    if (picker === "month") {
      const month = Number(
        value.replace("月", "")
      );

      setBirthday((previous) => {
        const maxDay =
          MONTH_DAYS[month - 1];

        return {
          month,
          day:
            previous.day > maxDay
              ? 0
              : previous.day,
        };
      });
    } else if (picker === "day") {
      setBirthday((previous) => ({
        ...previous,
        day: Number(value),
      }));
    } else if (picker) {
      const index =
        picker === "q1"
          ? 0
          : picker === "q2"
            ? 1
            : 2;

      updateQuestion(
        index,
        "question",
        value
      );
    }

    setPicker(null);
  };

  /* ==========================================================
     游客模式
     ========================================================== */

  const enterGuestMode = () => {
    showDialog({
      kind: "guest-success",
      title: "已进入游客模式",
      description:
        "欢迎来访，开启与你的相遇。",
      buttonText: "知道了",
      footer: "2 秒后自动收起",
      autoClose: true,
    });
  };

  if (initializing || (enteredAuthenticated && isAuthenticated)) return null;

  if (guestEntered) {
    return (
      <main className="figma-auth-guest-page">
        <section className="figma-auth-guest-panel">
          <h1>游客模式</h1>

          <p>
            欢迎来访，开启与你的相遇。
          </p>

          <p>
            游客主页尚未接入，
            后续可在 App.tsx
            中配置公开访问的游客路由。
          </p>

          <button
            type="button"
            onClick={() => {
              setGuestEntered(false);
              switchMode("login");
            }}
          >
            返回登录
          </button>
        </section>
      </main>
    );
  }

  /* ==========================================================
     页面标题和装饰
     ========================================================== */

  const decorMode:
    "login" | "register" =
    mode === "register" ||
    mode === "profile"
      ? "register"
      : "login";

  const pageTitle =
    mode === "login"
      ? "登录"
      : mode === "register"
        ? "注册"
        : mode === "profile"
          ? "完善资料"
          : forgotStep === 1
            ? "忘记密码"
            : "重置密码";

  const englishTitle =
    mode === "login"
      ? "LOGIN"
      : mode === "register"
        ? "REGISTER"
        : mode === "profile"
          ? "PROFILE"
          : forgotStep === 1
            ? "RECOVER"
            : "RESET";

  /* ==========================================================
     页面渲染
     ========================================================== */

  return (
    <main
      className="figma-auth-page"
      style={isMobileLayout ? ({
        "--auth-mobile-scale": mobileScale,
        "--auth-mobile-result-scale": mobileResultTransformScale,
        "--auth-mobile-success-scale": mobileSuccessTransformScale,
        "--auth-mobile-picker-scale": mobilePickerTransformScale,
      } as CSSProperties) : undefined}
    >
      <div
        className="figma-auth-stage"
        style={
          isMobileLayout
            ? {
                width: MOBILE_FIGMA_WIDTH * mobileScale,
                height: MOBILE_FIGMA_HEIGHT * mobileScale,
                margin: "auto",
              }
            : {
                width: 600 * scale,
                height: windowHeight * scale,
              }
        }
      >
        <section
          className={`figma-auth-card figma-auth-card--${mode} ${
            mode === "forgot"
              ? `figma-auth-card--forgot-step${forgotStep}`
              : ""
          }`}
          style={
            isMobileLayout
              ? {
                  width: MOBILE_NATIVE_WIDTH,
                  height: MOBILE_NATIVE_HEIGHT,
                  minHeight: MOBILE_NATIVE_HEIGHT,
                  boxSizing: "border-box",
                  transform: `scale(${mobileMainTransformScale})`,
                  transformOrigin: "top left",
                }
              : {
                  width: 600,
                  height: windowHeight,
                  minHeight: windowHeight,
                  boxSizing: "border-box",
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }
          }
        >
          <Decorations
            mode={decorMode}
          />

          <div
            className="figma-auth-inner-border"
            aria-hidden="true"
          />

          {/* 关闭按钮 */}
          <button
            type="button"
            className="figma-auth-close"
            aria-label="关闭"
            onClick={() => {
              if (
                mode === "register" &&
                registerStep === 2
              ) {
                setRegisterStep(1);
              } else if (
                mode === "forgot"
              ) {
                returnToLogin();
              } else if (
                mode === "profile"
              ) {
                skipProfile();
              } else if (
                mode !== "login"
              ) {
                switchMode("login");
              } else {
                navigate(-1);
              }
            }}
          >
            <img
              src={asset(
                `${decorMode}-close.svg`
              )}
              alt=""
            />
          </button>

          {/* 页面标题 */}
          <header className="figma-auth-heading">
            <h1>{pageTitle}</h1>

            <span>
              {englishTitle}
            </span>
          </header>

          <div className="figma-auth-heading-rule" />

          {/* 登录、注册、资料页面错误 */}
          {mode !== "forgot" &&
            inlineError && (
              <p
                className="figma-auth-message is-error"
                role="alert"
              >
                {inlineError}
              </p>
            )}

          {/* ==================================================
              登录页面
              ================================================== */}

          {mode === "login" && (
            <form
              className="figma-auth-form figma-auth-form--login"
              onSubmit={handleLogin}
              noValidate
            >
              <InputField
                label="游戏 UID"
                placeholder="请输入《光与夜之恋》游戏 UID"
                icon="user"
                value={uid}
                onChange={setUID}
                maxLength={7}
                disabled={loading}
                autoComplete="username"
              />

              <InputField
                label="密码"
                placeholder="请输入密码"
                icon="lock"
                type="password"
                value={password}
                onChange={setPassword}
                disabled={loading}
                autoComplete="current-password"
              />

              <div className="figma-auth-input-group">
                <label className="figma-auth-label">
                  图片验证码
                </label>

                <div className="figma-auth-captcha-row">
                  <input
                    type="text"
                    value={captchaCode}
                    placeholder="请输入验证码"
                    onChange={(event) => {
                      setCaptchaCode(
                        event.target.value
                      );
                    }}
                    disabled={loading}
                  />

                  <div
                    className="figma-auth-captcha-image"
                    onClick={() => {
                      if (!captchaLoading) {
                        void refreshCaptcha();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();

                        if (!captchaLoading) {
                          void refreshCaptcha();
                        }
                      }
                    }}
                    aria-label="刷新图片验证码"
                  >
                    {captchaImage ? (
                      <img
                        src={captchaImage}
                        alt="图片验证码"
                      />
                    ) : (
                      <span>
                        {captchaLoading
                          ? "加载中"
                          : "暂无验证码"}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="figma-auth-captcha-refresh"
                  onClick={() => {
                    void refreshCaptcha();
                  }}
                  disabled={captchaLoading}
                >
                  ⟳ 点击图片刷新验证码
                </button>
              </div>

              <div className="figma-auth-keep-row">
                <label className="figma-auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(event) => {
                      setKeepLoggedIn(
                        event.target.checked
                      );
                    }}
                  />

                  <span>
                    保持登录状态
                  </span>
                </label>

                <button
                  type="button"
                  className="figma-auth-text-button"
                  onClick={() => {
                    switchMode("forgot");
                  }}
                >
                  忘记密码?
                </button>
              </div>

              <div className="figma-auth-checkbox-label figma-auth-agreement">
                <input
                  type="checkbox"
                  id="login-policy-consent"
                  checked={privacyAgreed}
                  onChange={(event) => {
                    setPrivacyAgreed(
                      event.target.checked
                    );
                  }}
                />

                <span>
                  <label htmlFor="login-policy-consent">我已阅读并同意</label>
                  <PolicyLinks />
                </span>
              </div>

              <button
                className="figma-auth-primary"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "登录中..."
                  : "登 录"}

                <img
                  src={asset(
                    "login-button-shine.svg"
                  )}
                  alt=""
                />
              </button>

              <div className="figma-auth-bottom-prompt">
                <span className="figma-auth-line" />

                <span>
                  还 没 有 账 号？
                </span>

                <span className="figma-auth-line" />
              </div>

              <div className="figma-auth-bottom-actions">
                <button
                  type="button"
                  className="figma-auth-secondary"
                  onClick={() => {
                    switchMode("register");
                  }}
                >
                  立即注册{"\u3000"}›
                </button>

                <button
                  type="button"
                  className="figma-auth-secondary figma-auth-secondary--guest"
                  onClick={enterGuestMode}
                >
                  游客模式{"\u3000"}›
                </button>
              </div>
            </form>
          )}

          {/* ==================================================
              注册页面
              ================================================== */}

          {mode === "register" && (
            <>
              <RegisterSteps
                step={registerStep}
              />

              {registerStep === 1 ? (
                <form
                  className="figma-auth-form figma-auth-form--register"
                  onSubmit={
                    handleRegisterStepOne
                  }
                  noValidate
                >
                  <InputField
                    label="游戏 UID"
                    placeholder="请输入《光与夜之恋》游戏 UID"
                    icon="user"
                    value={uid}
                    onChange={setUID}
                    maxLength={7}
                    hint="每个 UID 仅能注册一个账号，系统将检查是否已被使用。"
                  />

                  <InputField
                    label="设置密码"
                    placeholder="请输入密码"
                    icon="lock"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    hint="至少 8 位，需同时包含英文字母和数字，无需特殊符号。"
                  />

                  <InputField
                    label="确认密码"
                    placeholder="请再次输入密码"
                    icon="lock"
                    type="password"
                    value={confirmPassword}
                    onChange={
                      setConfirmPassword
                    }
                  />

                  <button
                    type="submit"
                    className="figma-auth-primary"
                  >
                    下一步 →

                    <img
                      src={asset(
                        "register-button-shine.svg"
                      )}
                      alt=""
                    />
                  </button>

                  <div className="figma-auth-register-footer">
                    <PolicyLinks />
                  </div>

                  <div className="figma-auth-register-footer">
                    已经有账号？

                    <button
                      type="button"
                      onClick={() => {
                        switchMode("login");
                      }}
                    >
                      立即登录{"\u3000"}›
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  className="figma-auth-form figma-auth-form--security"
                  onSubmit={
                    handleRegisterStepTwo
                  }
                  noValidate
                >
                  <div className="figma-auth-security-title">
                    <strong>
                      设置密保问题
                    </strong>

                    <span>
                      步骤 2/2
                    </span>
                  </div>

                  <p className="figma-auth-security-notice">
                    密保问题将用于忘记密码时的身份验证，
                    请填写不易被他人猜到、且自己能够记住的答案。
                    <PolicyLinks />
                  </p>

                  {questions.map(
                    (item, index) => (
                      <div
                        className="figma-auth-security-item"
                        key={index}
                      >
                        <label className="figma-auth-label">
                          密保问题
                          {
                            [
                              "一",
                              "二",
                              "三",
                            ][index]
                          }
                        </label>

                        <div
                          className="figma-auth-question-dropdown"
                          onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenQuestionIndex(null);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Escape") {
                              setOpenQuestionIndex(null);
                              event.currentTarget.querySelector<HTMLButtonElement>(".figma-auth-select-field")?.focus();
                            }
                            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                              event.preventDefault();
                              setOpenQuestionIndex(index);
                              const container = event.currentTarget;
                              const key = event.key;
                              requestAnimationFrame(() => {
                                const buttons = Array.from(container.querySelectorAll<HTMLButtonElement>(".figma-auth-question-option"));
                                const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
                                const next = key === "ArrowDown" ? (current + 1) % buttons.length : (current <= 0 ? buttons.length - 1 : current - 1);
                                buttons[next]?.focus();
                              });
                            }
                          }}
                        >
                          <button
                            type="button"
                            className="figma-auth-select-field"
                            aria-label={`密保问题${index + 1}`}
                            aria-expanded={openQuestionIndex === index}
                            aria-controls={`security-question-options-${index}`}
                            disabled={loading}
                            onClick={() => setOpenQuestionIndex(openQuestionIndex === index ? null : index)}
                          >
                            <span>{item.question || "请选择一个密保问题"}</span><span>⌄</span>
                          </button>
                          {openQuestionIndex === index && (
                            <div className="figma-auth-question-options" id={`security-question-options-${index}`}>
                              {SECURITY_QUESTION_POOL.filter((question) =>
                                !questions.some((selected, otherIndex) => otherIndex !== index && selected.question === question)
                              ).map((question) => (
                                <button
                                  type="button"
                                  key={question}
                                  className="figma-auth-question-option"
                                  aria-pressed={item.question === question}
                                  onClick={() => {
                                    updateQuestion(index, "question", question);
                                    setOpenQuestionIndex(null);
                                    document.querySelector<HTMLButtonElement>(`[aria-controls="security-question-options-${index}"]`)?.focus();
                                  }}
                                >{question}</button>
                              ))}
                            </div>
                          )}
                        </div>

                        <input
                          className="figma-auth-answer-field"
                          type="text"
                          value={item.answer}
                          placeholder="请输入答案"
                          onChange={(event) => {
                            updateQuestion(
                              index,
                              "answer",
                              event.target.value
                            );
                          }}
                        />
                      </div>
                    )
                  )}

                  <div className="figma-auth-security-actions">
                    <button
                      type="button"
                      className="figma-auth-back-button"
                      onClick={() => {
                        setRegisterStep(1);
                      }}
                    >
                      上一步
                    </button>

                    <button
                      type="submit"
                      className="figma-auth-primary"
                      disabled={loading}
                    >
                      {loading
                        ? "注册中..."
                        : "完成注册"}

                      <img
                        src={asset(
                          "register-button-shine.svg"
                        )}
                        alt=""
                      />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* ==================================================
              完善资料页面
              ================================================== */}

          {mode === "profile" && (
            <form
              className="figma-auth-form figma-auth-form--profile"
              onSubmit={handleProfile}
              noValidate
            >
              <div className="figma-auth-profile-notice">
                <strong>
                  ✓ 登录成功
                </strong>

                <p>
                  你可以完善个人资料，
                  也可以暂时跳过，
                  不影响网站功能使用。
                </p>
              </div>

              <section className="figma-auth-profile-section">
                <h2>
                  ✧ 设置昵称
                </h2>

                <label className="figma-auth-label">
                  网站昵称
                </label>

                <input
                  className="figma-auth-answer-field"
                  value={nickname}
                  onChange={(event) => {
                    setNickname(
                      event.target.value
                    );
                  }}
                  placeholder="请输入网站昵称"
                />

                <p className="figma-auth-hint">
                  首次设置不计入修改次数。
                </p>

                <p className="figma-auth-hint">
                  每自然年最多修改 5 次，每年 1 月 1 日重置。
                </p>
              </section>

              <section className="figma-auth-profile-section">
                <h2>
                  ♧ 设置生日
                </h2>

                <p className="figma-auth-hint">
                  在特别的日子，为你准备一份生日祝福。
                </p>

                <div className="figma-auth-birthday-row">
                  <div>
                    <label className="figma-auth-label">
                      月份
                    </label>

                    <button
                      type="button"
                      className="figma-auth-select-field"
                      onClick={() => {
                        setPicker("month");
                      }}
                    >
                      {birthday.month
                        ? `${birthday.month}月`
                        : "选择月份"}

                      <span>⌄</span>
                    </button>
                  </div>

                  <div>
                    <label className="figma-auth-label">
                      日期
                    </label>

                    <button
                      type="button"
                      className="figma-auth-select-field"
                      onClick={() => {
                        setPicker("day");
                      }}
                    >
                      {birthday.day
                        ? `${birthday.day}日`
                        : "选择日期"}

                      <span>⌄</span>
                    </button>
                  </div>
                </div>

                <p className="figma-auth-hint">
                  生日信息用于网站生日祝福功能。
                </p>
              </section>

              <button
                type="submit"
                className="figma-auth-primary"
                disabled={loading}
              >
                {loading
                  ? "提交中..."
                  : "完成设置 →"}

                <img
                  src={asset(
                    "register-button-shine.svg"
                  )}
                  alt=""
                />
              </button>

              <button
                type="button"
                className="figma-auth-text-button figma-auth-profile-skip"
                onClick={skipProfile}
                disabled={loading}
              >
                暂时跳过，直接进入主页
              </button>
            </form>
          )}

          {/* ==================================================
              忘记密码第一步
              Figma 600 × 1080
              ================================================== */}

          {mode === "forgot" &&
            forgotStep === 1 && (
              <>
                <ForgotSteps step={1} />

                <form
                  className="figma-auth-forgot-form figma-auth-forgot-form--verify"
                  onSubmit={
                    handleForgotStepOne
                  }
                  noValidate
                >
                  <div className="figma-auth-forgot-divider" />

                  <div className="figma-auth-forgot-field-group">
                    <label className="figma-auth-forgot-label">
                      游戏 UID
                    </label>

                    <div className="figma-auth-forgot-input-shell">
                      <img
                        src={asset(
                          "login-user.svg"
                        )}
                        alt=""
                        className="figma-auth-forgot-input-icon"
                      />

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={7}
                        value={forgotUID}
                        placeholder="请输入注册时使用的游戏 UID"
                        onChange={(event) => {
                          handleForgotUIDChange(
                            event.target.value
                          );
                        }}
                        disabled={
                          forgotQuestionsLoading
                        }
                      />
                    </div>

                    <p className="figma-auth-forgot-hint">
                      输入 UID 后，在下方显示对应的密保问题。
                    </p>

                    <button
                      type="button"
                      className="figma-auth-forgot-fetch"
                      onClick={() => {
                        void fetchForgotQuestions();
                      }}
                      disabled={
                        forgotQuestionsLoading
                      }
                    >
                      {forgotQuestionsLoading
                        ? "正在查询密保问题..."
                        : "查询密保问题"}
                    </button>
                  </div>

                  <h2 className="figma-auth-forgot-security-heading">
                    <span className="figma-auth-forgot-shield">
                      ♢
                    </span>

                    密保验证
                  </h2>

                  {[0, 1, 2].map(
                    (index) => (
                      <div
                        className="figma-auth-forgot-question"
                        key={index}
                      >
                        <label className="figma-auth-forgot-label">
                          密保问题 0
                          {index + 1}
                        </label>

                        <div className="figma-auth-forgot-question-text">
                          {forgotQuestions
                            ? forgotQuestions[index]
                            : `显示注册时设置的第 ${
                                index + 1
                              } 个问题`}
                        </div>

                        <input
                          type="text"
                          className="figma-auth-forgot-answer"
                          value={
                            forgotAnswers[index]
                          }
                          placeholder="请输入密保答案"
                          disabled={
                            !forgotQuestions
                          }
                          autoComplete="off"
                          onChange={(event) => {
                            updateForgotAnswer(
                              index,
                              event.target.value
                            );
                          }}
                        />
                      </div>
                    )
                  )}

                  {forgotError && (
                    <p
                      className="figma-auth-forgot-error"
                      role="alert"
                    >
                      {forgotError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="figma-auth-forgot-primary"
                    disabled={!forgotQuestions || loading}
                  >
                    {loading ? "正在验证..." : "验证并继续 →"}

                    <img
                      src={asset(
                        "login-button-shine.svg"
                      )}
                      alt=""
                    />
                  </button>

                  <button
                    type="button"
                    className="figma-auth-forgot-back"
                    onClick={
                      returnToLogin
                    }
                  >
                    ‹ 返回登录
                  </button>
                </form>
              </>
            )}

          {/* ==================================================
              忘记密码第二步
              Figma 600 × 720
              ================================================== */}

          {mode === "forgot" &&
            forgotStep === 2 && (
              <>
                <ForgotSteps step={2} />

                <form
                  className="figma-auth-forgot-form figma-auth-forgot-form--reset"
                  onSubmit={
                    handleForgotStepTwo
                  }
                  noValidate
                >
                  <div className="figma-auth-forgot-divider" />

                  <div className="figma-auth-forgot-reset-notice">
                    <span className="figma-auth-forgot-notice-icon">
                      ✓
                    </span>

                    <span>
                      密保验证已通过，请在 5 分钟内设置新密码。
                      验证凭证仅可使用一次。
                    </span>
                  </div>

                  <div className="figma-auth-forgot-password-fields">
                    <InputField
                      label="新密码"
                      placeholder="请输入新密码"
                      icon="lock"
                      type="password"
                      value={
                        forgotNewPassword
                      }
                      onChange={
                        setForgotNewPassword
                      }
                      disabled={loading}
                    />

                    <p className="figma-auth-forgot-hint">
                      至少 8 位，需同时包含英文字母和数字。
                    </p>

                    <InputField
                      label="确认新密码"
                      placeholder="请再次输入新密码"
                      icon="lock"
                      type="password"
                      value={
                        forgotConfirmPassword
                      }
                      onChange={
                        setForgotConfirmPassword
                      }
                      disabled={loading}
                    />
                  </div>

                  {forgotError && (
                    <p
                      className="figma-auth-forgot-error"
                      role="alert"
                    >
                      {forgotError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="figma-auth-forgot-primary"
                    disabled={loading}
                  >
                    {loading
                      ? "正在重置..."
                      : "确认重置"}

                    <img
                      src={asset(
                        "login-button-shine.svg"
                      )}
                      alt=""
                    />
                  </button>

                  <button
                    type="button"
                    className="figma-auth-forgot-back"
                    disabled={loading}
                    onClick={() => {
                      forgotRequestVersionRef.current += 1;
                      setResetToken("");
                      setResetTokenExpiresAt(0);
                      setForgotError("");
                      setForgotStep(1);
                    }}
                  >
                    ‹ 返回身份验证
                  </button>
                </form>
              </>
            )}
        </section>
      </div>

      {/* ======================================================
          月份、日期、注册密保问题选择弹窗
          ====================================================== */}

      {picker && (
        <Picker
          type={picker}
          month={
            birthday.month || null
          }
          onChoose={
            choosePickerValue
          }
          onClose={() => {
            setPicker(null);
          }}
        />
      )}

      {/* ======================================================
          登录、注册、完善资料结果弹窗
          ====================================================== */}

      {dialog && (
        <ResultDialog
          dialog={dialog}
          onConfirm={
            confirmDialog
          }
        />
      )}

      {/* ======================================================
          忘记密码重置成功弹窗
          ====================================================== */}

      {forgotSuccess && (
        <ForgotSuccessDialog
          onBackToLogin={
            returnToLogin
          }
        />
      )}
    </main>
  );
}
