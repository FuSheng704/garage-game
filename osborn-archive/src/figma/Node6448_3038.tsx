const imgGroup = "/assets/figma/029e2ef9-4025-4e67-a6d9-7ad71c2315dc.svg";
const img = "/assets/figma/a76a1d29-9a80-4edb-baf8-2e03d845eeb7.svg";
const img1 = "/assets/figma/228e1ec3-b736-4c9c-b619-8392c6fd81dc.svg";
const img2 = "/assets/figma/f2485bf6-05dd-418d-ba4b-737a1f58d16e.svg";

type ComponentProps = {
  value?: "默认排序" | "收藏优先" | "持有优先";
  onToggle?: () => void;
  onChange?: (value: "默认排序" | "收藏优先" | "持有优先") => void;
  className?: string;
  propValue?: "收起" | "展开";
};

export default function Component({ className, propValue = "收起", value = "默认排序", onToggle, onChange }: ComponentProps) {
  const is = propValue === "展开";
  return (
    <div className={className || `relative w-[152.268px] ${is ? "cursor-pointer h-[171.79px]" : "h-[43.79px]"}`} id={is ? "node-6448_3013" : "node-6448_3012"}>
      <button className={`absolute border-[#293841] border-[0.995px] border-solid [align-content:stretch] flex gap-[6.967px] h-[43.79px] items-center justify-center left-0 rounded-[21.895px] top-0 w-[152.268px] ${is ? "" : "cursor-pointer"}`} id={is ? "node-6448_3021" : "node-6448_3014"} data-name="排序按钮" onClick={onToggle} aria-expanded={is} aria-haspopup="menu">
        <div className="overflow-clip relative shrink-0 size-[23.885px]" id={is ? "node-6448_3022" : "node-6448_3015"} data-name="排序箭头 / 独立矢量">
          <div className="absolute inset-[12.5%_8.33%]" id={is ? "node-6448_3023" : "node-6448_3016"} data-name="Group">
            <div className="absolute inset-[-3.89%_-3.5%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup} />
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[24.88px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[74.641px]" id={is ? "node-6448_3025" : "node-6448_3018"}>
          <p className="leading-[23.885px]">{value}</p>
        </div>
        {propValue === "收起" && (
          <div className="h-[5.971px] relative shrink-0 w-[7.962px]" data-node-id="6448:3019" data-name="下拉箭头">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={img} />
          </div>
        )}
        {is && (
          <div className="flex items-center justify-center relative shrink-0" data-node-id="6448:3026">
            <div className="flex-none rotate-180">
              <div className="h-[5.971px] relative w-[7.962px]" data-name="下拉箭头">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={img1} />
              </div>
            </div>
          </div>
        )}
      </button>
      {is && (
        <div className="absolute bg-[#0d1214] border border-[#293841] border-solid [align-content:stretch] flex flex-col items-start left-0 overflow-clip p-[4px] rounded-[8px] top-[49.79px] w-[152.268px]" data-node-id="6448:3028" data-name="排序选项" role="menu">
          <button className="[align-content:stretch] flex h-[38px] items-center justify-between overflow-clip px-[12px] relative shrink-0 w-[144.268px]" data-node-id="6448:3029" data-name="默认排序" role="menuitemradio" aria-checked={value === "默认排序"} onClick={()=>onChange?.("默认排序")}>
            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-cream,#fff4dc)] text-left whitespace-nowrap" data-node-id="6448:3030">
              <p className="leading-[23.885px]">默认排序</p>
            </div>
            {value === "默认排序" && (<div className="h-[8px] relative shrink-0 w-[12px]" data-node-id="6448:3031" data-name="当前选项">
              <div className="absolute inset-[-7.07%_-4.71%_-14.14%_-4.71%]">
                <img alt="" className="block max-w-none size-full" src={img2} />
              </div>
            </div>)}
          </button>
          <button className="[align-content:stretch] flex h-[38px] items-center justify-between overflow-clip px-[12px] relative shrink-0 w-[144.268px]" data-node-id="6448:3032" data-name="收藏优先" role="menuitemradio" aria-checked={value === "收藏优先"} onClick={()=>onChange?.("收藏优先")}>
            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-cream,#fff4dc)] text-left whitespace-nowrap" data-node-id="6448:3033">
              <p className="leading-[23.885px]">收藏优先</p>
            </div>
            {value === "收藏优先" && (<div className="h-[8px] relative shrink-0 w-[12px]" data-node-id="6448:3031" data-name="当前选项">
              <div className="absolute inset-[-7.07%_-4.71%_-14.14%_-4.71%]">
                <img alt="" className="block max-w-none size-full" src={img2} />
              </div>
            </div>)}
          </button>
          <button className="[align-content:stretch] flex h-[38px] items-center justify-between overflow-clip px-[12px] relative shrink-0 w-[144.268px]" data-node-id="6448:3035" data-name="持有优先" role="menuitemradio" aria-checked={value === "持有优先"} onClick={()=>onChange?.("持有优先")}>
            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-cream,#fff4dc)] text-left whitespace-nowrap" data-node-id="6448:3036">
              <p className="leading-[23.885px]">持有优先</p>
            </div>
            {value === "持有优先" && (<div className="h-[8px] relative shrink-0 w-[12px]" data-node-id="6448:3031" data-name="当前选项">
              <div className="absolute inset-[-7.07%_-4.71%_-14.14%_-4.71%]">
                <img alt="" className="block max-w-none size-full" src={img2} />
              </div>
            </div>)}
          </button>
        </div>
      )}
    </div>
  );
}

