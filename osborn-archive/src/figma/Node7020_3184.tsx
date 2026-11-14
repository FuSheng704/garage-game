const img = "/assets/figma/b26ac60c-610f-424f-9578-be4d5f608edc.png";
const imgChatGpt202610260746501 = "/assets/figma/5c094824-3997-434f-8af1-d20dcf35f182.png";
const img2 = "/assets/figma/609f676f-61fe-4733-8ae0-83c2d1f1470a.png";
const img1 = "/assets/figma/773dc865-9c88-494d-9463-181a264feb68.svg";
const imgHeart = "/assets/figma/c23715f2-d8c1-4318-a338-b3c675caecf8.svg";

export default function a1() {
  return (
    <button className="block cursor-pointer relative size-full" data-node-id="7020:3184" data-name="商品卡片 / 困兽a1 / 交互">
      <div className="absolute h-[77.273px] left-0 top-0 w-[85px]" data-node-id="7020:3185" data-name="商品卡片 / 困兽a1">
        <div className="absolute h-[91.01px] left-[-6.87px] top-[-6.87px] w-[98.737px]" data-node-id="I7020:3185;4774:1006" data-name="垫纸图片 / 独立档案卡纸">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
        </div>
        <div className="absolute aspect-[1254/1254] left-[-5.56%] right-[-1.52%] top-[-6.44px]" data-node-id="I7020:3185;4774:1007" data-name="ChatGPT 图像 2026年10月26日 07_46_50 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover opacity-[57%] pointer-events-none size-full" src={imgChatGpt202610260746501} />
        </div>
        <div className="absolute h-[73.838px] left-[1.72px] top-[1.72px] w-[81.566px]" data-node-id="I7020:3185;4774:1008" data-name="卡纸压边轮廓">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={img1} />
        </div>
        <div className="-translate-x-1/2 absolute left-[calc(50%-0.5px)] size-[53.232px] top-[6.44px]" data-node-id="I7020:3185;4774:1033" data-name="商品图片 / 独立替换 · 保持完整">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={img2} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[12.02px] justify-center leading-[0] left-[42.5px] text-[3.69px] text-[color:var(--archive-ink,#161811)] text-center top-[68.26px] w-[74.697px]" data-node-id="I7020:3185;4774:1010">
          <p className="leading-[5.897px]">困兽a1</p>
        </div>
        <div className="absolute cursor-pointer left-[6.01px] size-[9.444px] top-[56.24px]" data-node-id="I7020:3185;4774:1011" role="button" tabIndex={0} data-name="图标 / heart">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHeart} />
        </div>
      </div>
      <div className="absolute border-[#4d7aad] border-[0.647px] border-solid h-[77.273px] left-0 rounded-[1.294px] top-0 w-[85px]" data-node-id="7020:3186" data-name="当前卡片 / 雾蓝描边" />
      <div className="absolute bg-[rgba(255,255,255,0)] left-0 size-[26.951px] top-[50.32px]" data-node-id="7020:3189" role="button" tabIndex={0} data-name="收藏 / 点击切换" />
      <div className="absolute h-[46.646px] left-0 top-0 w-[85px]" data-node-id="7292:3589" role="button" tabIndex={0} data-name="新版移动端 / 双击收藏 0" />
    </button>
  );
}

