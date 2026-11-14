# 糖果屋接口接入

页面现已使用真实请求，不再默认加载 Figma 示例商品或浏览器持有记录。入口场景保持可用，打开图鉴后加载接口数据。

## 宿主登录接入

宿主登录项目位于 `D:/garage-game`。其中 `src/api/client.ts` 已导出 `getAccessToken()`，会按「记住登录」选项从正确的存储读取 token。将图鉴挂载到宿主的 React 应用后，在渲染 ArchivePage 前调用：

```ts
import { configureCandyApi } from './candy-runtime';
import { getAccessToken } from './api/client'; // 此示例假设接入代码位于宿主 src 目录
configureCandyApi({
  getToken: getAccessToken,
  baseUrl: '/api',
  updateOwnPath: '/candy/goods/updateown',
});
```

宿主使用 `/login` 页面处理登录和注册，开发环境的 `/api` 已代理到同一云端后端。两个项目目前是独立站点；如果用不同端口分别打开，浏览器不会共享登录存储。联调登录后保存记录时，应在同一个宿主站点内挂载图鉴，不要通过 URL 传递 token。

当前项目没有登录模块，默认以游客身份请求图鉴列表和详情。按《糖果屋2.md》，游客的持有状态、数量和总价值均为 0。配置登录 token 后，请求会携带 Bearer token。更新记录、收藏柜和管理员接口要求登录。

开发环境 `/api` 通过 Vite 代理到 `http://115.159.121.83:8001`，移动设备访问前端时也由开发服务器代理。生产环境需由网关设置相同 `/api` 反向代理，或设置 `VITE_CANDY_API_BASE_URL` 并由后端允许跨域；不能把用户手机的 127.0.0.1 当成后端服务器。

已通过云服务器 OpenAPI 确认更新接口为 `/candy/goods/updateown`。认证为 OAuth2 password，tokenUrl 为 `/login`。不会自动轮流尝试其他写入路径。

## 已接线

- 列表：keyword、category、sort、filter_mode、page；250ms 请求延迟，取消旧请求，滚动追加服务端下一页。
- 详情：点击商品使用真实数值 ID 请求，切换时取消旧详情，展示名称、图片、系列、分类、尺寸、材质、持有记录。
- 保存/收藏：使用真实 ID POST；同一商品保存期间防止重复提交；失败不提交本地状态；成功后重新加载当前筛选第一页。
- 默认排序 newest，收藏 collect_first，持有 own_first；分页大小由后端响应控制。
- own_status 单枚举：拥有为1，收藏为2，无为0。收藏会取消拥有，设置拥有会取消收藏。由后端契约决定能否支持同时拥有和收藏。
- total_value 按文档的非负整数原样提交，不擅自进行元/分转换；小数会被接口层拒绝。价格单位仍需后端确认。
- 管理员增删改、收藏柜请求方法已提供；当前没有这些页面，不新增未经设计的入口，也不会自动执行管理员操作。

## 验证范围

生产构建、请求契约自动检查。云服务器 OpenAPI 已返回 HTTP 200，更新路径已核实；当前缺少真实登录 token，因此尚未完成登录后的实际联调；不能将构建通过等同于后端联调通过。

## 后端待确认

联调地址及认证来源、准确更新路径、收藏与拥有是否独立、价格单位与精度、分类枚举与UI标签映射。当前分类按UI原文字传入，不猜测“纸片=色纸”等映射。


