const img2 = "/assets/figma/cf34cf45-d57c-49b3-b3ba-9ae6d85a6822.png";
const img3 = "/assets/figma/fb501511-5325-48ed-92bf-6a3653ff08de.png";
const img4 = "/assets/figma/d26aec66-092f-4e8e-b328-b38be57b63b2.png";
const img5 = "/assets/figma/b466a758-4f13-4c5a-86bf-e34849daff1b.png";

export default function Component01() {
  return (
    <div className="relative size-full" data-node-id="7020:3108" data-name="01 / 层叠封套、纸页与金属框">
      <div className="absolute flex h-[333.423px] items-center justify-center left-[3.64px] top-[14px] w-[475.219px]" data-node-id="7020:3110">
        <div className="-rotate-1 flex-none">
          <div className="h-[325.276px] relative w-[469.613px]" data-name="垫纸图片 / 后层独立档案纸 2">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[340px] items-center justify-center left-[1.81px] top-[14.76px] w-[475.975px]" data-node-id="7020:3111">
        <div className="flex-none rotate-[1.7deg]">
          <div className="h-[326.312px] relative w-[466.506px]" data-name="垫纸图片 / 后层独立档案纸 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[332.59px] items-center justify-center left-[15.28px] top-[7.43px] w-[467.086px]" data-node-id="7020:3112">
        <div className="flex-none rotate-[0.65deg]">
          <div className="h-[327.348px] relative w-[463.398px]" data-name="垫纸图片 / 后层独立档案纸 4">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[348.211px] items-center justify-center left-[14.39px] top-[2.86px] w-[474.219px]" data-node-id="7020:3113">
        <div className="flex-none rotate-[-2.51deg]">
          <div className="h-[328.384px] relative w-[460.29px]" data-name="垫纸图片 / 后层独立档案纸 5">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#182023] border-[#a88146] border-[0.345px] border-solid h-[348.066px] left-[31.42px] rounded-[1.381px] top-[7.6px] w-[472.03px]" data-node-id="7020:3117" data-name="外框 / 黄铜细边" />
      <div className="absolute bg-[#10191c] border-[#6c5635] border-[0.345px] border-solid h-[342.196px] left-[33.84px] rounded-[0.691px] top-[10.01px] w-[467.196px]" data-node-id="7020:3118" data-name="内框 / 深色包边" />
      <div className="absolute border-[#a78146] border-[0.345px] border-solid h-[337.362px] left-[36.26px] rounded-[0.691px] top-[12.43px] w-[462.362px]" data-node-id="7020:3119" data-name="内框 / 金色内沿" />
    </div>
  );
}

