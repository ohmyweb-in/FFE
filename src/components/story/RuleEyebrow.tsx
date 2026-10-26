import type { ReactNode } from "react";

/** Eyebrow + 36×1.5 rule, 14px apart (Our Story frame 777:423). The label keeps its 19px line box, as in Figma. */
export default function RuleEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-[14px] max-md:flex-wrap max-md:gap-y-[10px]">
      <p className={`text-[15px] leading-[19px] font-medium tracking-[0.02em] uppercase [text-box:normal]! ${light ? "text-white" : "text-accent"}`}>{children}</p>
      <span aria-hidden className={`h-[1.5px] w-[36px] shrink-0 rounded-[1px] ${light ? "bg-white" : "bg-accent"}`} />
    </div>
  );
}
