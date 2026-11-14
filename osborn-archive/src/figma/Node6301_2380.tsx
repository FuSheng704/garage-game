import type { CSSProperties } from 'react';
const img = "/assets/figma/bad375eb-757f-4b5a-ab50-5ed17e3d95a2.svg";
const img1 = "/assets/figma/dd171d8a-c5f6-484d-86b9-6f6f3db0ed63.svg";
const img2 = "/assets/figma/cf0a6d7c-de43-493d-89b2-e64bb2e5237f.svg";
const img3 = "/assets/figma/a1baf61c-f5c7-4da7-8a37-560988913c4d.svg";
const img4 = "/assets/figma/4b3bc4d9-26d2-4f1a-ae35-cdcfaf995b1c.svg";
const img5 = "/assets/figma/4107df21-9f70-4df9-bd3d-a3187891c702.svg";

interface TabsProps { selected?: string; }

export default function Component06({ selected = "全部" }: TabsProps) {
  return (
    <div className="cursor-pointer relative size-full" data-node-id="6301:2380" data-name="06 / 立体档案标签">
      <button style={{ "--tab-divider": selected === "全部" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "全部" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "全部" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[180.135px] left-0 top-0 w-[81.608px]" data-node-id="6301:2381" aria-pressed={selected === "全部"} data-name="全部">
        <div className="absolute h-[180.135px] left-px top-[2.99px] w-[79.617px]" data-node-id="I6301:2381;4163:1341" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "全部" ? img4 : img} />
        </div>
        <div className="absolute h-[176.154px] left-0 top-0 w-[77.627px]" data-node-id="I6301:2381;4163:1343" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "全部" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.796px] left-[6.97px] top-[38.81px] w-[0.995px]" data-node-id="I6301:2381;4163:1345" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[93.551px] left-[6.97px] top-[41.8px] w-[0.995px]" data-node-id="I6301:2381;4163:1346" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[107.484px] justify-center leading-[0] left-[35.33px] text-[23.89px] text-[color:var(--tab-text)] text-center top-[90.07px] w-[42.794px]" data-node-id="I6301:2381;4163:1347">
          <p className="leading-[35.828px] mb-0">全</p>
          <p className="leading-[35.828px]">部</p>
        </div>
        <div className="absolute left-[1.99px] size-[4.976px] top-[31.85px]" data-node-id="I6301:2381;4163:1348" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[59.71px] size-[13.933px] top-[158.24px]" data-node-id="I6301:2381;4163:1349" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>
      <button style={{ "--tab-divider": selected === "已拥有" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "已拥有" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "已拥有" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[180.135px] left-0 top-[185.11px] w-[81.608px]" data-node-id="6301:2382" aria-pressed={selected === "已拥有"} data-name="已拥有">
        <div className="absolute h-[180.135px] left-px top-[2.99px] w-[79.617px]" data-node-id="I6301:2382;4163:1351" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已拥有" ? img4 : img} />
        </div>
        <div className="absolute h-[176.154px] left-0 top-0 w-[77.627px]" data-node-id="I6301:2382;4163:1353" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已拥有" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.796px] left-[6.97px] top-[38.81px] w-[0.995px]" data-node-id="I6301:2382;4163:1355" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[93.551px] left-[6.97px] top-[41.8px] w-[0.995px]" data-node-id="I6301:2382;4163:1356" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[107.484px] justify-center leading-[0] left-[35.33px] text-[23.89px] text-[color:var(--tab-text)] text-center top-[90.07px] w-[42.794px]" data-node-id="I6301:2382;4163:1357">
          <p className="leading-[35.828px] mb-0">已</p>
          <p className="leading-[35.828px] mb-0">拥</p>
          <p className="leading-[35.828px]">有</p>
        </div>
        <div className="absolute left-[1.99px] size-[4.976px] top-[31.85px]" data-node-id="I6301:2382;4163:1358" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[59.71px] size-[13.933px] top-[158.24px]" data-node-id="I6301:2382;4163:1359" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>
      <button style={{ "--tab-divider": selected === "未拥有" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "未拥有" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "未拥有" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[180.135px] left-0 top-[357.28px] w-[81.608px]" data-node-id="6301:2383" aria-pressed={selected === "未拥有"} data-name="未拥有">
        <div className="absolute h-[180.135px] left-px top-[2.99px] w-[79.617px]" data-node-id="I6301:2383;4163:1351" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "未拥有" ? img4 : img} />
        </div>
        <div className="absolute h-[176.154px] left-0 top-0 w-[77.627px]" data-node-id="I6301:2383;4163:1353" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "未拥有" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.796px] left-[6.97px] top-[38.81px] w-[0.995px]" data-node-id="I6301:2383;4163:1355" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[93.551px] left-[6.97px] top-[41.8px] w-[0.995px]" data-node-id="I6301:2383;4163:1356" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[107.484px] justify-center leading-[0] left-[35.33px] text-[23.89px] text-[color:var(--tab-text)] text-center top-[90.07px] w-[42.794px]" data-node-id="I6301:2383;4163:1357">
          <p className="leading-[35.828px] mb-0">未</p>
          <p className="leading-[35.828px] mb-0">拥</p>
          <p className="leading-[35.828px]">有</p>
        </div>
        <div className="absolute left-[1.99px] size-[4.976px] top-[31.85px]" data-node-id="I6301:2383;4163:1358" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[59.71px] size-[13.933px] top-[158.24px]" data-node-id="I6301:2383;4163:1359" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>
      <button style={{ "--tab-divider": selected === "已收藏" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "已收藏" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "已收藏" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[180.135px] left-0 top-[530.45px] w-[81.608px]" data-node-id="6301:2384" aria-pressed={selected === "已收藏"} data-name="已收藏">
        <div className="absolute h-[180.135px] left-px top-[2.99px] w-[79.617px]" data-node-id="I6301:2384;4163:1351" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已收藏" ? img4 : img} />
        </div>
        <div className="absolute h-[176.154px] left-0 top-0 w-[77.627px]" data-node-id="I6301:2384;4163:1353" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已收藏" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.796px] left-[6.97px] top-[38.81px] w-[0.995px]" data-node-id="I6301:2384;4163:1355" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[93.551px] left-[6.97px] top-[41.8px] w-[0.995px]" data-node-id="I6301:2384;4163:1356" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[107.484px] justify-center leading-[0] left-[35.33px] text-[23.89px] text-[color:var(--tab-text)] text-center top-[90.07px] w-[42.794px]" data-node-id="I6301:2384;4163:1357">
          <p className="leading-[35.828px] mb-0">已</p>
          <p className="leading-[35.828px] mb-0">收</p>
          <p className="leading-[35.828px]">藏</p>
        </div>
        <div className="absolute left-[1.99px] size-[4.976px] top-[31.85px]" data-node-id="I6301:2384;4163:1358" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[59.71px] size-[13.933px] top-[158.24px]" data-node-id="I6301:2384;4163:1359" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>

    </div>
  );
}

