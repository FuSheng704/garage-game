const img1 = "/assets/figma/db42f65c-0811-4dd0-afe1-31813b41c61c.png";
const img2 = "/assets/figma/c9a1f205-de62-49ba-8058-7d45be1154ec.png";
const img3 = "/assets/figma/7f74f2f8-0293-4373-b097-39559b11aec7.png";
const img4 = "/assets/figma/2280b8ea-75a8-4b3f-a05c-34f9a79fef44.png";
const img = "/assets/figma/43809d72-d90c-4ca4-a674-f624900ecdd9.png";
const img5 = "/assets/figma/9d26de7c-b817-47b2-9309-c2467f447cb6.png";
const img6 = "/assets/figma/a95d13fb-b2dd-4e23-ab45-6c8de2ca0b72.png";
const img7 = "/assets/figma/f1f0d19e-f3cc-4d7d-a3ea-854eebb4c6f9.png";
const img8 = "/assets/figma/f5ce3d19-389c-480c-8fe6-7acf3c60c170.png";
const img9 = "/assets/figma/f9a90b2b-5bed-4fb7-9208-0078c3dec1f2.png";
const img10 = "/assets/figma/b3d1eb6c-d4e4-4bc7-9a85-dbb9a9c41090.png";
const imgChatGpt202610260751292 = "/assets/figma/319b1bcb-6a25-4a83-b0bc-a1a5646023cd.png";
const img11 = "/assets/figma/9d63fc08-929b-40cf-a745-37af6837226d.png";
const img12 = "/assets/figma/9cf7bee5-d355-4666-a670-9d2716049764.png";
const imgImg82811 = "/assets/figma/dac5cd6a-8aa7-40aa-8741-98ca9ecaf347.png";
const img13 = "/assets/figma/74a82171-a1b3-4b2e-871e-621fa1cd169f.png";
const imgVector = "/assets/figma/b13b493a-4354-4c9c-aad8-1aef30da5c94.svg";
const imgVector1 = "/assets/figma/813f863a-c4c1-4987-a940-3e001b19c5f4.svg";
const imgClipPathGroup = "/assets/figma/43615db2-9908-45af-bc60-cc3a79a137d7.svg";
const imgTags = "/assets/figma/7e0b71ca-b989-4916-b613-ffd35b2abf73.svg";
const imgRuler = "/assets/figma/f69a9a4f-8d81-44e5-b92b-39336a7c713f.svg";
const imgLibraryBig = "/assets/figma/0d2b8585-2de7-4b26-9b30-7944b9af5a8d.svg";
const imgLayers = "/assets/figma/714455dc-6fdf-4f63-b343-0e07601b4a35.svg";
const imgPackageCheck = "/assets/figma/afced3eb-618e-4c18-8192-3cb406b563ce.svg";
const imgHash = "/assets/figma/61c52034-2ca0-44c3-a2a0-05ceaeea7ea7.svg";
const imgMinus = "/assets/figma/995c6c39-fc94-4812-83a7-d19ba5522986.svg";
const imgPlus = "/assets/figma/add03a72-dc40-4356-8c1b-f1ecd86b47bc.svg";
const imgCoins = "/assets/figma/d0feb9e8-ddd1-4ebc-8f1c-a491abc161fa.svg";
const imgGroup = "/assets/figma/b79f2dd2-4e60-4e46-a08b-9eff932a3ec9.svg";

interface DetailProps { category?: string; size?: string; material?: string; name: string; imageUrl: string; series: string; quantity: number; price: string; owned: boolean; onOwned: (value: boolean)=>void; onQuantity: (value: number)=>void; onPrice?: ()=>void; onPriceChange: (value: string)=>void; onSave: ()=>void; }
export default function Component({category,size,material,name,imageUrl,series,quantity,price,owned,onOwned,onQuantity,onPriceChange,onSave}: DetailProps) {
  return (
    <div className="relative size-full" data-node-id="7020:4850" data-name="详情 / 独立上下滚动">
      <div className="absolute flex h-[274.104px] items-center justify-center left-[-9.58px] top-[2px] w-[190.552px]" data-node-id="7020:4146">
        <div className="flex-none rotate-[0.97deg]">
          <div className="h-[271px] relative w-[186px]" data-name="07 / 任务档案 · 分层详情与收藏记录">
            <div className="absolute flex h-[266.336px] items-center justify-center left-[7.2px] top-[-7.94px] w-[174.425px]" data-node-id="7020:4147">
              <div className="flex-none rotate-[-1.87deg] skew-x-[-0.05deg]">
                <div className="h-[261.046px] relative w-[166.208px]" data-name="垫纸图片 / 底层任务纸 1">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img1} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[264.201px] items-center justify-center left-[13.3px] top-[-6.62px] w-[171.172px]" data-node-id="7020:4148">
              <div className="flex-none rotate-[-1.1deg] skew-x-[-0.01deg]">
                <div className="h-[261.048px] relative w-[166.207px]" data-name="垫纸图片 / 底层任务纸 2">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img2} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[260.784px] items-center justify-center left-[7.8px] top-[-2.69px] w-[167.44px]" data-node-id="7020:4149">
              <div className="flex-none rotate-[0.37deg] skew-x-[0.09deg]">
                <div className="h-[259.725px] relative w-[166.211px]" data-name="垫纸图片 / 底层任务纸 3">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[264.05px] items-center justify-center left-[16.7px] top-[-4.62px] w-[171.238px]" data-node-id="7020:4150">
              <div className="flex-none rotate-[-1.05deg] skew-x-[0.06deg]">
                <div className="h-[261.047px] relative w-[166.208px]" data-name="垫纸图片 / 底层任务纸 4">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img4} />
                </div>
              </div>
            </div>
            <div className="absolute flex h-[268.68px] items-center justify-center left-[1.93px] top-[-10.07px] w-[188.374px]" data-node-id="7020:4151">
              <div className="flex-none rotate-[-1.82deg] skew-x-[0.12deg]">
                <div className="h-[263.133px] relative w-[179.546px]" data-name="垫纸图片 / 主档案纸 / 独立可编辑">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[106.61%] left-0 max-w-none top-0 w-full" src={img} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute h-[268px] left-[7.69px] top-[3.66px] w-[172.453px]" data-node-id="7020:4152" data-name="主档案纸 / 独立可编辑">
              <div className="absolute contents h-[21.268px] left-[9.41px] top-[1.22px] w-[49.31px]" data-node-id="7020:4153" data-name="LONGDAY / 罗盘档案印记 · 成品组">
                <div className="absolute flex h-[21.268px] items-center justify-center left-[9.41px] top-[1.22px] w-[49.31px]" data-node-id="7020:4169">
                  <div className="flex-none rotate-[-1.27deg]">
                    <div className="h-[20.187px] overflow-clip relative w-[48.874px]" data-name="LONGDAY / 虚线印框与斜线压边">
                      <div className="absolute inset-[17.11%_0.54%_15.79%_33.15%]" data-node-id="7020:4170" data-name="Vector">
                        <div className="absolute inset-[-1.08%_-0.45%_-1.08%_0]">
                          <img alt="" className="block max-w-none size-full" src={imgVector} />
                        </div>
                      </div>
                      <div className="absolute inset-[17.1%_0.54%_15.79%_95.65%]" data-node-id="7020:4171" data-name="Vector">
                        <div className="absolute inset-[-0.54%_-3.94%_-0.54%_0]">
                          <img alt="" className="block max-w-none size-full" src={imgVector1} />
                        </div>
                      </div>
                      <div className="absolute inset-[17.11%_0.54%_15.78%_95.66%]" data-node-id="7020:4172" data-name="Clip path group">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgClipPathGroup} />
                      </div>
                      <div className="absolute aspect-[18.772435935450485/18.772435935450485] flex items-center justify-center left-[1.71%] right-[59.88%] top-[1.49px]" data-node-id="7020:4176" style={{ containerType: "size" }}>
                        <div className="flex-none h-[hypot(-0.529897cqw,99.4701cqh)] rotate-[0.31deg] w-[hypot(99.4701cqw,0.529897cqh)]">
                          <div className="relative size-full" data-name="对称虹彩罗盘花卉徽章 1">
                            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[7.643px] items-center justify-center left-[43.48px] top-[11.43px] w-[29.148px]" data-node-id="7020:4177">
                  <div className="flex-none rotate-[-1.27deg]">
                    <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative text-[#050404] text-[5.813px] text-center whitespace-nowrap">
                      <p className="leading-[6.224px]">LONGDAY</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute contents left-[71.72px] top-0" data-node-id="7020:4178" data-name="任务档案">
                <div className="-translate-y-1/2 absolute flex h-[15.891px] items-center justify-center left-[71.72px] top-[7.94px] w-[46.211px]" data-node-id="7020:4179">
                  <div className="flex-none rotate-[0.18deg] skew-x-[0.34deg]">
                    <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[15.743px] justify-center leading-[0] relative text-[10.252px] text-[color:var(--archive-ink,#161811)] w-[46.169px]">
                      <p className="leading-[14.646px]">任务档案</p>
                    </div>
                  </div>
                </div>
                <div className="-translate-y-1/2 absolute flex h-[6.163px] items-center justify-center left-[72.37px] top-[16.99px] w-[51.016px]" data-node-id="7020:4180">
                  <div className="flex-none rotate-[0.18deg] skew-x-[0.34deg]">
                    <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Regular'] font-normal justify-center leading-[0] relative text-[5.813px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap">
                      <p className="leading-[5.126px]">MISSION NOTICE</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute contents left-[7px] top-[27px]" data-node-id="7020:4181" data-name="商品图">
                <div className="absolute contents left-[7px] top-[27px]" data-node-id="7020:4182">
                  <div className="absolute flex h-[91.314px] items-center justify-center left-[7px] top-[29.67px] w-[115.972px]" data-node-id="7020:4183">
                    <div className="flex-none rotate-[-2.63deg] skew-x-[0.14deg]">
                      <div className="h-[86.272px] relative w-[111.922px]" data-name="垫纸图片 / 照片下层纸 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img6} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex h-[86.3px] items-center justify-center left-[9.02px] top-[35.65px] w-[107.998px]" data-node-id="7020:4184">
                    <div className="flex-none rotate-[1.87deg] skew-x-[-0.26deg]">
                      <div className="h-[82.925px] relative w-[104.971px]" data-name="垫纸图片 / 照片下层纸 2">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img alt="" className="absolute h-full left-[-2.82%] max-w-none top-0 w-[105.64%]" src={img7} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex h-[89.48px] items-center justify-center left-[11.65px] top-[35.77px] w-[103.273px]" data-node-id="7020:4185">
                    <div className="-rotate-1 flex-none skew-x-[-0.01deg]">
                      <div className="h-[87.712px] relative w-[101.762px]" data-name="垫纸图片 / 照片下层纸 3">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img8} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex h-[98.182px] items-center justify-center left-[12.41px] top-[27px] w-[105.071px]" data-node-id="7020:4186">
                    <div className="flex-none rotate-[-3.11deg] skew-x-[0.18deg]">
                      <div className="h-[92.911px] relative w-[99.885px]" data-name="垫纸图片 / 独立拍立得相框">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img9} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute flex items-center justify-center left-[27.26px] size-[78.096px] top-[35.97px]" data-node-id="7020:4187">
                  <div className="flex-none rotate-[-0.97deg]">
                    <div className="relative size-[76.809px]" data-name="金色罗盘锚徽章 1">
                      <img alt="" className="absolute inset-0 max-w-none object-cover opacity-30 pointer-events-none size-full" src={img10} />
                    </div>
                  </div>
                </div>
                <div className="absolute flex items-center justify-center left-[28.35px] size-[75.906px] top-[37.07px]" data-node-id="7020:4189">
                  <div className="flex-none rotate-[-0.97deg]">
                    <div className="relative size-[74.656px]" data-name="展示商品图 / 困兽a1 · 独立可替换">
                      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imageUrl} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex items-center justify-center left-0 size-[52.491px] top-[22.13px]" data-node-id="7020:4221">
                <div className="flex-none rotate-[-0.97deg]">
                  <div className="relative size-[51.626px]" data-name="ChatGPT 图像 2026年10月26日 07_51_29 2">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgChatGpt202610260751292} />
                  </div>
                </div>
              </div>
              <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold justify-center leading-[0] left-[115.66px] text-[#cd231c] text-[8.304px] top-[9.92px] whitespace-nowrap" data-node-id="7020:4236">
                <p className="leading-[11.717px]">NO. 1123</p>
              </div>
              <div className="absolute flex items-center justify-center left-[85.44px] size-[36.603px] top-[89.67px]" data-node-id="7020:4312">
                <div className="flex-none rotate-[-0.97deg]">
                  <div className="relative size-[36px]" data-name="蓝金星盘鸢尾角饰 1">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
                  </div>
                </div>
              </div>
              <div className="absolute flex h-[114.978px] items-center justify-center left-[120.18px] top-[19.66px] w-[37.96px]" data-node-id="7020:4313">
                <div className="flex-none rotate-[0.72deg]">
                  <div className="h-[114.529px] relative w-[36.519px]" data-name="深海星锚鎏金徽章 1">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[105.57%] left-[-59.91%] max-w-none top-0 w-[220.69%]" src={img12} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute h-[122px] left-[3.85px] overflow-x-clip overflow-y-auto top-[124.16px] w-[165px]" data-node-id="7337:3590" data-name="商品信息与我的收藏 / 上下滑动">
                <div className="absolute h-[206px] left-0 top-0 w-[165px]" data-node-id="7337:3591" data-name="详情内容 / 宽松排布">
                  <div className="absolute flex h-[44.958px] items-center justify-center left-[104.29px] top-[4.22px] w-[65.781px]" data-node-id="7020:4310">
                    <div className="flex-none rotate-[-10.6deg]">
                      <div className="h-[34.419px] opacity-[37%] relative w-[60.481px]" data-name="IMG_8281 1">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img alt="" className="absolute h-[571.91%] left-[-127.54%] max-w-none top-[-105.02%] w-[230.03%]" src={imgImg82811} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex items-center justify-center left-[124.13px] size-[44.288px] top-[47.61px]" data-node-id="7020:4244">
                    <div className="flex-none rotate-[11.99deg]">
                      <div className="relative size-[37.346px]" data-name="金色鸢尾星盘徽章 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover opacity-[22%] pointer-events-none size-full" src={img13} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute contents h-[76.624px] left-[11px] top-[3.35px] w-[147.609px]" data-node-id="7020:4245" data-name="简介">
                    <div className="-translate-y-1/2 absolute flex h-[21.281px] items-center justify-center left-[14.16px] top-[15.1px] w-[82.212px]" data-node-id="7020:4246">
                      <div className="flex-none rotate-[-1.04deg]">
                        <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[19.801px] justify-center leading-[0] relative text-[13.708px] text-[color:var(--archive-ink,#161811)] w-[81.867px]">
                          <p className="leading-[19.801px]">{name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute flex h-[2.954px] items-center justify-center left-[11.33px] top-[21.43px] w-[146.222px]" data-node-id="7020:4247">
                      <div className="flex-none rotate-[-1.04deg]">
                        <div className="bg-[#9d8c6e] h-[0.305px] opacity-80 relative w-[146.24px]" data-name="细分隔线" />
                      </div>
                    </div>
                    <div className="absolute flex h-[51.807px] items-center justify-center left-[16.33px] top-[26.63px] w-[128.494px]" data-node-id="7020:4248">
                      <div className="flex-none rotate-[-1.04deg]">
                        <div className="[align-content:stretch] flex flex-col h-[49.502px] items-start relative w-[127.618px]" data-name="商品资料 / Auto Layout">
                          <div className="[align-content:stretch] flex gap-[7.616px] h-[12.185px] items-center relative shrink-0 w-[155.742px]" data-node-id="7020:4249" data-name="详情字段 / 商品分类">
                            <div className="relative shrink-0 size-[7.235px]" data-node-id="7020:4250" data-name="图标 / tags">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTags} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4254">
                              <p className="leading-[10.662px]">商品分类</p>
                            </div>
                            <div className="bg-[var(--archive-line,#c7ab83)] h-[8.377px] opacity-60 relative shrink-0 w-[0.267px]" data-node-id="7020:4255" data-name="竖向分隔" />
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4256">
                              <p className="leading-[10.662px]">{category || "—"}</p>
                            </div>
                          </div>
                          <div className="[align-content:stretch] flex gap-[7.616px] h-[12.185px] items-center relative shrink-0 w-[155.742px]" data-node-id="7020:4257" data-name="详情字段 / 商品尺寸">
                            <div className="relative shrink-0 size-[7.235px]" data-node-id="7020:4258" data-name="图标 / ruler">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRuler} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4264">
                              <p className="leading-[10.662px]">商品尺寸</p>
                            </div>
                            <div className="bg-[var(--archive-line,#c7ab83)] h-[8.377px] opacity-60 relative shrink-0 w-[0.267px]" data-node-id="7020:4265" data-name="竖向分隔" />
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4266">
                              <p className="leading-[10.662px]">{size || "—"}</p>
                            </div>
                          </div>
                          <div className="[align-content:stretch] flex gap-[7.616px] h-[12.185px] items-center relative shrink-0 w-[155.742px]" data-node-id="7020:4267" data-name="详情字段 / 系列作品">
                            <div className="relative shrink-0 size-[7.235px]" data-node-id="7020:4268" data-name="图标 / library-big">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLibraryBig} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4272">
                              <p className="leading-[10.662px]">系列作品</p>
                            </div>
                            <div className="bg-[var(--archive-line,#c7ab83)] h-[8.377px] opacity-60 relative shrink-0 w-[0.267px]" data-node-id="7020:4273" data-name="竖向分隔" />
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4274">
                              <p className="leading-[10.662px]">{series}</p>
                            </div>
                          </div>
                          <div className="[align-content:stretch] flex gap-[7.616px] h-[12.185px] items-center relative shrink-0 w-[155.742px]" data-node-id="7020:4275" data-name="详情字段 / 材质工艺">
                            <div className="relative shrink-0 size-[7.235px]" data-node-id="7020:4276" data-name="图标 / layers">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLayers} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4280">
                              <p className="leading-[10.662px]">材质工艺</p>
                            </div>
                            <div className="bg-[var(--archive-line,#c7ab83)] h-[8.377px] opacity-60 relative shrink-0 w-[0.267px]" data-node-id="7020:4281" data-name="竖向分隔" />
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[8.636px] text-[color:var(--archive-ink,#161811)] whitespace-nowrap" data-node-id="7020:4282">
                              <p className="leading-[10.662px]">{material || "—"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute flex h-[2.91px] items-center justify-center left-[14.09px] top-[37.8px] w-[143.773px]" data-node-id="7020:4283">
                      <div className="flex-none rotate-[-1.04deg]">
                        <div className="bg-[#d4ae80] h-[0.305px] opacity-60 relative w-[143.791px]" data-name="细分隔线" />
                      </div>
                    </div>
                    <div className="absolute flex h-[2.91px] items-center justify-center left-[14.31px] top-[49.99px] w-[143.773px]" data-node-id="7020:4284">
                      <div className="flex-none rotate-[-1.04deg]">
                        <div className="bg-[#d4ae80] h-[0.305px] opacity-60 relative w-[143.791px]" data-name="细分隔线" />
                      </div>
                    </div>
                    <div className="absolute flex h-[2.91px] items-center justify-center left-[14.53px] top-[62.17px] w-[143.773px]" data-node-id="7020:4285">
                      <div className="flex-none rotate-[-1.04deg]">
                        <div className="bg-[#d4ae80] h-[0.305px] opacity-60 relative w-[143.791px]" data-name="细分隔线" />
                      </div>
                    </div>
                    <div className="absolute flex h-[2.91px] items-center justify-center left-[14.84px] top-[77.02px] w-[143.773px]" data-node-id="7020:4286">
                      <div className="flex-none rotate-[-1.04deg]">
                        <div className="bg-[#d4ae80] h-[0.305px] opacity-60 relative w-[143.791px]" data-name="细分隔线" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute contents h-[89.768px] left-[11px] top-[94.37px] w-[148.431px]" data-node-id="7020:4287" data-name="我的收藏">
                    <div className="absolute aspect-[17.422479032342423/17.422479032342423] flex items-center justify-center left-[6.72%] right-[82.73%] top-[96.71px]" data-node-id="7020:4296" style={{ containerType: "size" }}>
                      <div className="flex-none h-[hypot(1.66162cqw,98.3384cqh)] rotate-[-0.97deg] w-[hypot(98.3384cqw,-1.66162cqh)]">
                        <div className="relative size-full" data-name="对称虹彩罗盘花卉徽章 1">
                          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img5} />
                        </div>
                      </div>
                    </div>
                    <div className="-translate-y-1/2 absolute flex h-[16.481px] items-center justify-center left-[28.62px] top-[105.64px] w-[49.012px]" data-node-id="7020:4297">
                      <div className="flex-none rotate-[-1.02deg]">
                        <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:SemiBold'] font-semibold h-[15.612px] justify-center leading-[0] relative text-[10.662px] text-[color:var(--archive-ink,#161811)] w-[48.741px]">
                          <p className="leading-[15.231px]">我的收藏</p>
                        </div>
                      </div>
                    </div>
                    <div className="-translate-y-1/2 absolute flex h-[9.036px] items-center justify-center left-[73.29px] top-[108.25px] w-[58.134px]" data-node-id="7020:4298">
                      <div className="flex-none rotate-[-1.02deg]">
                        <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium justify-center leading-[0] relative text-[#b1743e] text-[6.045px] tracking-[0.4836px] whitespace-nowrap">
                          <p className="leading-[7.616px]">MY COLLECTION</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute flex h-[2.932px] items-center justify-center left-[11.31px] top-[111.46px] w-[146.878px]" data-node-id="7020:4299">
                      <div className="flex-none rotate-[-1.02deg]">
                        <div className="bg-[#b78d54] h-[0.305px] opacity-60 relative w-[146.896px]" data-name="细分隔线" />
                      </div>
                    </div>
                    <div className="absolute flex h-[48.139px] items-center justify-center left-[15.84px] top-[114.6px] w-[137.879px]" data-node-id="7020:4300">
                      <div className="flex-none rotate-[-1.02deg]">
                        <div className="[align-content:stretch] flex flex-col gap-[1.904px] h-[45.694px] items-start relative w-[137.083px]" data-name="收藏记录 / Auto Layout">
                          <div className="[align-content:stretch] flex gap-[4.569px] h-[13.708px] items-center relative shrink-0 w-[137.083px]" data-node-id="7020:4301" data-name="记录行 / 持有状态">
                            <div className="relative shrink-0 size-[9.139px]" data-node-id="I7020:4301;4169:1287" data-name="图标 / package-check">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPackageCheck} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[12.566px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-ink,#161811)] w-[36.556px] tracking-[0px]" data-node-id="I7020:4301;4169:1293">
                              <p className="leading-[9.14px]">持有状态</p>
                            </div>
                            <div className="bg-[#f6ead5] border-[#d2b991] border-[0.381px] border-solid [align-content:stretch] cursor-pointer flex h-[13.708px] items-center relative rounded-[1.904px] shrink-0 w-[80.727px]" data-node-id="I7020:4301;4169:1294" data-name="编辑控件">
                              <button className="bg-[#ede3cf] [align-content:stretch] flex h-[13.708px] items-center justify-center relative rounded-[1.904px] shrink-0 w-[40.363px]" data-node-id="I7020:4301;4169:1295" data-name="未拥有" onClick={()=>onOwned(false)}>
                                <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[11.424px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-blue,#315f93)] text-left w-[22.086px] tracking-[0px]" data-node-id="I7020:4301;4169:1296">
                                  <p className="leading-[9.14px]">未拥有</p>
                                </div>
                              </button>
                              <button className="bg-[#ede3cf] border-[0.228px] border-[rgba(107,145,184,0.5)] border-solid [align-content:stretch] flex gap-[2.285px] h-[13.708px] items-center justify-center relative rounded-[1.904px] shrink-0 w-[40.363px]" data-node-id="I7020:4301;4169:1297" data-name="已拥有 / 选中" onClick={()=>onOwned(true)}>
                                <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[11.424px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-blue,#315f93)] text-left w-[22.086px] tracking-[0px]" data-node-id="I7020:4301;4169:1300">
                                  <p className="leading-[9.14px]">已拥有</p>
                                </div>
                              </button>
                            </div>
                          </div>
                          <div className="[align-content:stretch] flex gap-[4.569px] h-[13.708px] items-center relative shrink-0 w-[137.083px]" data-node-id="7020:4302" data-name="记录行 / 数量">
                            <div className="relative shrink-0 size-[9.139px]" data-node-id="I7020:4302;4169:1317" data-name="图标 / hash">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgHash} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[12.566px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-ink,#161811)] w-[36.556px] tracking-[0px]" data-node-id="I7020:4302;4169:1322">
                              <p className="leading-[9.14px]">数量</p>
                            </div>
                            <div className="bg-[#f6ead5] border-[#d2b991] border-[0.381px] border-solid [align-content:stretch] flex h-[13.708px] items-center relative rounded-[1.904px] shrink-0 w-[80.727px]" data-node-id="I7020:4302;4169:1323" data-name="编辑控件">
                              <button className="[align-content:stretch] cursor-pointer flex h-[13.708px] items-center justify-center relative shrink-0 w-[14.089px]" data-node-id="I7020:4302;4169:1324" data-name="减少数量" onClick={()=>onQuantity(Math.max(0,quantity-1))}>
                                <div className="relative shrink-0 size-[6.473px]" data-node-id="I7020:4302;4169:1325" data-name="图标 / minus">
                                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMinus} />
                                </div>
                              </button>
                              <div className="bg-[var(--archive-line,#c7ab83)] h-[12.947px] opacity-50 relative shrink-0 w-[0.267px]" data-node-id="I7020:4302;4169:1327" data-name="分隔线" />
                              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[12.947px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-ink,#161811)] text-center w-[51.787px] tracking-[0px]" data-node-id="I7020:4302;4169:1328">
                                <p className="leading-[9.14px]">{quantity}</p>
                              </div>
                              <div className="bg-[var(--archive-line,#c7ab83)] h-[12.947px] opacity-50 relative shrink-0 w-[0.267px]" data-node-id="I7020:4302;4169:1329" data-name="分隔线" />
                              <button className="[align-content:stretch] cursor-pointer flex h-[13.708px] items-center justify-center relative shrink-0 w-[14.089px]" data-node-id="I7020:4302;4169:1330" data-name="增加数量" onClick={()=>onQuantity(quantity+1)}>
                                <div className="relative shrink-0 size-[6.473px]" data-node-id="I7020:4302;4169:1331" data-name="图标 / plus">
                                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                                </div>
                              </button>
                            </div>
                          </div>
                          <div className="[align-content:stretch] flex gap-[4.569px] h-[13.708px] items-center relative shrink-0 w-[137.083px]" data-node-id="7020:4303" data-name="记录行 / 购入价格">
                            <div className="relative shrink-0 size-[9.139px]" data-node-id="I7020:4303;4169:1353" data-name="图标 / coins">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCoins} />
                            </div>
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[12.566px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-ink,#161811)] w-[36.556px] tracking-[0px]" data-node-id="I7020:4303;4169:1358">
                              <p className="leading-[9.14px]">购入价格</p>
                            </div>
                            <div className="bg-[#f6ead5] border-[#d2b991] border-[0.381px] border-solid [align-content:stretch] cursor-pointer flex h-[13.708px] items-center relative rounded-[1.904px] shrink-0 w-[80.727px]" onClick={event=>event.currentTarget.querySelector("input")?.focus()} data-node-id="I7020:4303;4169:1359" data-name="编辑控件">
                              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[12.947px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-ink,#161811)] text-center w-[14.47px] tracking-[0px]" data-node-id="I7020:4303;4169:1360">
                                <p className="leading-[9.14px]">¥</p>
                              </div>
                              <div className="bg-[var(--archive-line,#c7ab83)] h-[12.947px] opacity-50 relative shrink-0 w-[0.267px]" data-node-id="I7020:4303;4169:1361" data-name="分隔线" />
                              <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium h-[12.947px] justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-ink,#161811)] text-center w-[65.876px] tracking-[0px]" data-node-id="I7020:4303;4169:1362">
                                <input aria-label="购入价格" type="text" inputMode="decimal" enterKeyHint="done" value={price} onChange={event=>onPriceChange(event.target.value)} onFocus={event=>event.currentTarget.select()} onKeyDown={event=>{if(event.key === "Enter")event.currentTarget.blur();}} className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-center text-[6.09px] font-medium leading-[9.14px] tracking-[0px] text-[#161811] outline-none" />
                              </div>
                            </div>
                          </div>
                          <button className="absolute bg-gradient-to-b [align-content:stretch] cursor-pointer flex from-[#3d5c91] h-[13.708px] items-center justify-center left-[55.21px] rounded-[1.904px] to-[#162032] top-0 w-[40.363px]" style={{left:owned?95.573:55.21}} onClick={()=>onOwned(!owned)} data-node-id="7020:4304" data-name="持有状态 / 选中 当前未拥有">
                            <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium justify-center leading-[0] relative shrink-0 text-[#f7f2e0] text-[6.09px] text-left whitespace-nowrap tracking-[0px]" data-node-id="7020:4305">
                              <p className="leading-[9.14px]">{owned?"已拥有":"未拥有"}</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute flex h-[20.76px] items-center justify-center left-[13.29px] top-[163.36px] w-[139.292px]" data-node-id="7020:4309">
                      <div className="flex-none rotate-[-1.02deg]">
                        <button className="bg-gradient-to-b border-[0.267px] border-[rgba(81,121,161,0.6)] border-solid [align-content:stretch] cursor-pointer flex from-[#3d5c91] gap-[4.189px] h-[18.278px] items-center justify-center relative rounded-[1.904px] to-[#162032] w-[138.987px]" data-name="保存记录 / 组件实例" onClick={()=>onSave()}>
                          <div className="overflow-clip relative shrink-0 size-[9.139px]" data-node-id="I7020:4309;4169:1375" data-name="相机 / 独立矢量图标">
                            <div className="absolute inset-[8.33%_12.5%]" data-node-id="I7020:4309;4169:1376" data-name="Group">
                              <div className="absolute inset-[-3.75%_-4.17%]">
                                <img alt="" className="block max-w-none size-full" src={imgGroup} />
                              </div>
                            </div>
                          </div>
                          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC'] font-medium justify-center leading-[0] relative shrink-0 text-[6.09px] text-[color:var(--archive-cream,#fff4dc)] text-center whitespace-nowrap tracking-[0px]" data-node-id="I7020:4309;4169:1380">
                            <p className="leading-[9.14px]">保存记录</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

