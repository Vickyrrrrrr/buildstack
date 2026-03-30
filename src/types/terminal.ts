export type TerminalLine = {
  text: string;
  type: "success" | "error" | "repair" | "info" | "output";
  delay?: number;
};

export interface AnimatedTerminalProps {
  lines: TerminalLine[];
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  loopDelay?: number;
}
