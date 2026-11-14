const imgSearch = "/assets/figma/ea7bb1cc-f74a-4118-8b1c-bfbc6ad1b613.svg";

export default function Component() {
  return (
    <div className="bg-[#050b0d] relative size-full" data-node-id="7442:3605" data-name="搜索展开 / 固定工具栏">
      <div className="absolute bg-[#050b0d] h-[43px] left-0 rounded-[6.143px] top-[-1px] w-[276.429px]" data-node-id="7442:3606" data-name="官谷图鉴 / 移动端搜索 · 点击展开">
        <div className="absolute border-[#293841] border-[0.768px] border-solid [align-content:stretch] flex gap-[6.143px] h-[26.209px] items-center left-[4.61px] overflow-clip pl-[9.214px] rounded-[16.893px] top-[8.41px] w-[219.607px]" data-node-id="I7442:3606;7414:3598" data-name="搜索输入区">
          <div className="relative shrink-0 size-[8.75px]" data-node-id="I7442:3606;7414:3599" data-name="图标 / search">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSearch} />
          </div>
          <p className="[word-break:break-word] font-['Noto_Serif_SC:Regular'] font-normal leading-[normal] relative shrink-0 text-[9.98px] text-[color:var(--archive-cream,#fff4dc)] whitespace-nowrap" data-node-id="I7442:3606;7414:3602">
            搜索名称、系列、角色…
          </p>
        </div>
        <button className="absolute [align-content:stretch] cursor-pointer flex h-[26.209px] items-center justify-center left-[228.82px] overflow-clip top-[8.41px] w-[43px]" data-node-id="I7442:3606;7414:3603" data-name="取消 / 收起搜索">
          <p className="[word-break:break-word] font-['Noto_Serif_SC:Regular'] font-normal leading-[normal] relative shrink-0 text-[10.75px] text-[color:var(--archive-cream,#fff4dc)] text-left whitespace-nowrap" data-node-id="I7442:3606;7414:3604">
            取消
          </p>
        </button>
      </div>
    </div>
  );
}

