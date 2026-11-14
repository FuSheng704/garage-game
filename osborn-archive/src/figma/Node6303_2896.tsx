const img = "/assets/figma/38eab712-b3c1-4165-996b-6df634acab95.png";
const imgChatGpt202610260746501 = "/assets/figma/4ea866f9-3e01-433e-8d48-31106f024f53.png";
const img2 = "/assets/figma/fa358b88-fbd5-4687-85a0-442dca1fbb9e.png";
const img1 = "/assets/figma/a117c115-25ea-40e9-9d74-372ac6c900e8.svg";
const imgHeart = "/assets/figma/53d7aaeb-5445-4a78-8e99-e350dde2ddb0.svg";

export default function a1() {
  return (
    <button className="block cursor-pointer relative size-full" data-node-id="6303:2896" data-name="商品卡片 / 困兽a1 / 交互">
      <div className="absolute h-[179.139px] left-0 top-0 w-[197.053px]" data-node-id="6301:2224" data-name="商品卡片 / 困兽a1">
        <div className="absolute h-[210.986px] left-[-15.92px] top-[-15.92px] w-[228.9px]" data-node-id="I6301:2224;4774:1006" data-name="垫纸图片 / 独立档案卡纸">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img} />
        </div>
        <div className="absolute aspect-[1254/1254] left-[-5.56%] right-[-1.52%] top-[-14.93px]" data-node-id="I6301:2224;4774:1007" data-name="ChatGPT 图像 2026年10月26日 07_46_50 1">
          <img alt="" className="absolute inset-0 max-w-none object-cover opacity-[57%] pointer-events-none size-full" src={imgChatGpt202610260746501} />
        </div>
        <div className="absolute h-[171.178px] left-[3.98px] top-[3.98px] w-[189.092px]" data-node-id="I6301:2224;4774:1008" data-name="卡纸压边轮廓">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={img1} />
        </div>
        <div className="-translate-x-1/2 absolute left-[calc(50%+0.47px)] size-[123.407px] top-[14.93px]" data-node-id="I6301:2224;4774:1033" data-name="商品图片 / 独立替换 · 保持完整">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={img2} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[27.866px] justify-center leading-[0] left-[98.53px] text-[19.81px] text-[color:var(--archive-ink,#161811)] text-center top-[158.24px] w-[173.168px]" data-node-id="I6301:2224;4774:1010">
          <p className="leading-[31.695px]">困兽a1</p>
        </div>
        <div className="absolute cursor-pointer left-[13.93px] size-[21.895px] top-[130.37px]" data-node-id="I6301:2224;4774:1011" role="button" tabIndex={0} data-name="图标 / heart">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHeart} />
        </div>
      </div>
      <div className="absolute border-[#4d7aad] border-[1.5px] border-solid h-[179.139px] left-0 rounded-[3px] top-0 w-[197.053px]" data-node-id="6303:2898" data-name="当前卡片 / 雾蓝描边" />
      <div className="absolute left-[8.93px] size-[31.895px] top-[125.37px]" data-node-id="6303:2901" role="button" tabIndex={0} data-name="收藏 / 点击切换" />
    </button>
  );
}

