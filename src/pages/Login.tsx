import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Login.css";

type Mode = "login" | "register";

type FieldProps = {
  icon: string;
  iconClass: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
  disabled?: boolean;
  passwordToggle?: boolean;
  eyeIcon?: string;
};

const asset = (filename: string) => `/figma-auth/${filename}`;

function AuthField({
  icon,
  iconClass,
  placeholder,
  value,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
  disabled,
  passwordToggle = false,
  eyeIcon = "register-eye.svg",
}: FieldProps) {
  const [visible, setVisible] = useState(false);
  const effectiveType = passwordToggle && visible ? "text" : type;

  return (
    <div className="figma-auth-field">
      <span className="figma-auth-field-icon" aria-hidden="true">
        <img src={asset(icon)} className={iconClass} alt="" />
      </span>
      <input
        aria-label={placeholder}
        type={effectiveType}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        maxLength={maxLength}
        disabled={disabled}
      />
      {passwordToggle && (
        <button
          className="figma-auth-eye"
          type="button"
          aria-label={visible ? "隐藏密码" : "显示密码"}
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
        >
          <img src={asset(eyeIcon)} alt="" />
        </button>
      )}
    </div>
  );
}

function FigmaDecorations({ mode }: { mode: Mode }) {
  if (mode === "register") {
    return (
      <div className="figma-auth-decor" aria-hidden="true">
        <img className="figma-auth-paper" src={asset("register-paper.svg")} alt="" />
        <img className="figma-auth-register-top-left" src={asset("register-top-left.png")} alt="" />
        <img className="figma-auth-register-flower" src={asset("register-flower.png")} alt="" />
        <img className="figma-auth-register-bottom-right" src={asset("register-bottom-right.png")} alt="" />
        <img className="figma-auth-register-bottom-left" src={asset("register-bottom-left.png")} alt="" />
        <img className="figma-auth-register-arc" src={asset("register-left-arc.svg")} alt="" />
        <img className="figma-auth-register-star1" src={asset("register-star1.svg")} alt="" />
        <img className="figma-auth-register-star2" src={asset("register-star2.svg")} alt="" />
        <img className="figma-auth-register-star3" src={asset("register-star3.svg")} alt="" />
        <img className="figma-auth-register-right-small" src={asset("register-right-small.png")} alt="" />
      </div>
    );
  }

  return (
    <div className="figma-auth-decor" aria-hidden="true">
      <img className="figma-auth-paper" src={asset("login-paper.svg")} alt="" />
      <img className="figma-auth-login-top-left" src={asset("login-top-left.png")} alt="" />
      <img className="figma-auth-login-flower" src={asset("login-flower.png")} alt="" />
      <img className="figma-auth-login-bottom-right" src={asset("login-bottom-right.png")} alt="" />
      <img className="figma-auth-login-bottom-left" src={asset("login-bottom-left.png")} alt="" />
      <img className="figma-auth-login-arc" src={asset("login-left-arc.svg")} alt="" />
      <img className="figma-auth-login-stars" src={asset("login-stars.svg")} alt="" />
      <img className="figma-auth-login-right-small" src={asset("login-right-small.png")} alt="" />
    </div>
  );
}

export default function Login() {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<Mode>("login");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [userAgreed, setUserAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === "undefined" ? 600 : window.innerWidth,
  );

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const switchMode = (next: Mode) => {
    setMode(next);
    setMessage("");
    setIsError(false);
    setPassword("");
    setConfirmPassword("");
  };

  const fail = (text: string) => {
    setIsError(true);
    setMessage(text);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    const cleanUsername = username.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();

    if (!cleanUsername || !password) {
      fail("请输入用户名和密码");
      return;
    }

    if (mode === "register") {
      if (!/^1[3-9]\d{9}$/.test(cleanPhone)) {
        fail("请输入正确的手机号");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        fail("请输入正确的邮箱地址");
        return;
      }
      if (password !== confirmPassword) {
        fail("两次输入的密码不一致");
        return;
      }
      if (!userAgreed) {
        fail("请先同意用户协议");
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login({ username: cleanUsername, password });
        const from =
          (location.state as { from?: { pathname?: string } } | null)?.from
            ?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        // 仅调整页面表现。后端注册接口尚未确认支持 phone/email，
        // 因此此处保留原有 register 调用，避免擅自更改 API 协议。
       await register({
         username: username.trim(),
         password,
         phone: phone.trim(),
         email: email.trim(),
       });
        switchMode("login");
        setPhone("");
        setEmail("");
        setUserAgreed(false);
        setMessage("注册成功，请登录");
      }
    } catch (error) {
      fail(error instanceof Error ? error.message : "请求失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  const scale = Math.min(1, Math.max(0.1, (viewportWidth - 32) / 600));
  const cardHeight = mode === "register" ? 820 : 640;

  return (
    <main className="figma-auth-page">
      <div
        className="figma-auth-stage"
        style={{ width: 600 * scale, height: cardHeight * scale }}
      >
        <section
          className={`figma-auth-card figma-auth-card--${mode}`}
          style={{ transform: `scale(${scale})` }}
          aria-label={mode === "register" ? "注册" : "登录"}
        >
          <FigmaDecorations mode={mode} />
          <div className="figma-auth-inner-border" aria-hidden="true" />

          <button
            type="button"
            className="figma-auth-close"
            aria-label="关闭"
            onClick={() => navigate(-1)}
          >
            <img src={asset(mode === "register" ? "register-close.svg" : "login-close.svg")} alt="" />
          </button>

          <header className="figma-auth-heading">
            <h1>{mode === "register" ? "注册" : "登录"}</h1>
            <span>{mode === "register" ? "R E G I S T E R" : "L O G I N"}</span>
          </header>
          <div className="figma-auth-heading-rule" aria-hidden="true" />

          {message && (
            <p
              role={isError ? "alert" : "status"}
              className={`figma-auth-message ${isError ? "is-error" : ""}`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className={`figma-auth-fields figma-auth-fields--${mode}`}>
              <AuthField
                icon={mode === "register" ? "register-user.svg" : "login-user.svg"}
                iconClass="figma-auth-icon-user"
                placeholder={mode === "register" ? "请输入用户名" : "请输入账号"}
                value={username}
                onChange={setUsername}
                autoComplete="username"
                disabled={loading}
              />

              {mode === "register" && (
                <>
                  <AuthField
                    icon="register-phone.svg"
                    iconClass="figma-auth-icon-phone"
                    placeholder="请输入手机号"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    autoComplete="tel"
                    maxLength={11}
                    disabled={loading}
                  />
                  <AuthField
                    icon="register-email.svg"
                    iconClass="figma-auth-icon-email"
                    placeholder="请输入邮箱"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    autoComplete="email"
                    disabled={loading}
                  />
                </>
              )}

              <AuthField
                icon={mode === "register" ? "register-lock.svg" : "login-lock.svg"}
                iconClass="figma-auth-icon-lock"
                placeholder="请输入密码"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                disabled={loading}
                passwordToggle
                eyeIcon={mode === "register" ? "register-eye.svg" : "login-eye.svg"}
              />

              {mode === "register" && (
                <AuthField
                  icon="register-lock.svg"
                  iconClass="figma-auth-icon-lock"
                  placeholder="请再次输入密码"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  autoComplete="new-password"
                  disabled={loading}
                  passwordToggle
                />
              )}
            </div>

            {mode === "login" && (
              <div className="figma-auth-keep-row">
                <label className="figma-auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(event) => setKeepLoggedIn(event.target.checked)}
                  />
                  <span>保持登录状态</span>
                </label>
                <span className="figma-auth-link">忘记密码?</span>
              </div>
            )}

            <div className={`figma-auth-agreement figma-auth-agreement--${mode}`}>
              <label className="figma-auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={mode === "register" ? userAgreed : privacyAgreed}
                  onChange={(event) =>
                    mode === "register"
                      ? setUserAgreed(event.target.checked)
                      : setPrivacyAgreed(event.target.checked)
                  }
                />
                <span>我已阅读并同意</span>
              </label>
              <span className="figma-auth-link">
                {mode === "register" ? "《用户协议》" : "《隐私协议》"}
              </span>
            </div>

            <button
              className={`figma-auth-primary figma-auth-primary--${mode}`}
              type="submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "请稍候..."
                  : mode === "register"
                    ? "完成注册"
                    : "登 录"}
              </span>
              <img
                src={asset(mode === "register" ? "register-button-shine.svg" : "login-button-shine.svg")}
                alt=""
                aria-hidden="true"
              />
            </button>
          </form>

          <div className={`figma-auth-bottom-prompt figma-auth-bottom-prompt--${mode}`}>
            <span className="figma-auth-line" />
            <span>{mode === "register" ? "已 经 有 账 号？" : "还 没 有 账 号？"}</span>
            <span className="figma-auth-line" />
          </div>
          <button
            type="button"
            className={`figma-auth-secondary figma-auth-secondary--${mode}`}
            onClick={() => switchMode(mode === "register" ? "login" : "register")}
          >
            <span>{mode === "register" ? "立即登录" : "立即注册"}</span>
            <img src={asset(mode === "register" ? "register-arrow.svg" : "login-arrow.svg")} alt="" aria-hidden="true" />
          </button>
        </section>
      </div>
    </main>
  );
}
