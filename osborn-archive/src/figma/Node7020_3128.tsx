const img1 = "/assets/figma/07faa449-5290-4197-8387-9d89863e9e3d.png";
const img4 = "/assets/figma/d53bf145-b950-47a7-b077-19ad1bdab646.png";
const img = "/assets/figma/a915723c-b71e-49a7-9207-06f873d49d3b.svg";
const img2 = "/assets/figma/cf220035-7d6d-4642-a790-01f8a572d621.svg";
const img3 = "/assets/figma/f4624d52-9dad-4c13-8107-8efa2e0bb39b.svg";
const imgGroup = "/assets/figma/9b7dc0f7-24a5-41a0-8b01-9d9ea689e492.svg";

export default function Component02() {
  return (
    <div className="relative size-full" data-node-id="7020:3128" data-name="02 / 标题铭牌、便笺与照片">
      <div className="absolute h-[29.696px] left-[41.78px] top-[4.14px] w-[287.983px]" data-node-id="7020:3129" data-name="黑色标题底板">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={img} />
      </div>
      <div className="absolute h-[25.898px] left-[43.51px] opacity-[38%] top-[6.22px] w-[282.804px]" data-node-id="7020:3131" data-name="深色封皮材质 / 独立可替换纹理">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
      </div>
      <div className="absolute h-[28.66px] left-[41.78px] top-[4.14px] w-[130.87px]" data-node-id="7020:3132" data-name="斜切标题铭牌">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={img2} />
      </div>
      <div className="absolute h-[25.207px] left-[43.51px] top-[5.87px] w-[126.036px]" data-node-id="7020:3134" data-name="铭牌内描边">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={img3} />
      </div>
      <div className="absolute h-[25.207px] left-[47.65px] top-[5.18px] w-[26.17px]" data-node-id="7020:3138" data-name="奶油色动漫少年侧脸剪影 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:Bold'] font-bold h-[22.79px] justify-center leading-[0] left-[76.66px] text-[16.575px] text-[color:var(--archive-cream,#fff4dc)] top-[18.3px] w-[93.232px]" data-node-id="7020:3139">
        <p className="leading-[22.099px]">官谷档案</p>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:Regular'] font-normal h-[9.669px] justify-center leading-[0] left-[174.03px] text-[5.525px] text-[color:var(--archive-cream,#fff4dc)] top-[15.71px] w-[149.517px]" data-node-id="7020:3140">
        <p className="leading-[9.669px]">赏金猎人萧逸接受委托，不限时间，任凭差遣。</p>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[6.906px] justify-center leading-[0] left-[174.03px] text-[4.144px] text-[color:var(--archive-cream,#fff4dc)] top-[24px] tracking-[0.3315px] w-[141.575px]" data-node-id="7020:3141">
        <p className="leading-[6.906px]">YES, Madam.</p>
      </div>
      <div className="absolute left-[404.35px] opacity-[34%] overflow-clip size-[32.459px] top-[6.91px]" data-node-id="7020:3142" data-name="独立矢量 / 罗盘">
        <div className="absolute inset-[1.25%]" data-node-id="7020:3143" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
        </div>
      </div>
    </div>
  );
}

