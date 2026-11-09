# 应用层认证接入说明

## 职责边界
AuthContext 负责 Token 恢复、登录状态和用户资料；登录页负责登录流程及 redirect 解析；萧逸家、心愿盒、加油站等业务模块负责受限操作判断和自身登录弹窗。普通前台不使用全局路由守卫。

## redirect 协议
业务模块调用 `useGoLogin()`，目标为当前完整 `pathname + search + hash`，通过 `encodeURIComponent` 放入 `/login?redirect=`。禁止使用 `location.state`。登录页仅接受站内绝对路径，拒绝外链、`//`、`/login`，非法或缺失目标回到 `/home`。

## 认证状态
`useAuth()` 保留原有字段，并额外暴露 `isLogin`（等同 `isAuthenticated`）和 `isLoading`（等同 `initializing`）。初始化期间不要把用户当游客；`user=null` 也不等同未登录。

## 业务调用示例
```tsx
const goLogin = useGoLogin();
if (!isLogin && !isLoading) { setShowLoginDialog(true); }
// 弹窗确认后：goLogin();
```

登录成功及资料完善后使用 `navigate(redirect, { replace: true })`，不重复执行原受限操作。

## 退出与缓存
沿用现有 logout 行为：清除本地 Token 并更新 Context；本次不清空全局 QueryClient，业务 Query 缓存隔离与管理员权限字段仍为 OPEN。

## 自测清单
- 无 Token 启动、初始化中公开页面可访问
- 有 Token 启动及 401 状态同步
- 网络失败不误判游客
- query/hash 完整回跳
- 直接 `/login`、已登录 `/login`
- 非法 redirect（外链、`//`、`/login`）回 `/home`
- 登录失败留在登录页
- 资料完善后仍回原目标
- 业务模块弹窗确认后进入登录

以上浏览器验收需区分 mock 与真实后端联调。
