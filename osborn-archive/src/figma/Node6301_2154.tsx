const img2 = "/assets/figma/b3a79ead-9dd5-47eb-b459-acfb9b8ca338.png";
const img3 = "/assets/figma/e019cb50-ef8c-4729-ad38-724a1eb8b3e9.png";
const img4 = "/assets/figma/a57852d1-0123-4b84-bf38-ccb67fe1f07c.png";
const img5 = "/assets/figma/eff46803-18e6-4b9d-8205-52bfdaf8636c.png";

export default function Component01() {
  return (
    <div className="relative size-full" data-node-id="6301:2154" data-name="01 / 层叠封套、纸页与金属框">
      <div className="absolute flex h-[960.975px] items-center justify-center left-[10.5px] top-[40.35px] w-[1369.653px]" data-node-id="6301:2156">
        <div className="-rotate-1 flex-none">
          <div className="h-[937.496px] relative w-[1353.497px]" data-name="垫纸图片 / 后层独立档案纸 2">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[979.931px] items-center justify-center left-[5.21px] top-[42.55px] w-[1371.832px]" data-node-id="6301:2157">
        <div className="flex-none rotate-[1.7deg]">
          <div className="h-[940.482px] relative w-[1344.54px]" data-name="垫纸图片 / 后层独立档案纸 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[958.574px] items-center justify-center left-[44.04px] top-[21.42px] w-[1346.212px]" data-node-id="6301:2158">
        <div className="flex-none rotate-[0.65deg]">
          <div className="h-[943.467px] relative w-[1335.583px]" data-name="垫纸图片 / 后层独立档案纸 4">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1003.598px] items-center justify-center left-[41.46px] top-[8.25px] w-[1366.771px]" data-node-id="6301:2159">
        <div className="flex-none rotate-[-2.51deg]">
          <div className="h-[946.453px] relative w-[1326.626px]" data-name="垫纸图片 / 后层独立档案纸 5">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
          </div>
        </div>
      </div>
      <div className="absolute bg-[#182023] border-[#a88146] border-[0.995px] border-solid h-[1003.18px] left-[90.56px] rounded-[3.981px] top-[21.89px] w-[1360.464px]" data-node-id="6301:2163" data-name="外框 / 黄铜细边" />
      <div className="absolute bg-[#10191c] border-[#6c5635] border-[0.995px] border-solid h-[986.262px] left-[97.53px] rounded-[1.99px] top-[28.86px] w-[1346.531px]" data-node-id="6301:2164" data-name="内框 / 深色包边" />
      <div className="absolute border-[#a78146] border-[0.995px] border-solid h-[972.329px] left-[104.5px] rounded-[1.99px] top-[35.83px] w-[1332.598px]" data-node-id="6301:2165" data-name="内框 / 金色内沿" />
    </div>
  );
}

