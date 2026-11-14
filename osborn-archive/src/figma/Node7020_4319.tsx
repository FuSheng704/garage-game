import type { CSSProperties } from 'react';
const img = "/assets/figma/34ae5da8-824f-4d70-9fb2-88f5d2794ed1.svg";
const img1 = "/assets/figma/66244689-2c11-45c8-aa29-11dbaa9ee197.svg";
const img2 = "/assets/figma/85a85850-ad62-4b37-aac3-dad4f0589b46.svg";
const img3 = "/assets/figma/0a612ee4-69e1-4611-80f0-1a2eece82d90.svg";
const img4 = "/assets/figma/0fa8e586-c678-452e-8cc9-c3a2189124d0.svg";
const img5 = "/assets/figma/40177161-d514-4b75-b732-4c36a334990b.svg";

interface TabsProps { selected?: string; }

export default function Component06({ selected = "全部" }: TabsProps) {
  return (
    <div className="cursor-pointer relative size-full" data-node-id="7020:4319" data-name="06 / 立体档案标签">
      <button style={{ "--tab-divider": selected === "全部" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "全部" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "全部" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[59px] left-0 top-0 w-[26.729px]" data-node-id="7020:4320" aria-pressed={selected === "全部"} data-name="全部">
        <div className="absolute h-[59px] left-[0.33px] top-[0.98px] w-[26.077px]" data-node-id="I7020:4320;4163:1341" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "全部" ? img4 : img} />
        </div>
        <div className="absolute h-[57.696px] left-0 top-0 w-[25.425px]" data-node-id="I7020:4320;4163:1343" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "全部" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.261px] left-[2.28px] top-[12.71px] w-[0.326px]" data-node-id="I7020:4320;4163:1345" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[30.641px] left-[2.28px] top-[13.69px] w-[0.326px]" data-node-id="I7020:4320;4163:1346" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[35.204px] justify-center leading-[0] left-[11.57px] text-[7.8px] text-[color:var(--tab-text)] text-center top-[29.5px] w-[14.017px]" data-node-id="I7020:4320;4163:1347">
          <p className="leading-[11.7px] mb-0">全</p>
          <p className="leading-[11.7px]">部</p>
        </div>
        <div className="absolute left-[0.65px] size-[1.63px] top-[10.43px]" data-node-id="I7020:4320;4163:1348" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[19.56px] size-[4.564px] top-[51.83px]" data-node-id="I7020:4320;4163:1349" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>
      <button style={{ "--tab-divider": selected === "已拥有" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "已拥有" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "已拥有" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[59px] left-0 top-[68px] w-[26.729px]" data-node-id="7020:4321" aria-pressed={selected === "已拥有"} data-name="已拥有">
        <div className="absolute h-[59px] left-[0.33px] top-[0.98px] w-[26.077px]" data-node-id="I7020:4321;4163:1351" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已拥有" ? img4 : img} />
        </div>
        <div className="absolute h-[57.696px] left-0 top-0 w-[25.425px]" data-node-id="I7020:4321;4163:1353" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已拥有" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.261px] left-[2.28px] top-[12.71px] w-[0.326px]" data-node-id="I7020:4321;4163:1355" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[30.641px] left-[2.28px] top-[13.69px] w-[0.326px]" data-node-id="I7020:4321;4163:1356" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[35.204px] justify-center leading-[0] left-[11.57px] text-[7.8px] text-[color:var(--tab-text)] text-center top-[29.5px] w-[14.017px]" data-node-id="I7020:4321;4163:1357">
          <p className="leading-[11.7px] mb-0">已</p>
          <p className="leading-[11.7px] mb-0">拥</p>
          <p className="leading-[11.7px]">有</p>
        </div>
        <div className="absolute left-[0.65px] size-[1.63px] top-[10.43px]" data-node-id="I7020:4321;4163:1358" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[19.56px] size-[4.564px] top-[51.83px]" data-node-id="I7020:4321;4163:1359" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>
      <button style={{ "--tab-divider": selected === "未拥有" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "未拥有" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "未拥有" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[59px] left-0 top-[136px] w-[26.729px]" data-node-id="7020:4322" aria-pressed={selected === "未拥有"} data-name="未拥有">
        <div className="absolute h-[59px] left-[0.33px] top-[0.98px] w-[26.077px]" data-node-id="I7020:4322;4163:1351" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "未拥有" ? img4 : img} />
        </div>
        <div className="absolute h-[57.696px] left-0 top-0 w-[25.425px]" data-node-id="I7020:4322;4163:1353" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "未拥有" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.261px] left-[2.28px] top-[12.71px] w-[0.326px]" data-node-id="I7020:4322;4163:1355" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[30.641px] left-[2.28px] top-[13.69px] w-[0.326px]" data-node-id="I7020:4322;4163:1356" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[35.204px] justify-center leading-[0] left-[11.57px] text-[7.8px] text-[color:var(--tab-text)] text-center top-[29.5px] w-[14.017px]" data-node-id="I7020:4322;4163:1357">
          <p className="leading-[11.7px] mb-0">未</p>
          <p className="leading-[11.7px] mb-0">拥</p>
          <p className="leading-[11.7px]">有</p>
        </div>
        <div className="absolute left-[0.65px] size-[1.63px] top-[10.43px]" data-node-id="I7020:4322;4163:1358" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[19.56px] size-[4.564px] top-[51.83px]" data-node-id="I7020:4322;4163:1359" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>
      <button style={{ "--tab-divider": selected === "已收藏" ? "#76a9fa" : "#c1aa84", "--tab-edge": selected === "已收藏" ? "#76a9fa" : "#d6c19b", "--tab-text": selected === "已收藏" ? "#fff4dc" : "#161811" } as CSSProperties} className="absolute block h-[59px] left-0 top-[204px] w-[26.729px]" data-node-id="7020:4323" aria-pressed={selected === "已收藏"} data-name="已收藏">
        <div className="absolute h-[59px] left-[0.33px] top-[0.98px] w-[26.077px]" data-node-id="I7020:4323;4163:1351" data-name="后层厚纸边">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已收藏" ? img4 : img} />
        </div>
        <div className="absolute h-[57.696px] left-0 top-0 w-[25.425px]" data-node-id="I7020:4323;4163:1353" data-name="标签面纸">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={selected === "已收藏" ? img5 : img1} />
        </div>
        <div className="absolute bg-[var(--tab-divider)] h-[0.261px] left-[2.28px] top-[12.71px] w-[0.326px]" data-node-id="I7020:4323;4163:1355" data-name="细分隔线" />
        <div className="absolute bg-[var(--tab-edge)] h-[30.641px] left-[2.28px] top-[13.69px] w-[0.326px]" data-node-id="I7020:4323;4163:1356" data-name="标签压边" />
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[35.204px] justify-center leading-[0] left-[11.57px] text-[7.8px] text-[color:var(--tab-text)] text-center top-[29.5px] w-[14.017px]" data-node-id="I7020:4323;4163:1357">
          <p className="leading-[11.7px] mb-0">已</p>
          <p className="leading-[11.7px] mb-0">收</p>
          <p className="leading-[11.7px]">藏</p>
        </div>
        <div className="absolute left-[0.65px] size-[1.63px] top-[10.43px]" data-node-id="I7020:4323;4163:1358" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-60%_-80%_-20%]">
            <img alt="" className="block max-w-none size-full" src={img2} />
          </div>
        </div>
        <div className="absolute left-[19.56px] size-[4.564px] top-[51.83px]" data-node-id="I7020:4323;4163:1359" data-name="黄铜铆钉 / 可编辑">
          <div className="absolute inset-[0_-21.43%_-28.57%_-7.14%]">
            <img alt="" className="block max-w-none size-full" src={img3} />
          </div>
        </div>
      </button>

    </div>
  );
}

