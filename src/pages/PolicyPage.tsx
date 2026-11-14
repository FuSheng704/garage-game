import { policyText } from "./policyText";

export default function PolicyPage({ kind }: { kind: keyof typeof policyText }) {
  const title = kind === "terms" ? "用户服务协议" : "隐私政策";

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px", lineHeight: 1.8, overflowWrap: "anywhere" }}>
      <h1>萧与逸之恋 {title}</h1>
      {policyText[kind].map((paragraph, index) => (
        <p key={index} style={{ margin: "0 0 1em", whiteSpace: "pre-wrap" }}>{paragraph}</p>
      ))}
    </main>
  );
}
