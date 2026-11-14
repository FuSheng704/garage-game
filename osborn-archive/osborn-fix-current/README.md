# 官谷档案 · TSX 页面复刻

## 启动

```bash
npm install
npm run dev
```

默认以办公室背景展示档案界面，桌面设计基础画板尺寸为 1464×1086。

## 接入已有 React + Vite + TypeScript 项目

1. 将 `public/assets/` 整个文件夹复制到已有项目的 `public/assets/`。
2. 将 `src/OsbornArchive.tsx` 与 `src/OsbornArchive.css` 复制到已有项目 `src/` 中。
3. 在路由页面中 `import OsbornArchive from './OsbornArchive'` 并渲染 `<OsbornArchive />`。
4. 安装依赖 `npm install lucide-react`。

## 行为与数据说明

- 类别导航、左侧筛选、搜索、排序、卡片收藏、右侧拥有状态/数量/价格编辑和保存可操作。
- 默认使用16条 NAME 占位档案，与设计图空白版本一致；产品名称、类别、尺寸、系列、材质应替换为后端真实数据。
- 暂时使用浏览器 localStorage 保存数据，没有伪造后端接口。
- 素材全部来自用户提供的PNG，未把完整Figma截图作为UI背景。
- 已加入后续补充的左下角锚浪透明装饰、档案纸堆插画、LONGDAY 印记、航海纹章和金色花角素材。
- 左侧四枚标签按用户给出的 Figma 标注（标签组 83×696 px）定位。
- 新增图片均为独立透明素材，并非将 Figma 界面截图当作网页。
- 目前给出的截图不包含商品档案数据库或保存 API，因此不是后端集成版本。

## 本次更新

- 直接使用最新提供的 `anchor-wave-corner.png`、`detail-paper-stack.png`、`longday-stamp.png`、`ornament-floral-top.png`、`ornament-medallion.png`。
- 先前保存于 `localStorage` 的收藏和商品记录不会因覆盖代码而清空（在同一个域名和端口访问时）。
- 本版本为基于截图和上传素材的静态还原，非通过 Figma Dev Mode 自动获取完整图层信息，可能仍需截图验收微调。


## Figma 尺寸修订（2026-10-29）
- 商品卡片：198×180 px；四列排列。
- 左侧档案标签：整体 83×696 px。
- 右侧主插画：323×274 px；距离右面板上方 71 px、左边 31 px。
- 记录行：36 px；保存按钮：365×48 px。
- 点击右侧商品名称可编辑；鼠标移到右侧主插画位置会显示“＋商品图”，可临时选择本地图片（图片暂不持久化）。
- 其余数据继续使用 localStorage。
- 统一按 1464×1086 的画板缩放，避免页面超出浏览器。
