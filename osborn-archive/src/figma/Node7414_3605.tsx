const imgSearch = "/assets/figma/cd1e2ac6-92e4-4b5d-88ca-079093893986.svg";

type ComponentProps = {
  className?: string;
  propValue?: "点击前" | "展开搜索";
};

export default function Component({ className, propValue = "点击前" }: ComponentProps) {
  const is = propValue === "展开搜索";
  const is1 = propValue === "点击前";
  return (
    <div className={className || "bg-[#050d0f] h-[56px] relative rounded-[8px] w-[360px]"} id={is ? "node-7414_3591" : "node-7414_3590"}>
      {is1 && (
        <>
          <button className="absolute border-[#293841] border-[0.57px] border-solid [align-content:stretch] cursor-pointer flex gap-[5.128px] items-center justify-center left-[308px] overflow-clip rounded-[13.104px] size-[44px] top-[6px]" data-node-id="7414:3592" data-name="搜索 / 图标按钮">
            <div className="relative shrink-0 size-[11.395px]" data-node-id="7414:3593" data-name="图标 / search">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSearch} />
            </div>
          </button>
          <p className="[word-break:break-word] absolute font-['Noto_Serif_SC:Regular'] font-normal leading-[normal] left-[16px] text-[14px] text-[color:var(--archive-cream,#fff4dc)] top-[17px] whitespace-nowrap" data-node-id="7414:3597">
            商品分类
          </p>
        </>
      )}
      {is && (
        <>
          <div className="absolute border border-[#293841] border-solid [align-content:stretch] flex gap-[8px] h-[34.132px] items-center left-[6px] overflow-clip pl-[12px] rounded-[22px] top-[10.95px] w-[286px]" data-node-id="7414:3598" data-name="搜索输入区">
            <div className="relative shrink-0 size-[11.395px]" data-node-id="7414:3599" data-name="图标 / search">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSearch} />
            </div>
            <p className="[word-break:break-word] font-['Noto_Serif_SC:Regular'] font-normal leading-[normal] relative shrink-0 text-[13px] text-[color:var(--archive-cream,#fff4dc)] whitespace-nowrap" data-node-id="7414:3602">
              搜索名称、系列、角色…
            </p>
          </div>
          <button className="absolute [align-content:stretch] cursor-pointer flex h-[34.132px] items-center justify-center left-[298px] overflow-clip top-[10.95px] w-[56px]" data-node-id="7414:3603" data-name="取消 / 收起搜索">
            <p className="[word-break:break-word] font-['Noto_Serif_SC:Regular'] font-normal leading-[normal] relative shrink-0 text-[14px] text-[color:var(--archive-cream,#fff4dc)] text-left whitespace-nowrap" data-node-id="7414:3604">
              取消
            </p>
          </button>
        </>
      )}
    </div>
  );
}

