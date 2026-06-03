import type { Metadata } from "next";
import AgentICClientPage from "./client";

export const metadata: Metadata = {
  title: "AgentIC — AI-Powered EDA Tool | Buildstack",
  description: "AgentIC is a paid desktop app for autonomous chip design. It connects your intent to GDSII using your local EDA tools, PDKs, and model provider.",
};

export default function AgentICPage() {
  return <AgentICClientPage />;
}
