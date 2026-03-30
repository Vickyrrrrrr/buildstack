import { Badge } from "@/components/ui/badge";
import { futureTools } from "@/lib/buildstack-content";

export function FutureCards() {
  return (
    <>
      {futureTools.map((tool) => (
        <article
          key={tool.name}
          className="elevated-panel flex min-h-[16rem] flex-col justify-between p-6 opacity-75 transition duration-300 hover:-translate-y-1 hover:opacity-100 hover:shadow-glow"
        >
          <div className="space-y-5">
            <Badge className="w-fit">Coming Soon</Badge>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">{tool.name}</h3>
              <p className="body-copy">{tool.description}</p>
            </div>
          </div>
          <p className="eyebrow">Reserved for future Buildstack tooling</p>
        </article>
      ))}
    </>
  );
}

export default FutureCards;
