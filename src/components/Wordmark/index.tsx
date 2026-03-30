import Image from "next/image";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className }: WordmarkProps) {
  return (
    <div className={cn("relative flex items-center gap-3", className)}>
      <Image
        src="/logo.png"
        alt="Buildstack Logo"
        width={32}
        height={32}
        className="h-6 w-auto object-contain md:h-7"
        priority
      />
      <span className="font-mono text-[14px] font-semibold tracking-[0.17em]">
        BUILDSTACK
      </span>
    </div>
  );
}

export default Wordmark;
