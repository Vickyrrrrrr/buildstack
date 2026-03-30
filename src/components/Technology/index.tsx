import { codeToTokens } from "shiki";
import AnimatedTerminal from "@/components/AnimatedTerminal";
import Reveal from "@/components/Reveal";
import { openLaneConfig, technologyStack, technologyTerminalLines } from "@/lib/buildstack-content";

export async function Technology() {
  const tokens = await codeToTokens(openLaneConfig, {
    lang: "json",
    theme: "github-dark-dimmed",
  });

  return (
    <section id="technology" className="section-shell">
      <Reveal className="container">
        <div className="surface-panel grid gap-8 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="eyebrow">Technology</p>
              <h2 className="section-title">Built on Open Standards</h2>
            </div>

            <ul className="space-y-3">
              {technologyStack.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-full border border-border bg-bg-elevated/70 px-4 py-3"
                >
                  <span className="h-2 w-2 rounded-full bg-accent-primary" />
                  <span className="text-sm text-text-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <AnimatedTerminal
              title="openlane://config"
              lines={technologyTerminalLines}
              autoPlay={false}
            />
            <div className="trace-outline overflow-hidden rounded-xl border border-border bg-bg-terminal">
              <div className="border-b border-border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted">
                riscv_alu/config.json
              </div>
              <pre className="terminal-scroll overflow-x-auto px-4 py-4 font-mono text-sm leading-6">
                {tokens.tokens.map((line, index) => (
                  <div key={`line-${index}`} className="grid grid-cols-[2rem_1fr] gap-4">
                    <span className="select-none text-right text-text-muted">{index + 1}</span>
                    <span>
                      {line.map((token, tokenIndex) => (
                        <span key={`${index}-${tokenIndex}`} style={{ color: token.color ?? undefined }}>
                          {token.content}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Technology;
