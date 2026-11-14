const img1 = "/assets/figma/cf99c09d-c2ae-44e6-81c1-60deb1558194.png";
const img2 = "/assets/figma/c0cfb1f8-dac3-445f-810a-24bfed3f3aa8.png";
const img3 = "/assets/figma/e05a74f3-143b-4f75-a469-8e187f80c5b5.png";
const img4 = "/assets/figma/809dfdd7-a169-4606-bcee-992ca8ef9eb8.png";
const img = "/assets/figma/7b65d4a3-fe2b-4e33-b27c-bafd5ba6d66c.png";
const img5 = "/assets/figma/c3980ba4-ae77-43ef-a05c-e9839ec74cd2.png";
const img6 = "/assets/figma/2fc01165-efe8-4819-9905-36d8f732bf64.png";
const img7 = "/assets/figma/3a1dec39-5073-47eb-80f0-9ffc25d5adee.png";
const img8 = "/assets/figma/bf8c2fb7-a60f-4f23-88ad-3f26b842488a.png";
const img9 = "/assets/figma/9a28e2b7-f807-4fa3-8da0-defbac77554e.png";
const img10 = "/assets/figma/36954448-9cd7-4bab-a0e8-c3fa3654c895.png";
const imgChatGpt202610260751292 = "/assets/figma/6bed998a-5e2e-4687-a929-6cbc10dcef61.png";
const img11 = "/assets/figma/1b666b35-56ce-4018-971a-e15b1dea4da8.png";
const imgImg82811 = "/assets/figma/4b0fd9f2-8526-410b-84fe-a8c27364f0d6.png";
const img12 = "/assets/figma/e8bc72e7-78f1-4599-8efb-395b8848235e.png";
const img13 = "/assets/figma/b00fafbf-2e2b-4258-b10d-933d905406e4.png";
const imgVector = "/assets/figma/1661afd0-a39e-45b4-a5e7-3acf18bdb3d1.svg";
const imgVector1 = "/assets/figma/29d777e5-6633-444c-8ce0-b2fee3e65982.svg";
const imgClipPathGroup = "/assets/figma/919e37d3-118c-4a08-84fe-df19e4773c61.svg";
const imgTags = "/assets/figma/deea03a8-038e-40b9-834d-04882383c9fb.svg";
const imgRuler = "/assets/figma/81fec241-b7fb-4e90-ab5c-0f29119d4c95.svg";
const imgLibraryBig = "/assets/figma/b8c729f0-c10a-4e1e-b382-246d33bc1c17.svg";
const imgLayers = "/assets/figma/9af43aa7-1749-4a30-a5c6-fc023b665a97.svg";
const imgPackageCheck = "/assets/figma/75c68776-2650-4855-923a-08100b2505e8.svg";
const imgHash = "/assets/figma/0b624574-c57d-4706-8110-75ab5e94d68f.svg";
const imgMinus = "/assets/figma/c354b99e-cc69-4f38-82a1-0c8f07c9bcaf.svg";
const imgPlus = "/assets/figma/e2e6e919-6033-4f85-b955-a355c302908b.svg";
const imgCoins = "/assets/figma/ee4dd912-adbf-47d6-8ce2-970d284bdebb.svg";
const imgGroup = "/assets/figma/6d3860a6-5ebb-4225-b98c-b83cbf931432.svg";

interface DetailProps { category?: string; size?: string; material?: string; name: string; imageUrl: string; series: string; quantity: number; price: string; owned: boolean; onOwned: (value: boolean)=>void; onQuantity: (value: number)=>void; onPrice?: ()=>void; onPriceChange: (value: string)=>void; onSave: ()=>void; }
export default function Component07({category,size,material,name,imageUrl,series,quantity,price,owned,onOwned,onQuantity,onPriceChange,onSave}: DetailProps) {
  return (
    <div className="relative size-full" data-node-id="6301:2243" data-name="07 / 任务档案 · 分层详情与收藏记录">
      <div className="absolute flex h-[829.11px] items-center justify-center left-[24.82px] top-[-12.66px] w-[469.28px]" data-node-id="6301:2244">
        <div className="flex-none rotate-[-1.89deg] skew-x-[-0.08deg]">
          <div className="h-[814.891px] relative w-[443.842px]" data-name="垫纸图片 / 底层任务纸 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[823.32px] items-center justify-center left-[41.13px] top-[-9.07px] w-[459.312px]" data-node-id="6301:2245">
        <div className="flex-none rotate-[-1.11deg] skew-x-[-0.01deg]">
          <div className="h-[814.899px] relative w-[443.837px]" data-name="垫纸图片 / 底层任务纸 2">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[817.914px] items-center justify-center left-[26.34px] top-[8.43px] w-[447.351px]" data-node-id="6301:2246">
        <div className="flex-none rotate-[0.39deg] skew-x-[0.15deg]">
          <div className="h-[814.872px] relative w-[443.853px]" data-name="垫纸图片 / 底层任务纸 3">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[832.31px] items-center justify-center left-[15.87px] top-[3.29px] w-[477.503px]" data-node-id="6301:2247">
        <div className="flex-none rotate-[-2.34deg] skew-x-[0.05deg]">
          <div className="h-[814.896px] relative w-[443.839px]" data-name="垫纸图片 / 底层任务纸 4">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[826.687px] items-center justify-center left-[10.91px] top-[-8.81px] w-[506.445px]" data-node-id="6301:2248">
        <div className="flex-none rotate-[-1.84deg] skew-x-[0.09deg]">
          <div className="h-[811.778px] relative w-[479.459px]" data-name="垫纸图片 / 主档案纸 / 独立可编辑">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[106.61%] left-0 max-w-none top-0 w-full" src={img} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[847.926px] left-[20.9px] top-[9.95px] w-[468.748px]" data-node-id="6301:2249" data-name="主档案纸 / 独立可编辑">
        <div className="absolute contents h-[57.809px] left-[23.86px] top-[14.15px] w-[134.032px]" data-node-id="6301:2250" data-name="LONGDAY / 罗盘档案印记 · 成品组">
          <div className="absolute flex h-[57.809px] items-center justify-center left-[23.86px] top-[14.15px] w-[134.032px]" data-node-id="6301:2266">
            <div className="flex-none rotate-[-1.27deg]">
              <div className="h-[54.871px] overflow-clip relative w-[132.845px]" data-name="LONGDAY / 虚线印框与斜线压边">
                <div className="absolute inset-[17.11%_0.54%_15.79%_33.15%]" data-node-id="6301:2267" data-name="Vector">
                  <div className="absolute inset-[-1.08%_-0.45%_-1.08%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector} />
                  </div>
                </div>
                <div className="absolute inset-[17.11%_0.54%_15.79%_95.65%]" data-node-id="6301:2268" data-name="Vector">
                  <div className="absolute inset-[-0.54%_-3.94%_-0.54%_0]">
                    <img alt="" className="block max-w-none size-full" src={imgVector1} />
                  </div>
                </div>
                <div className="absolute inset-[17.11%_0.54%_15.79%_95.65%]" data-node-id="6301:2269" data-name="Clip path group">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClipPathGroup} />
                </div>
                <div className="absolute aspect-[51.02580681291483/51.02580681291483] flex items-center justify-center left-[1.71%] right-[59.88%] top-[4.06px]" data-node-id="6301:2273" style={{ containerType: "size" }}>
                  <div className="flex-none h-[hypot(-0.529897cqw,99.4701cqh)] rotate-[0.31deg] w-[hypot(99.4701cqw,0.529897cqh)]">
                    <div className="relative size-full" data-name="对称虹彩罗盘花卉徽章 1">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[23.291px] items-center justify-center left-[116.15px] top-[43.21px] w-[74.106px]" data-node-id="6301:2274">
            <div className="flex-none rotate-[-1.27deg]">
              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[21.66px] justify-center leading-[0] relative text-[#050404] text-[11.943px] text-center w-[73.642px]">
                <p className="leading-[16.919px]">LONGDAY</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[172.74px] top-[14.87px]" data-node-id="6301:2275" data-name="任务档案">
          <div className="-translate-y-1/2 absolute flex h-[43.194px] items-center justify-center left-[172.74px] top-[36.47px] w-[125.607px]" data-node-id="6301:2276">
            <div className="flex-none rotate-[0.18deg] skew-x-[0.34deg]">
              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[42.793px] justify-center leading-[0] relative text-[27.866px] text-[color:var(--archive-ink,#161811)] w-[125.493px]">
                <p className="leading-[39.809px]">任务档案</p>
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex h-[15.33px] items-center justify-center left-[174.51px] top-[60.36px] w-[125.532px]" data-node-id="6301:2277">
            <div className="flex-none rotate-[0.18deg] skew-x-[0.34deg]">
              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Regular'] font-normal h-[14.928px] justify-center leading-[0] relative text-[9.952px] text-[color:var(--archive-ink,#161811)] w-[125.493px]">
                <p className="leading-[13.933px]">MISSION NOTICE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[22.39px] top-[70.38px]" data-node-id="6301:2278" data-name="商品图">
          <div className="absolute contents left-[22.39px] top-[70.38px]" data-node-id="6301:2279">
            <div className="absolute flex h-[253.196px] items-center justify-center left-[22.39px] top-[77.77px] w-[321.567px]" data-node-id="6301:2280">
              <div className="flex-none rotate-[-2.63deg] skew-x-[0.14deg]">
                <div className="h-[239.216px] relative w-[310.336px]" data-name="垫纸图片 / 照片下层纸 1">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img6} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[239.294px] items-center justify-center left-[27.99px] top-[94.36px] w-[299.458px]" data-node-id="6301:2281">
              <div className="flex-none rotate-[1.87deg] skew-x-[-0.26deg]">
                <div className="h-[229.935px] relative w-[291.062px]" data-name="垫纸图片 / 照片下层纸 2">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-full left-[-2.82%] max-w-none top-0 w-[105.64%]" src={img7} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex h-[248.111px] items-center justify-center left-[35.28px] top-[94.69px] w-[286.355px]" data-node-id="6301:2282">
              <div className="-rotate-1 flex-none skew-x-[-0.01deg]">
                <div className="h-[243.208px] relative w-[282.167px]" data-name="垫纸图片 / 照片下层纸 3">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[272.239px] items-center justify-center left-[37.4px] top-[70.38px] w-[291.341px]" data-node-id="6301:2283">
              <div className="flex-none rotate-[-3.11deg] skew-x-[0.18deg]">
                <div className="h-[257.624px] relative w-[276.96px]" data-name="垫纸图片 / 独立拍立得相框">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img9} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center left-[78.57px] size-[216.545px] top-[95.25px]" data-node-id="6301:2284">
            <div className="flex-none rotate-[-0.97deg]">
              <div className="relative size-[212.977px]" data-name="金色罗盘锚徽章 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover opacity-30 pointer-events-none size-full" src={img10} />
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center left-[81.6px] size-[210.473px] top-[98.29px]" data-node-id="6301:2286">
            <div className="flex-none rotate-[-0.97deg]">
              <div className="relative size-[207.005px]" data-name="展示商品图 / 困兽a1 · 独立可替换">
                <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imageUrl} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[-1.8px] size-[142.677px] top-[53.05px]" data-node-id="6301:2287">
          <div className="flex-none rotate-[-0.97deg]">
            <div className="relative size-[140.326px]" data-name="ChatGPT 图像 2026年10月26日 07_51_29 2">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChatGpt202610260751292} />
            </div>
          </div>
        </div>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[31.847px] justify-center leading-[0] left-[286.89px] text-[#cd231c] text-[19.904px] top-[41.58px] w-[104.374px]" data-node-id="6301:2302">
          <p className="leading-[31.847px]">NO. 1123</p>
        </div>
        <div className="absolute flex items-center justify-center left-[348.28px] size-[120.38px] top-[469.19px]" data-node-id="6301:2310">
          <div className="flex-none rotate-[11.99deg]">
            <div className="relative size-[101.512px]" data-name="金色鸢尾星盘徽章 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover opacity-[22%] pointer-events-none size-full" src={img11} />
            </div>
          </div>
        </div>
        <div className="absolute contents h-[200.266px] left-[51.57px] top-[350.3px] w-[385.785px]" data-node-id="6301:2311" data-name="简介">
          <div className="-translate-y-1/2 absolute flex h-[55.62px] items-center justify-center left-[59.83px] top-[381.01px] w-[214.868px]" data-node-id="6301:2312">
            <div className="flex-none rotate-[-1.04deg]">
              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[51.751px] justify-center leading-[0] relative text-[35.828px] text-[color:var(--archive-ink,#161811)] w-[213.965px]">
                <p className="leading-[51.751px]">{name}</p>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[7.721px] items-center justify-center left-[52.43px] top-[397.56px] w-[382.163px]" data-node-id="6301:2313">
            <div className="flex-none rotate-[-1.04deg]">
              <div className="bg-[#9d8c6e] h-[0.796px] opacity-80 relative w-[382.211px]" data-name="细分隔线" />
            </div>
          </div>
          <div className="absolute flex h-[135.401px] items-center justify-center left-[65.49px] top-[411.15px] w-[335.828px]" data-node-id="6301:2314">
            <div className="flex-none rotate-[-1.04deg]">
              <div className="[align-content:stretch] flex flex-col h-[129.378px] items-start relative w-[333.539px]" data-name="商品资料 / Auto Layout">
                <div className="[align-content:stretch] flex gap-[19.904px] h-[31.847px] items-center relative shrink-0 w-[407.044px]" data-node-id="6301:2315" data-name="详情字段 / 商品分类">
                  <div className="relative shrink-0 size-[18.909px]" data-node-id="6301:2316" data-name="图标 / tags">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTags} />
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[86.584px]" data-node-id="6301:2320">
                    <p className="leading-[27.866px]">商品分类</p>
                  </div>
                  <div className="bg-[var(--archive-line,#c7ab83)] h-[21.895px] opacity-60 relative shrink-0 w-[0.697px]" data-node-id="6301:2321" data-name="竖向分隔" />
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[226.91px]" data-node-id="6301:2322">
                    <p className="leading-[27.866px]">{category || "—"}</p>
                  </div>
                </div>
                <div className="[align-content:stretch] flex gap-[19.904px] h-[31.847px] items-center relative shrink-0 w-[407.044px]" data-node-id="6301:2323" data-name="详情字段 / 商品尺寸">
                  <div className="relative shrink-0 size-[18.909px]" data-node-id="6301:2324" data-name="图标 / ruler">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRuler} />
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[86.584px]" data-node-id="6301:2330">
                    <p className="leading-[27.866px]">商品尺寸</p>
                  </div>
                  <div className="bg-[var(--archive-line,#c7ab83)] h-[21.895px] opacity-60 relative shrink-0 w-[0.697px]" data-node-id="6301:2331" data-name="竖向分隔" />
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[226.91px]" data-node-id="6301:2332">
                    <p className="leading-[27.866px]">{size || "—"}</p>
                  </div>
                </div>
                <div className="[align-content:stretch] flex gap-[19.904px] h-[31.847px] items-center relative shrink-0 w-[407.044px]" data-node-id="6301:2333" data-name="详情字段 / 系列作品">
                  <div className="relative shrink-0 size-[18.909px]" data-node-id="6301:2334" data-name="图标 / library-big">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLibraryBig} />
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[86.584px]" data-node-id="6301:2338">
                    <p className="leading-[27.866px]">系列作品</p>
                  </div>
                  <div className="bg-[var(--archive-line,#c7ab83)] h-[21.895px] opacity-60 relative shrink-0 w-[0.697px]" data-node-id="6301:2339" data-name="竖向分隔" />
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[226.91px]" data-node-id="6301:2340">
                    <p className="leading-[27.866px]">{series}</p>
                  </div>
                </div>
                <div className="[align-content:stretch] flex gap-[19.904px] h-[31.847px] items-center relative shrink-0 w-[407.044px]" data-node-id="6301:2341" data-name="详情字段 / 材质工艺">
                  <div className="relative shrink-0 size-[18.909px]" data-node-id="6301:2342" data-name="图标 / layers">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayers} />
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[86.584px]" data-node-id="6301:2346">
                    <p className="leading-[27.866px]">材质工艺</p>
                  </div>
                  <div className="bg-[var(--archive-line,#c7ab83)] h-[21.895px] opacity-60 relative shrink-0 w-[0.697px]" data-node-id="6301:2347" data-name="竖向分隔" />
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[28.861px] justify-center leading-[0] relative shrink-0 text-[15.923px] text-[color:var(--archive-ink,#161811)] w-[226.91px]" data-node-id="6301:2348">
                    <p className="leading-[27.866px]">{material || "—"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[7.605px] items-center justify-center left-[59.63px] top-[440.35px] w-[375.763px]" data-node-id="6301:2349">
            <div className="flex-none rotate-[-1.04deg]">
              <div className="bg-[#d4ae80] h-[0.796px] opacity-60 relative w-[375.81px]" data-name="细分隔线" />
            </div>
          </div>
          <div className="absolute flex h-[7.605px] items-center justify-center left-[60.21px] top-[472.19px] w-[375.763px]" data-node-id="6301:2350">
            <div className="flex-none rotate-[-1.04deg]">
              <div className="bg-[#d4ae80] h-[0.796px] opacity-60 relative w-[375.81px]" data-name="细分隔线" />
            </div>
          </div>
          <div className="absolute flex h-[7.605px] items-center justify-center left-[60.78px] top-[504.03px] w-[375.763px]" data-node-id="6301:2351">
            <div className="flex-none rotate-[-1.04deg]">
              <div className="bg-[#d4ae80] h-[0.796px] opacity-60 relative w-[375.81px]" data-name="细分隔线" />
            </div>
          </div>
          <div className="absolute flex h-[7.605px] items-center justify-center left-[61.59px] top-[542.84px] w-[375.763px]" data-node-id="6301:2352">
            <div className="flex-none rotate-[-1.04deg]">
              <div className="bg-[#d4ae80] h-[0.796px] opacity-60 relative w-[375.81px]" data-name="细分隔线" />
            </div>
          </div>
        </div>
        <div className="absolute contents h-[234.62px] left-[56.24px] top-[550.23px] w-[387.937px]" data-node-id="6301:2353" data-name="我的收藏">
          <div className="absolute aspect-[45.53506337962499/45.53506337962506] flex items-center justify-center left-[12.04%] right-[78.24%] top-[556.33px]" data-node-id="6301:2362" style={{ containerType: "size" }}>
            <div className="flex-none h-[hypot(1.66162cqw,98.3384cqh)] rotate-[-0.97deg] w-[hypot(98.3384cqw,-1.66162cqh)]">
              <div className="relative size-full" data-name="对称虹彩罗盘花卉徽章 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex h-[43.076px] items-center justify-center left-[102.29px] top-[579.68px] w-[128.097px]" data-node-id="6301:2363">
            <div className="flex-none rotate-[-1.02deg]">
              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[40.804px] justify-center leading-[0] relative text-[27.866px] text-[color:var(--archive-ink,#161811)] w-[127.388px]">
                <p className="leading-[39.809px]">我的收藏</p>
              </div>
            </div>
          </div>
          <div className="-translate-y-1/2 absolute flex h-[24.917px] items-center justify-center left-[219.03px] top-[586.84px] w-[169.552px]" data-node-id="6301:2364">
            <div className="flex-none rotate-[-1.02deg]">
              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[21.895px] justify-center leading-[0] relative text-[#b1743e] text-[11.943px] tracking-[0.9554px] w-[169.187px]">
                <p className="leading-[19.904px]">MY COLLECTION</p>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[7.662px] items-center justify-center left-[57.04px] top-[594.89px] w-[383.878px]" data-node-id="6301:2365">
            <div className="flex-none rotate-[-1.02deg]">
              <div className="bg-[#b78d54] h-[0.796px] opacity-60 relative w-[383.925px]" data-name="细分隔线" />
            </div>
          </div>
          <div className="absolute flex h-[125.814px] items-center justify-center left-[68.89px] top-[603.1px] w-[360.357px]" data-node-id="6301:2366">
            <div className="flex-none rotate-[-1.02deg]">
              <div className="[align-content:stretch] flex flex-col gap-[4.976px] h-[119.426px] items-start relative w-[358.279px]" data-name="收藏记录 / Auto Layout">
                <div className="[align-content:stretch] flex gap-[11.943px] h-[35.828px] items-center relative shrink-0 w-[358.279px]" data-node-id="6301:2367" data-name="记录行 / 持有状态">
                  <div className="relative shrink-0 size-[23.885px]" data-node-id="I6301:2367;4169:1287" data-name="图标 / package-check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPackageCheck} />
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[32.842px] justify-center leading-[0] relative shrink-0 text-[15.85px] text-[color:var(--archive-ink,#161811)] w-[95.541px]" data-node-id="I6301:2367;4169:1293">
                    <p className="leading-[27.733px]">持有状态</p>
                  </div>
                  <div className="bg-[#f6ead5] border-[#d2b991] border-[0.995px] border-solid [align-content:stretch] cursor-pointer flex h-[35.828px] items-center relative rounded-[4.976px] shrink-0 w-[210.986px]" data-node-id="I6301:2367;4169:1294" data-name="编辑控件">
                    <button className="bg-[#ede3cf] [align-content:stretch] flex h-[35.828px] items-center justify-center relative rounded-[4.976px] shrink-0 w-[105.493px]" data-node-id="I6301:2367;4169:1295" data-name="未拥有" onClick={()=>onOwned(false)}>
                      <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[29.857px] justify-center leading-[0] relative shrink-0 text-[15.85px] text-[color:var(--archive-blue,#315f93)] text-left w-[57.723px]" data-node-id="I6301:2367;4169:1296">
                        <p className="leading-[23.771px]">未拥有</p>
                      </div>
                    </button>
                    <button className="bg-[#ede3cf] border-[0.597px] border-[rgba(107,145,184,0.5)] border-solid [align-content:stretch] flex gap-[5.971px] h-[35.828px] items-center justify-center relative rounded-[4.976px] shrink-0 w-[105.493px]" data-node-id="I6301:2367;4169:1297" data-name="已拥有 / 选中" onClick={()=>onOwned(true)}>
                      <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[29.857px] justify-center leading-[0] relative shrink-0 text-[15.85px] text-[color:var(--archive-blue,#315f93)] text-left w-[57.723px]" data-node-id="I6301:2367;4169:1300">
                        <p className="leading-[23.771px]">已拥有</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="[align-content:stretch] flex gap-[11.943px] h-[35.828px] items-center relative shrink-0 w-[358.279px]" data-node-id="6301:2368" data-name="记录行 / 数量">
                  <div className="relative shrink-0 size-[23.885px]" data-node-id="I6301:2368;4169:1317" data-name="图标 / hash">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHash} />
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[32.842px] justify-center leading-[0] relative shrink-0 text-[15.85px] text-[color:var(--archive-ink,#161811)] w-[95.541px]" data-node-id="I6301:2368;4169:1322">
                    <p className="leading-[27.733px]">数量</p>
                  </div>
                  <div className="bg-[#f6ead5] border-[#d2b991] border-[0.995px] border-solid [align-content:stretch] flex h-[35.828px] items-center relative rounded-[4.976px] shrink-0 w-[210.986px]" data-node-id="I6301:2368;4169:1323" data-name="编辑控件">
                    <button className="[align-content:stretch] cursor-pointer flex h-[35.828px] items-center justify-center relative shrink-0 w-[36.823px]" data-node-id="I6301:2368;4169:1324" data-name="减少数量" onClick={()=>onQuantity(Math.max(0,quantity-1))}>
                      <div className="relative shrink-0 size-[16.919px]" data-node-id="I6301:2368;4169:1325" data-name="图标 / minus">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMinus} />
                      </div>
                    </button>
                    <div className="bg-[var(--archive-line,#c7ab83)] h-[33.837px] opacity-50 relative shrink-0 w-[0.697px]" data-node-id="I6301:2368;4169:1327" data-name="分隔线" />
                    <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Regular'] font-normal h-[33.837px] justify-center leading-[0] relative shrink-0 text-[17.83px] text-[color:var(--archive-ink,#161811)] text-center w-[135.35px]" data-node-id="I6301:2368;4169:1328">
                      <p className="leading-[31.695px]">{quantity}</p>
                    </div>
                    <div className="bg-[var(--archive-line,#c7ab83)] h-[33.837px] opacity-50 relative shrink-0 w-[0.697px]" data-node-id="I6301:2368;4169:1329" data-name="分隔线" />
                    <button className="[align-content:stretch] cursor-pointer flex h-[35.828px] items-center justify-center relative shrink-0 w-[36.823px]" data-node-id="I6301:2368;4169:1330" data-name="增加数量" onClick={()=>onQuantity(quantity+1)}>
                      <div className="relative shrink-0 size-[16.919px]" data-node-id="I6301:2368;4169:1331" data-name="图标 / plus">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                      </div>
                    </button>
                  </div>
                </div>
                <div className="[align-content:stretch] flex gap-[11.943px] h-[35.828px] items-center relative shrink-0 w-[358.279px]" data-node-id="6301:2369" data-name="记录行 / 购入价格">
                  <div className="relative shrink-0 size-[23.885px]" data-node-id="I6301:2369;4169:1353" data-name="图标 / coins">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCoins} />
                  </div>
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[32.842px] justify-center leading-[0] relative shrink-0 text-[15.85px] text-[color:var(--archive-ink,#161811)] w-[95.541px]" data-node-id="I6301:2369;4169:1358">
                    <p className="leading-[27.733px]">购入价格</p>
                  </div>
                  <div className="bg-[#f6ead5] border-[#d2b991] border-[0.995px] border-solid [align-content:stretch] cursor-pointer flex h-[35.828px] items-center relative rounded-[4.976px] shrink-0 w-[210.986px]" onClick={event=>event.currentTarget.querySelector("input")?.focus()} data-node-id="I6301:2369;4169:1359" data-name="编辑控件">
                    <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Regular'] font-normal h-[33.837px] justify-center leading-[0] relative shrink-0 text-[17.83px] text-[color:var(--archive-ink,#161811)] text-center w-[37.818px]" data-node-id="I6301:2369;4169:1360">
                      <p className="leading-[31.695px]">¥</p>
                    </div>
                    <div className="bg-[var(--archive-line,#c7ab83)] h-[33.837px] opacity-50 relative shrink-0 w-[0.697px]" data-node-id="I6301:2369;4169:1361" data-name="分隔线" />
                    <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Regular'] font-normal h-[33.837px] justify-center leading-[0] relative shrink-0 text-[17.83px] text-[color:var(--archive-ink,#161811)] text-center w-[172.173px]" data-node-id="I6301:2369;4169:1362">
                      <input aria-label="购入价格" inputMode="decimal" type="text" value={price} onChange={event=>onPriceChange(event.target.value)} onFocus={event=>event.currentTarget.select()} className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-center font-inherit text-[17.83px] leading-[31.695px] text-[#161811] outline-none" />
                    </div>
                  </div>
                </div>
                <button className="absolute bg-gradient-to-b [align-content:stretch] cursor-pointer flex from-[#3d5c91] h-[35.828px] items-center justify-center left-[144.31px] rounded-[4.976px] to-[#162032] top-0 w-[105.493px]" style={{left: owned ? 249.803 : 144.31}} onClick={()=>onOwned(!owned)} data-node-id="6303:3117" data-name="持有状态 / 选中 当前未拥有">
                  <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[29.857px] justify-center leading-[0] relative shrink-0 text-[#f7f2e0] text-[15.923px] text-left w-[57.723px]" data-node-id="6303:3118">
                    <p className="leading-[23.885px]">{owned ? "已拥有" : "未拥有"}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="absolute flex h-[54.259px] items-center justify-center left-[62.21px] top-[730.54px] w-[364.051px]" data-node-id="6301:2370">
            <div className="flex-none rotate-[-1.02deg]">
              <button className="bg-gradient-to-b border-[0.697px] border-[rgba(81,121,161,0.6)] border-solid [align-content:stretch] cursor-pointer flex from-[#3d5c91] gap-[10.947px] h-[47.77px] items-center justify-center relative rounded-[4.976px] to-[#162032] w-[363.255px]" data-name="保存记录 / 组件实例" onClick={()=>onSave()}>
                <div className="overflow-clip relative shrink-0 size-[23.885px]" data-node-id="I6301:2370;4169:1375" data-name="相机 / 独立矢量图标">
                  <div className="absolute inset-[8.33%_12.5%]" data-node-id="I6301:2370;4169:1376" data-name="Group">
                    <div className="absolute inset-[-3.75%_-4.17%]">
                      <img alt="" className="block max-w-none size-full" src={imgGroup} />
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[15.85px] text-[color:var(--archive-cream,#fff4dc)] text-center whitespace-nowrap" data-node-id="I6301:2370;4169:1380">
                  <p className="leading-[23.771px]">保存记录</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[122.165px] items-center justify-center left-[294.36px] top-[351.27px] w-[178.619px]" data-node-id="6301:2371">
          <div className="flex-none rotate-[-10.6deg]">
            <div className="h-[93.551px] opacity-[37%] relative w-[164.211px]" data-name="IMG_8281 1">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[571.91%] left-[-127.54%] max-w-none top-[-105.02%] w-[230.03%]" src={imgImg82811} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[226.1px] size-[118.391px] top-[227.77px]" data-node-id="6301:2373">
          <div className="flex-none rotate-[-0.97deg]">
            <div className="relative size-[116.441px]" data-name="蓝金星盘鸢尾角饰 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img12} />
            </div>
          </div>
        </div>
        <div className="absolute flex h-[367.675px] items-center justify-center left-[334.35px] top-[25.77px] w-[121.036px]" data-node-id="6301:2374">
          <div className="flex-none rotate-[0.72deg]">
            <div className="h-[366.24px] relative w-[116.441px]" data-name="深海星锚鎏金徽章 1">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[105.57%] left-[-59.91%] max-w-none top-0 w-[220.69%]" src={img13} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

