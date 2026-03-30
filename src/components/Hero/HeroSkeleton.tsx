export function HeroSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-[24rem] w-[24rem] animate-pulse rounded-full border border-trace bg-bg-surface/60 blur-3xl" />
    </div>
  );
}

export default HeroSkeleton;
