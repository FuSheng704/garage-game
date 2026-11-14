const imgGroup = "/assets/figma/47cdfae3-265d-4df0-9626-ff26f2dad0af.svg";
const imgGroup1 = "/assets/figma/035bb7bc-2664-4ef0-8b6b-dd87a70dd5bb.svg";
const imgGroup2 = "/assets/figma/1119ab62-204f-4657-849d-5d3961f64e39.svg";
const imgGroup3 = "/assets/figma/4dc09375-c85a-4a93-9ff6-c66862b4475a.svg";
const imgGroup4 = "/assets/figma/04ab8b4b-68e8-47ae-a91e-9d2dce22b701.svg";
const imgGroup5 = "/assets/figma/325df2b5-2b5d-4234-8dbb-803d550edfe9.svg";
const imgGroup6 = "/assets/figma/f3a9e898-3660-4ffd-9a5f-289e2a0bccd8.svg";

export default function Component({ selectedCategory }: { selectedCategory: string }) {
  return (
    <div className="overflow-x-auto relative rounded-[3px] size-full [scrollbar-width:none]" data-node-id="7020:4851" data-name="分类与搜索 / 左右滑动">
      <div className="absolute [align-content:stretch] cursor-pointer flex gap-[5.698px] h-[41.022px] items-center left-0 overflow-clip pl-[3.419px] pr-[4.558px] rounded-[2.849px] top-0 w-[493.405px]" data-node-id="7020:3154" data-name="03 / 商品分类、搜索与排序">
        <button type="button" aria-pressed={selectedCategory === "徽章"} className="bg-[#292924] [align-content:stretch] flex gap-[4.558px] h-[26.209px] items-center justify-center relative rounded-[6.267px] shrink-0 w-[70.079px]" data-node-id="7020:3155" data-name="分类 / 徽章">
          <div className="relative shrink-0 size-[13.674px]" data-node-id="I7020:3155;4163:812" data-name="分类图标 / 猫">
            <div className="absolute inset-[-8.33%]" data-node-id="I7020:3155;4758:1004" data-name="猫 / 白色轮廓 · 透明内部">
              <div className="absolute inset-[6.26%_10.24%_6.25%_10.24%]" data-node-id="I7020:3155;4758:1005" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[15.383px] justify-center leading-[0] relative shrink-0 text-[5.19px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[23.93px]" data-node-id="I7020:3155;4163:816">
            <p className="leading-[7.791px]">徽章</p>
          </div>
        </button>
        <button type="button" aria-pressed={selectedCategory === "纸片"} className="bg-[#292924] [align-content:stretch] flex gap-[4.558px] h-[26.209px] items-center justify-center relative rounded-[6.267px] shrink-0 w-[63.812px]" data-node-id="7020:3156" data-name="分类 / 纸片">
          <div className="relative shrink-0 size-[13.674px]" data-node-id="I7020:3156;4163:818" data-name="分类图标 / 卷尾犬">
            <div className="absolute inset-[-8.33%]" data-node-id="I7020:3156;4758:1007" data-name="卷尾犬 / 白色轮廓 · 透明内部">
              <div className="absolute inset-[6.25%_6.77%]" data-node-id="I7020:3156;4758:1008" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[15.383px] justify-center leading-[0] relative shrink-0 text-[5.19px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[23.93px]" data-node-id="I7020:3156;4163:822">
            <p className="leading-[7.791px]">纸片</p>
          </div>
        </button>
        <button type="button" aria-pressed={selectedCategory === "礼盒"} className="bg-[#292924] [align-content:stretch] flex gap-[4.558px] h-[26.209px] items-center justify-center relative rounded-[6.267px] shrink-0 w-[63.812px]" data-node-id="7020:3157" data-name="分类 / 礼盒">
          <div className="relative shrink-0 size-[13.674px]" data-node-id="I7020:3157;4163:824" data-name="分类图标 / 立耳犬">
            <div className="absolute inset-[-8.33%]" data-node-id="I7020:3157;4758:14639" data-name="立耳犬 / 白色轮廓 · 透明内部">
              <div className="absolute inset-[6.25%_11.8%]" data-node-id="I7020:3157;4758:14640" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[15.383px] justify-center leading-[0] relative shrink-0 text-[5.19px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[23.93px]" data-node-id="I7020:3157;4163:827">
            <p className="leading-[7.791px]">礼盒</p>
          </div>
        </button>
        <button type="button" aria-pressed={selectedCategory === "亚克力"} className="bg-[#292924] [align-content:stretch] flex gap-[4.558px] h-[26.209px] items-center justify-center relative rounded-[6.267px] shrink-0 w-[68.94px]" data-node-id="7020:3158" data-name="分类 / 亚克力">
          <div className="relative shrink-0 size-[13.674px]" data-node-id="I7020:3158;4163:829" data-name="分类图标 / 乌龟">
            <div className="absolute inset-[-8.33%]" data-node-id="I7020:3158;4758:14642" data-name="乌龟 / 白色轮廓 · 透明内部">
              <div className="absolute inset-[24.18%_6.25%_24.18%_6.26%]" data-node-id="I7020:3158;4758:14643" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[15.383px] justify-center leading-[0] relative shrink-0 text-[5.19px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[35.325px]" data-node-id="I7020:3158;4163:832">
            <p className="leading-[7.791px]">亚克力</p>
          </div>
        </button>
        <button type="button" aria-pressed={selectedCategory === "挂件"} className="bg-[#292924] [align-content:stretch] flex gap-[4.558px] h-[26.209px] items-center justify-center relative rounded-[6.267px] shrink-0 w-[62.673px]" data-node-id="7020:3159" data-name="分类 / 挂件">
          <div className="relative shrink-0 size-[13.674px]" data-node-id="I7020:3159;4163:834" data-name="分类图标 / 糖果">
            <div className="absolute inset-[-8.33%]" data-node-id="I7020:3159;4758:14651" data-name="糖果 / 白色轮廓 · 透明内部">
              <div className="absolute inset-[18.78%_6.25%_18.77%_6.25%]" data-node-id="I7020:3159;4758:14652" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[15.383px] justify-center leading-[0] relative shrink-0 text-[5.19px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[23.93px]" data-node-id="I7020:3159;4163:837">
            <p className="leading-[7.791px]">挂件</p>
          </div>
        </button>
        <button type="button" aria-pressed={selectedCategory === "摆件"} className="bg-[#292924] [align-content:stretch] flex gap-[4.558px] h-[26.209px] items-center justify-center relative rounded-[6.267px] shrink-0 w-[62.673px]" data-node-id="7020:3160" data-name="分类 / 摆件">
          <div className="relative shrink-0 size-[13.674px]" data-node-id="I7020:3160;4163:839" data-name="分类图标 / 头盔">
            <div className="absolute inset-[-8.33%]" data-node-id="I7020:3160;4758:14654" data-name="头盔 / 白色轮廓 · 透明内部">
              <div className="absolute inset-[11.52%_6.28%_11.52%_6.25%]" data-node-id="I7020:3160;4758:14655" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup5} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[15.383px] justify-center leading-[0] relative shrink-0 text-[5.19px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[23.93px]" data-node-id="I7020:3160;4163:843">
            <p className="leading-[7.791px]">摆件</p>
          </div>
        </button>
        <button type="button" aria-pressed={selectedCategory === "其他"} className="bg-[#292924] [align-content:stretch] flex gap-[4.558px] h-[26.209px] items-center justify-center relative rounded-[6.267px] shrink-0 w-[63.242px]" data-node-id="7020:3161" data-name="分类 / 其他">
          <div className="overflow-clip relative shrink-0 size-[13.674px]" data-node-id="I7020:3161;4163:845" data-name="分类图标 / more">
            <div className="absolute inset-[44.17%_10.83%]" data-node-id="I7020:3161;4163:846" data-name="Group">
              <div className="absolute inset-[-23.21%_-3.46%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup6} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Noto_Serif_SC:Medium'] font-medium h-[15.383px] justify-center leading-[0] relative shrink-0 text-[5.19px] text-[color:var(--archive-cream,#fff4dc)] text-left w-[23.93px]" data-node-id="I7020:3161;4163:850">
            <p className="leading-[7.791px]">其他</p>
          </div>
        </button>
      </div>
    </div>
  );
}

