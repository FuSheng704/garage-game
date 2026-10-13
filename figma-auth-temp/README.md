# Figma 登录 / 注册页面复刻（React + Vite + TypeScript）

对应 Figma 节点：
- 注册：`1282:1841`（600 × 820）
- 登录：`1282:1799`（600 × 640，原设计同文件）

## 复制到现有 `garage-game` 项目

将压缩包内的 `src/pages/Login.tsx`、`src/pages/Login.css`、`download-assets.ps1` 按相同目录复制到你的 `D:\garage-game` 项目。**建议先备份现有 Login.tsx。**

在 VS Code 的 PowerShell 终端中执行：

```powershell
cd D:\garage-game
powershell -ExecutionPolicy Bypass -File .\download-assets.ps1
npm run dev
```

资源下载完成后应在 `public/figma-auth/` 下生成 32 个 Figma 原始 PNG / SVG 文件。文件名与 `Login.tsx` 中的引用一一对应。

**注意**：Figma MCP 资源链接约 7 天后过期，建议尽快运行脚本。若链接失效，需要从 Figma 重新导出对应素材。压缩包内提供自动下载脚本，但由于本次文件生成环境无法访问 Figma 资源主机，压缩包中没有预先打包这些原始图片；不能把空文件当作已下载的图片。

## 范围

- 只修改登录/注册页面表现，使用 Figma 的原始字体样式、尺寸、配色、图层坐标和静态素材。
- 保留现有 `useAuth().login` 和 `useAuth().register` 调用。
- 当前后端注册接口仍未确认支持 `phone`、`email`，因此仅收集和校验它们，暂不发送这两个字段；后续需要修改后端和类型定义。
- Figma 的“忘记密码”、协议文本没有提供目标链接，保持原有视觉，不伪造路由。
- 字体采用 Google Fonts 的 Noto Serif SC 在线 CSS；若网络无法访问该字体服务，浏览器将使用本地字体回退。未附带任何字体文件。
