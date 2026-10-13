# 维修区讯号：列表页 + 详情页（按两张截图修改）

本包在上一版列表页的基础上，新增按第二张设计截图制作的详情页。项目仍使用 React + TypeScript + CSS，**不需要下载图片或安装新依赖**。

## 文件

- `src/GasStationList.tsx`：列表和详情两种界面，包含原有交互逻辑
- `src/GasStationList.css`：两张设计稿对应的布局样式

## 使用的本地素材

代码直接导入项目现有的图片（与原始 `GasStationList.tsx` 的导入路径一致）：

- `src/assets/pit-main-bg.png`：开屏背景
- `src/assets/pit-bg.jpg`：车库背景
- `src/assets/glitter-bullet.png`：徽章装饰
- `src/assets/helmet.png`：赛车头盔
- `src/assets/osborn-table-bg.png`：OSBORN 徽章/水印
- `src/assets/osborn-hand.png`：详情页签名

**以上素材需已存在于你的 Windows 项目中。** 本 ZIP 不复制或重新下载它们；图片的实际视觉效果取决于你本地已有的素材文件。

## Windows PowerShell 操作（项目目录 D:\\garage-game）

1. 把下载的 `pit-figma-both-pages.zip` 放到 `D:\\garage-game`。
2. 在 VS Code 的 PowerShell 终端依次运行：

```powershell
cd D:\garage-game
Copy-Item .\src\GasStationList.tsx .\src\GasStationList.tsx.bak -Force
Expand-Archive .\pit-figma-both-pages.zip .\pit-figma-both-temp -Force
Copy-Item .\pit-figma-both-temp\src\GasStationList.tsx .\src\GasStationList.tsx -Force
Copy-Item .\pit-figma-both-temp\src\GasStationList.css .\src\GasStationList.css -Force
npm run dev
```

如果开发服务器已经在运行，保存文件后 Vite 通常会自动刷新，不必重复启动。

## 交互和数据说明

- 保留开屏、列表搜索、分类与年月筛选、点击记录打开详情、点击详情左侧表头返回完整列表、点击左侧其他记录切换详情、标题点击折叠/展开、复制文本/链接、BGM。
- 详情页在设计稿中没有显示搜索框，因此打开详情时隐藏顶部搜索框，返回列表后恢复。
- **保留原来的 7 条 `mockBackendDb` 记录，不会添加截图中第 8 条不存在的数据。** 也不改变原有 `content` 维权文案字段。
- 现有模拟后端数据未包含 `issue`、`demand` 字段。为了让第一条本地模拟记录的详情页面在视觉上对应截图，第一条的概述/问题点/诉求使用了截图中可读到的展示文案；其他记录仍使用原来的占位提示。这些文字不是后端返回的数据，接入正式接口时应替换。
- 现有模拟数据没有处理状态字段，所以列表中的状态仍来自原逻辑（默认为「未处理」），不会假造「已修改」「有回应」。
- `public/bgm.mp3` 需要实际存在才能播放背景音乐。
- 按 1591 × 895 设计舞台定位，并随窗口大小等比缩放；不增加 Figma 截图外的视觉组件。

## 检查方法

进入「维修区讯号」列表，点击第一条「萧逸26年生日相关」进入详情。核对顶部大标题、左侧窄列表、概述/问题点、具体诉求/维权文案、当前进展和右下角头盔。点击左侧「维权标题」可返回完整列表。
