# 认证后端验证记录

日期：2026-11-11。目标：项目 Vite 代理配置 http://115.159.121.83:8001；不代表其他环境。
依据：登录注册.md 和 萧与逸之恋.docx。使用无凭据与伪造 Token，不操作真实账号。

| 用例 | 实际结果 | 结论 |
| --- | --- | --- |
| GET /user/info 无 Token | 401，JSON detail | 符合 |
| GET /user/info 伪造 Token | 500，text/plain Internal Server Error | 不符合无效 Token 返回 401 的约定 |
| POST /logout 伪造 Token | 200，code/msg 成功 | 不符合无效 Token 返回 401 的约定 |
| POST /login 空 JSON | 422，detail 数组列出四个必填字段 | 符合 |
| GET /captcha/image | 200，PNG；响应头 Xcaptchakey | 前端已兼容该别名 |

验证码响应未观察到 Access-Control-Expose-Headers；本次为命令行请求，未证明带 Origin 的浏览器 CORS 行为。同源 /api 代理不需要浏览器跨域读取后端。

未验证：有效登录、真实过期 Token、普通账号管理员接口 403、登出后重放 Token、重复登出、密保和资料修改。需要专用测试账号与管理员接口路径，不可把这些项标记通过。

文档缺口：DOCX 将 user/info、密保查询及校验响应写为 string，未明确实际对象字段；生日请求体仅写 {}。需补充 profile_finished、三个密保问题、reset_token、生日格式的正式契约。
